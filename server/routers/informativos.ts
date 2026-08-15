import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { createInformativo, listInformativos } from "../db";

const informativoInput = z.object({
  tituloTema: z.string().trim().min(3).max(150),
  urlDocumento: z.string().trim().url().max(255),
  dataPublicacao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const informativosRouter = router({
  list: publicProcedure.query(() => listInformativos()),
  create: adminProcedure.input(informativoInput).mutation(async ({ input }) => {
    try {
      return await createInformativo(input);
    } catch (error) {
      console.error("[Informativos] create failed", error);
      throw new TRPCError({ code: "BAD_REQUEST", message: "Não foi possível cadastrar o informativo." });
    }
  }),
});
