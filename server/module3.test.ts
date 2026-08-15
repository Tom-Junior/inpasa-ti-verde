import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(user: TrpcContext["user"] = null): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

function createAdmin(): AuthenticatedUser {
  const now = new Date();
  return {
    id: 1,
    openId: "admin-module3",
    email: "admin@inpasa.com.br",
    name: "Administrador TI Verde",
    loginMethod: "manus",
    role: "admin",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  };
}

describe("Módulo 3 — contratos de dados e autorização", () => {
  it("rejeita um cadastro de descarte com peso zero", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(
      caller.descartes.create({
        colaboradorId: 1,
        tipoResiduo: "Cabos",
        pesoEstimadoG: 0,
        dataRegistro: "2026-08-15",
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejeita colaborador com e-mail corporativo inválido antes do banco", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(
      caller.colaboradores.create({
        nome: "Pessoa de Teste",
        emailCorporativo: "email-invalido",
        setor: "Tecnologia",
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("protege a remoção de descarte para administradores", async () => {
    const caller = appRouter.createCaller(createContext({
      ...createAdmin(),
      role: "user",
    }));

    await expect(caller.descartes.remove({ id: 1 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejeita operações administrativas sem autenticação", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(caller.descartes.remove({ id: 1 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
