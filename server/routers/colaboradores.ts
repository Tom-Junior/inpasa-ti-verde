import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { createColaborador, deleteColaborador, listColaboradores, updateColaborador } from "../db";

const colaboradorInput = z.object({
  nome: z.string().trim().min(2).max(100),
  emailCorporativo: z.string().trim().email().max(100),
  setor: z.string().trim().min(2).max(80),
});

export const colaboradoresRouter = router({
  list: publicProcedure.query(() => listColaboradores()),
  create: publicProcedure.input(colaboradorInput).mutation(async ({ input }) => {
    try {
      return await createColaborador(input);
    } catch (error) {
      console.error("[Colaboradores] create failed", error);
      throw new TRPCError({ code: "CONFLICT", message: "Não foi possível cadastrar este colaborador. Verifique se o e-mail já está cadastrado." });
    }
  }),
  update: adminProcedure.input(colaboradorInput.extend({ id: z.number().int().positive() })).mutation(async ({ input }) => {
    try {
      const { id, ...values } = input;
      const updated = await updateColaborador(id, values);
      if (!updated) throw new TRPCError({ code: "NOT_FOUND", message: "Colaborador não encontrado." });
      return updated;
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      console.error("[Colaboradores] update failed", error);
      throw new TRPCError({ code: "CONFLICT", message: "Não foi possível atualizar este colaborador." });
    }
  }),
  remove: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ input }) => {
    try {
      return await deleteColaborador(input.id);
    } catch (error) {
      console.error("[Colaboradores] delete failed", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Não foi possível remover este colaborador." });
    }
  }),
});
