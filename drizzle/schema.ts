import { relations, sql } from "drizzle-orm";
import {
  check,
  date,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/** Identidade interna do template Manus OAuth. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/** Colaborador que participa da ação de logística reversa. */
export const colaboradores = mysqlTable(
  "colaboradores",
  {
    id: int("id").autoincrement().primaryKey(),
    nome: varchar("nome", { length: 100 }).notNull(),
    emailCorporativo: varchar("emailCorporativo", { length: 100 }).notNull().unique(),
    setor: varchar("setor", { length: 80 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [index("colaboradores_setor_idx").on(table.setor)],
);

/** Registro de um descarte vinculado obrigatoriamente a um colaborador. */
export const descartes = mysqlTable(
  "descartes",
  {
    id: int("id").autoincrement().primaryKey(),
    colaboradorId: int("colaboradorId")
      .notNull()
      .references(() => colaboradores.id, { onDelete: "cascade", onUpdate: "cascade" }),
    tipoResiduo: varchar("tipoResiduo", { length: 80 }).notNull(),
    pesoEstimadoG: int("pesoEstimadoG").notNull(),
    dataRegistro: date("dataRegistro", { mode: "string" }).notNull(),
    observacoes: varchar("observacoes", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    index("descartes_colaborador_idx").on(table.colaboradorId),
    index("descartes_data_idx").on(table.dataRegistro),
    check("descartes_peso_positivo_chk", sql`${table.pesoEstimadoG} > 0`),
  ],
);

/** Material de conscientização sobre ética digital, TI Verde e conformidade. */
export const informativos = mysqlTable(
  "informativos",
  {
    id: int("id").autoincrement().primaryKey(),
    tituloTema: varchar("tituloTema", { length: 150 }).notNull(),
    urlDocumento: varchar("urlDocumento", { length: 255 }).notNull(),
    dataPublicacao: date("dataPublicacao", { mode: "string" }).notNull(),
  },
  table => [index("informativos_publicacao_idx").on(table.dataPublicacao)],
);

export const colaboradoresRelations = relations(colaboradores, ({ many }) => ({
  descartes: many(descartes),
}));

export const descartesRelations = relations(descartes, ({ one }) => ({
  colaborador: one(colaboradores, {
    fields: [descartes.colaboradorId],
    references: [colaboradores.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Colaborador = typeof colaboradores.$inferSelect;
export type InsertColaborador = typeof colaboradores.$inferInsert;
export type Descarte = typeof descartes.$inferSelect;
export type InsertDescarte = typeof descartes.$inferInsert;
export type Informativo = typeof informativos.$inferSelect;
export type InsertInformativo = typeof informativos.$inferInsert;
