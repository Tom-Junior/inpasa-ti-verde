import { and, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  type InsertColaborador,
  type InsertDescarte,
  type InsertInformativo,
  type InsertUser,
  colaboradores,
  descartes,
  informativos,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

/** Cria a conexão sob demanda para permitir typecheck e testes sem banco local. */
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  values.lastSignedIn ??= new Date();
  updateSet.lastSignedIn ??= new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listColaboradores() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(colaboradores).orderBy(colaboradores.nome);
}

export async function createColaborador(input: InsertColaborador) {
  const db = await getDb();
  if (!db) throw new Error("DATABASE_UNAVAILABLE");
  await db.insert(colaboradores).values(input);
  const created = await db.select().from(colaboradores).where(eq(colaboradores.emailCorporativo, input.emailCorporativo)).limit(1);
  return created[0];
}

export async function updateColaborador(id: number, input: Pick<InsertColaborador, "nome" | "emailCorporativo" | "setor">) {
  const db = await getDb();
  if (!db) throw new Error("DATABASE_UNAVAILABLE");
  await db.update(colaboradores).set({ ...input, updatedAt: new Date() }).where(eq(colaboradores.id, id));
  const updated = await db.select().from(colaboradores).where(eq(colaboradores.id, id)).limit(1);
  return updated[0];
}

export async function deleteColaborador(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DATABASE_UNAVAILABLE");
  await db.delete(colaboradores).where(eq(colaboradores.id, id));
  return { id };
}

export async function listDescartes() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: descartes.id,
      colaboradorId: descartes.colaboradorId,
      colaborador: colaboradores.nome,
      emailCorporativo: colaboradores.emailCorporativo,
      setor: colaboradores.setor,
      tipoResiduo: descartes.tipoResiduo,
      pesoEstimadoG: descartes.pesoEstimadoG,
      dataRegistro: descartes.dataRegistro,
      observacoes: descartes.observacoes,
    })
    .from(descartes)
    .innerJoin(colaboradores, eq(descartes.colaboradorId, colaboradores.id))
    .orderBy(desc(descartes.dataRegistro), desc(descartes.id));
}

export async function createDescarte(input: InsertDescarte) {
  const db = await getDb();
  if (!db) throw new Error("DATABASE_UNAVAILABLE");
  const result = await db.insert(descartes).values(input);
  const insertId = Number((result as { insertId?: number }).insertId);
  if (!insertId) throw new Error("INSERT_FAILED");
  const created = await db
    .select({
      id: descartes.id,
      colaboradorId: descartes.colaboradorId,
      colaborador: colaboradores.nome,
      emailCorporativo: colaboradores.emailCorporativo,
      setor: colaboradores.setor,
      tipoResiduo: descartes.tipoResiduo,
      pesoEstimadoG: descartes.pesoEstimadoG,
      dataRegistro: descartes.dataRegistro,
      observacoes: descartes.observacoes,
    })
    .from(descartes)
    .innerJoin(colaboradores, eq(descartes.colaboradorId, colaboradores.id))
    .where(eq(descartes.id, insertId))
    .limit(1);
  return created[0];
}

export async function updateDescarte(id: number, input: Pick<InsertDescarte, "colaboradorId" | "tipoResiduo" | "pesoEstimadoG" | "dataRegistro" | "observacoes">) {
  const db = await getDb();
  if (!db) throw new Error("DATABASE_UNAVAILABLE");
  await db.update(descartes).set(input).where(eq(descartes.id, id));
  const updated = (await listDescartes()).find(item => item.id === id);
  return updated;
}

export async function deleteDescarte(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DATABASE_UNAVAILABLE");
  await db.delete(descartes).where(eq(descartes.id, id));
  return { id };
}

export async function listInformativos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(informativos).orderBy(desc(informativos.dataPublicacao));
}

export async function createInformativo(input: InsertInformativo) {
  const db = await getDb();
  if (!db) throw new Error("DATABASE_UNAVAILABLE");
  await db.insert(informativos).values(input);
  const created = await db
    .select()
    .from(informativos)
    .where(and(eq(informativos.tituloTema, input.tituloTema), eq(informativos.urlDocumento, input.urlDocumento)))
    .limit(1);
  return created[0];
}

export async function getDashboardMetrics() {
  const db = await getDb();
  if (!db) return { totalPesoG: 0, totalDescartes: 0, totalColaboradores: 0 };
  const [peso, descarteCount, colaboradorCount] = await Promise.all([
    db.select({ total: sql<number>`COALESCE(SUM(${descartes.pesoEstimadoG}), 0)` }).from(descartes),
    db.select({ total: sql<number>`COUNT(*)` }).from(descartes),
    db.select({ total: sql<number>`COUNT(*)` }).from(colaboradores),
  ]);
  return {
    totalPesoG: Number(peso[0]?.total ?? 0),
    totalDescartes: Number(descarteCount[0]?.total ?? 0),
    totalColaboradores: Number(colaboradorCount[0]?.total ?? 0),
  };
}
