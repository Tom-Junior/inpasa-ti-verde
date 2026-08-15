import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const dbMocks = vi.hoisted(() => ({
  createColaborador: vi.fn(),
  listColaboradores: vi.fn(),
  updateColaborador: vi.fn(),
  deleteColaborador: vi.fn(),
  createDescarte: vi.fn(),
  listDescartes: vi.fn(),
  updateDescarte: vi.fn(),
  deleteDescarte: vi.fn(),
  getDashboardMetrics: vi.fn(),
  listInformativos: vi.fn(),
  createInformativo: vi.fn(),
}));

vi.mock("./db", () => dbMocks);

const { appRouter } = await import("./routers");

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
    openId: "admin-crud-test",
    email: "admin@inpasa.com.br",
    name: "Administrador TI Verde",
    loginMethod: "manus",
    role: "admin",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  };
}

const joinedDiscard = {
  id: 21,
  colaboradorId: 11,
  colaborador: "Ana Ribeiro",
  emailCorporativo: "ana.ribeiro@inpasa.com.br",
  setor: "Tecnologia",
  tipoResiduo: "Cabos",
  pesoEstimadoG: 450,
  dataRegistro: "2026-08-15",
  observacoes: "Separado para coleta.",
};

describe("Módulo 3 — caminho feliz do CRUD", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dbMocks.createColaborador.mockResolvedValue({
      id: 11,
      nome: "Ana Ribeiro",
      emailCorporativo: "ana.ribeiro@inpasa.com.br",
      setor: "Tecnologia",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    dbMocks.listColaboradores.mockResolvedValue([{ id: 11, nome: "Ana Ribeiro", emailCorporativo: "ana.ribeiro@inpasa.com.br", setor: "Tecnologia" }]);
    dbMocks.createDescarte.mockResolvedValue(joinedDiscard);
    dbMocks.listDescartes.mockResolvedValue([joinedDiscard]);
    dbMocks.updateDescarte.mockResolvedValue({ ...joinedDiscard, pesoEstimadoG: 500 });
    dbMocks.deleteDescarte.mockResolvedValue({ id: 21 });
    dbMocks.getDashboardMetrics.mockResolvedValue({ totalPesoG: 450, totalDescartes: 1, totalColaboradores: 1 });
  });

  it("cria um colaborador por procedure pública", async () => {
    const caller = appRouter.createCaller(createContext());
    const result = await caller.colaboradores.create({
      nome: "Ana Ribeiro",
      emailCorporativo: "ana.ribeiro@inpasa.com.br",
      setor: "Tecnologia",
    });

    expect(result?.id).toBe(11);
    expect(dbMocks.createColaborador).toHaveBeenCalledWith({
      nome: "Ana Ribeiro",
      emailCorporativo: "ana.ribeiro@inpasa.com.br",
      setor: "Tecnologia",
    });
  });

  it("cria e consulta um descarte com dados do JOIN", async () => {
    const caller = appRouter.createCaller(createContext());
    const input = {
      colaboradorId: 11,
      tipoResiduo: "Cabos",
      pesoEstimadoG: 450,
      dataRegistro: "2026-08-15",
      observacoes: "Separado para coleta.",
    };

    const created = await caller.descartes.create(input);
    const list = await caller.descartes.list();

    expect(created).toMatchObject(joinedDiscard);
    expect(list).toEqual([joinedDiscard]);
    expect(dbMocks.createDescarte).toHaveBeenCalledWith(input);
    expect(dbMocks.listDescartes).toHaveBeenCalledOnce();
  });

  it("atualiza e remove um descarte com perfil administrador", async () => {
    const caller = appRouter.createCaller(createContext(createAdmin()));
    const updateInput = {
      id: 21,
      colaboradorId: 11,
      tipoResiduo: "Cabos",
      pesoEstimadoG: 500,
      dataRegistro: "2026-08-15",
      observacoes: "Peso conferido.",
    };

    const updated = await caller.descartes.update(updateInput);
    const removed = await caller.descartes.remove({ id: 21 });

    expect(updated).toMatchObject({ id: 21, pesoEstimadoG: 500 });
    expect(removed).toEqual({ id: 21 });
    expect(dbMocks.updateDescarte).toHaveBeenCalledWith(21, expect.objectContaining({ pesoEstimadoG: 500 }));
    expect(dbMocks.deleteDescarte).toHaveBeenCalledWith(21);
  });

  it("retorna métricas agregadas para o dashboard", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(caller.dashboard.metrics()).resolves.toEqual({
      totalPesoG: 450,
      totalDescartes: 1,
      totalColaboradores: 1,
    });
    expect(dbMocks.getDashboardMetrics).toHaveBeenCalledOnce();
  });
});
