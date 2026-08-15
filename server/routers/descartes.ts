import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { createDescarte, deleteDescarte, listDescartes, updateDescarte } from "../db";

const descarteInput = z.object({
  colaboradorId: z.number().int().positive(),
  tipoResiduo: z.string().trim().min(2).max(80),
  pesoEstimadoG: z.number().int().positive().max(1_000_000),
  dataRegistro: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD."),
  observacoes: z.string().trim().max(255).optional(),
});

export const descartesRouter = router({
  list: publicProcedure.query(() => listDescartes()),
  create: publicProcedure.input(descarteInput).mutation(async ({ input }) => {
    try {
      const created = await createDescarte(input);
      if (!created) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "O descarte não foi retornado após o cadastro." });
      return created;
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      console.error("[Descartes] create failed", error);
      throw new TRPCError({ code: "BAD_REQUEST", message: "Não foi possível registrar o descarte. Confirme o colaborador e o peso informado." });
    }
  }),
  update: adminProcedure.input(descarteInput.extend({ id: z.number().int().positive() })).mutation(async ({ input }) => {
    try {
      const { id, ...values } = input;
      const updated = await updateDescarte(id, values);
      if (!updated) throw new TRPCError({ code: "NOT_FOUND", message: "Descarte não encontrado." });
      return updated;
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      console.error("[Descartes] update failed", error);
      throw new TRPCError({ code: "BAD_REQUEST", message: "Não foi possível atualizar o descarte." });
    }
  }),
  remove: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ input }) => {
    try {
      return await deleteDescarte(input.id);
    } catch (error) {
      console.error("[Descartes] delete failed", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Não foi possível remover o descarte." });
    }
  }),
});
