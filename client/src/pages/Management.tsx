import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Loader2, Pencil, RefreshCw, Trash2 } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

const emptyEdit = {
  colaboradorId: 0,
  tipoResiduo: "",
  pesoEstimadoG: 0,
  dataRegistro: "",
  observacoes: "",
};

export default function Management() {
  const { user } = useAuth();
  const descartesQuery = trpc.descartes.list.useQuery();
  const colaboradoresQuery = trpc.colaboradores.list.useQuery();
  const metricsQuery = trpc.dashboard.metrics.useQuery();
  const updateDescarte = trpc.descartes.update.useMutation();
  const removeDescarte = trpc.descartes.remove.useMutation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(emptyEdit);
  const utils = trpc.useUtils();

  useEffect(() => {
    if (editingId === null) return;
    const selected = descartesQuery.data?.find(item => item.id === editingId);
    if (!selected) return;
    setEditForm({
      colaboradorId: selected.colaboradorId,
      tipoResiduo: selected.tipoResiduo,
      pesoEstimadoG: selected.pesoEstimadoG,
      dataRegistro: selected.dataRegistro,
      observacoes: selected.observacoes ?? "",
    });
  }, [editingId, descartesQuery.data]);

  async function refresh() {
    await Promise.all([
      utils.descartes.list.invalidate(),
      utils.colaboradores.list.invalidate(),
      utils.dashboard.metrics.invalidate(),
    ]);
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingId === null) return;
    await updateDescarte.mutateAsync({ id: editingId, ...editForm });
    setEditingId(null);
    await refresh();
  }

  async function handleRemove(id: number) {
    if (!window.confirm("Remover este registro de descarte? Essa ação não pode ser desfeita.")) return;
    await removeDescarte.mutateAsync({ id });
    if (editingId === id) setEditingId(null);
    await refresh();
  }

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-2rem)] bg-[#f4f0e8] p-4 text-[#1e2c2b] sm:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <header className="flex flex-col justify-between gap-4 border-b border-[#1e2c2b]/15 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1d7a53]">Inpasa TI Verde / Operação</p>
              <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Gestão de descartes.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#1e2c2b]/65">Área autenticada para consultar, corrigir e remover registros persistidos. As alterações respeitam o controle de acesso administrativo da API.</p>
            </div>
            <Button type="button" variant="outline" onClick={() => void refresh()} disabled={descartesQuery.isFetching} className="w-fit border-[#1e2c2b]/20 bg-transparent">
              {descartesQuery.isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Atualizar dados
            </Button>
          </header>

          <section className="grid gap-4 sm:grid-cols-3" aria-label="Resumo do banco de dados">
            <article className="rounded-2xl bg-[#1e2c2b] p-5 text-[#f4f0e8]"><p className="text-xs uppercase tracking-[0.16em] text-[#f4f0e8]/55">Peso consolidado</p><strong className="mt-3 block text-3xl">{metricsQuery.data ? `${(metricsQuery.data.totalPesoG / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} kg` : "—"}</strong></article>
            <article className="rounded-2xl bg-[#d8e7ed] p-5 text-[#182a38]"><p className="text-xs uppercase tracking-[0.16em] text-[#182a38]/55">Descartes</p><strong className="mt-3 block text-3xl">{metricsQuery.data?.totalDescartes ?? "—"}</strong></article>
            <article className="rounded-2xl bg-[#d7f0df] p-5 text-[#173b2d]"><p className="text-xs uppercase tracking-[0.16em] text-[#173b2d]/55">Colaboradores</p><strong className="mt-3 block text-3xl">{metricsQuery.data?.totalColaboradores ?? "—"}</strong></article>
          </section>

          <section className="rounded-2xl border border-[#1e2c2b]/12 bg-white/65 p-5 shadow-[0_18px_45px_rgba(30,44,43,0.06)] sm:p-7" aria-labelledby="table-title">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1d7a53]">Consulta relacional</p><h2 id="table-title" className="mt-1 text-2xl font-semibold tracking-tight">Últimos descartes registrados</h2></div>
              <p className="text-sm text-[#1e2c2b]/55">JOIN entre Descarte e Colaborador</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="sr-only">Lista de descartes persistidos com ações administrativas</caption>
                <thead><tr className="border-b border-[#1e2c2b]/12 text-xs uppercase tracking-[0.12em] text-[#1e2c2b]/50"><th className="px-3 py-3">Colaborador</th><th className="px-3 py-3">Resíduo</th><th className="px-3 py-3">Peso</th><th className="px-3 py-3">Data</th><th className="px-3 py-3">Ações</th></tr></thead>
                <tbody>
                  {descartesQuery.data?.map(item => (
                    <tr key={item.id} className="border-b border-[#1e2c2b]/8 last:border-0">
                      <td className="px-3 py-4"><strong className="block">{item.colaborador}</strong><span className="text-xs text-[#1e2c2b]/55">{item.setor}</span></td>
                      <td className="px-3 py-4">{item.tipoResiduo}</td>
                      <td className="px-3 py-4">{item.pesoEstimadoG.toLocaleString("pt-BR")} g</td>
                      <td className="px-3 py-4">{new Date(`${item.dataRegistro}T12:00:00`).toLocaleDateString("pt-BR")}</td>
                      <td className="px-3 py-4"><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => setEditingId(item.id)} className="border-[#1e2c2b]/15 bg-transparent"><Pencil className="mr-1.5 h-3.5 w-3.5" />Editar</Button><Button variant="outline" size="sm" onClick={() => void handleRemove(item.id)} disabled={removeDescarte.isPending} className="border-red-200 bg-transparent text-red-700 hover:bg-red-50"><Trash2 className="mr-1.5 h-3.5 w-3.5" />Remover</Button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {descartesQuery.isLoading && <p className="py-10 text-center text-sm text-[#1e2c2b]/55">Carregando registros…</p>}
              {!descartesQuery.isLoading && !descartesQuery.data?.length && <p className="py-10 text-center text-sm text-[#1e2c2b]/55">Ainda não há descartes registrados. Use o formulário público para iniciar a base.</p>}
            </div>
          </section>

          {editingId !== null && (
            <section className="rounded-2xl border border-[#1d7a53]/25 bg-[#eaf6ed] p-5 sm:p-7" aria-labelledby="edit-title">
              <div className="mb-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1d7a53]">Operação de atualização</p><h2 id="edit-title" className="mt-1 text-2xl font-semibold tracking-tight">Corrigir descarte #{editingId}</h2></div>
              <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" onSubmit={handleUpdate}>
                <div className="space-y-2"><Label htmlFor="edit-colaborador">Colaborador</Label><select id="edit-colaborador" value={editForm.colaboradorId} onChange={event => setEditForm({ ...editForm, colaboradorId: Number(event.target.value) })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>{colaboradoresQuery.data?.map(item => <option key={item.id} value={item.id}>{item.nome}</option>)}</select></div>
                <div className="space-y-2"><Label htmlFor="edit-tipo">Tipo</Label><Input id="edit-tipo" value={editForm.tipoResiduo} onChange={event => setEditForm({ ...editForm, tipoResiduo: event.target.value })} required /></div>
                <div className="space-y-2"><Label htmlFor="edit-peso">Peso (g)</Label><Input id="edit-peso" type="number" min="1" value={editForm.pesoEstimadoG} onChange={event => setEditForm({ ...editForm, pesoEstimadoG: Number(event.target.value) })} required /></div>
                <div className="space-y-2"><Label htmlFor="edit-data">Data</Label><Input id="edit-data" type="date" value={editForm.dataRegistro} onChange={event => setEditForm({ ...editForm, dataRegistro: event.target.value })} required /></div>
                <div className="flex items-end gap-2"><Button type="submit" disabled={updateDescarte.isPending}>{updateDescarte.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Salvar</Button><Button type="button" variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button></div>
              </form>
              {updateDescarte.error && <p className="mt-4 text-sm text-red-700" role="alert">{updateDescarte.error.message}</p>}
            </section>
          )}

          <p className="text-xs leading-5 text-[#1e2c2b]/50">Sessão atual: {user?.email ?? "não identificada"} · Perfil: {user?.role === "admin" ? "administrador" : "usuário"}. Operações de escrita na área de gestão exigem perfil administrador.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
