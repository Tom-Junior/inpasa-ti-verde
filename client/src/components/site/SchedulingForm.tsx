// Direção visual: Manifesto Verde Digital — formulário tratado como ponto de ação, com labels claros e confirmação objetiva.
// O envio usa tRPC para persistir colaborador e descarte no banco relacional e atualizar as consultas derivadas.

import { trpc } from "@/lib/trpc";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

type FormStatus = "idle" | "success" | "error";

function localDateString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function SchedulingForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [protocol, setProtocol] = useState("");
  const colaboradoresQuery = trpc.colaboradores.list.useQuery();
  const createColaborador = trpc.colaboradores.create.useMutation();
  const createDescarte = trpc.descartes.create.useMutation();
  const utils = trpc.useUtils();
  const isSubmitting = createColaborador.isPending || createDescarte.isPending;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    const form = event.currentTarget;
    const data = new FormData(form);
    const hasConsent = data.get("lgpd") === "on";
    const weight = Number(data.get("peso"));
    const nome = String(data.get("nome") ?? "").trim();
    const emailCorporativo = String(data.get("email") ?? "").trim().toLowerCase();
    const setor = String(data.get("setor") ?? "").trim();
    const tipoResiduo = String(data.get("tipo") ?? "").trim();

    if (!hasConsent || !weight || weight < 1 || !nome || !emailCorporativo || !setor || !tipoResiduo) {
      setStatus("error");
      return;
    }

    try {
      const existing = colaboradoresQuery.data?.find(
        collaborator => collaborator.emailCorporativo.toLowerCase() === emailCorporativo,
      );
      const collaborator = existing ?? (await createColaborador.mutateAsync({ nome, emailCorporativo, setor }));
      if (!collaborator) throw new Error("COLLABORATOR_NOT_CREATED");

      const created = await createDescarte.mutateAsync({
        colaboradorId: collaborator.id,
        tipoResiduo,
        pesoEstimadoG: weight,
        dataRegistro: localDateString(),
      });
      setProtocol(`TV-${new Date().getFullYear()}-${String(created?.id ?? "").padStart(4, "0")}`);
      setStatus("success");
      form.reset();
      await Promise.all([
        utils.dashboard.metrics.invalidate(),
        utils.descartes.list.invalidate(),
        utils.colaboradores.list.invalidate(),
      ]);
    } catch (error) {
      console.error("[SchedulingForm] submit failed", error);
      setStatus("error");
    }
  }

  return (
    <section id="agendamento" className="schedule-section" aria-labelledby="schedule-title">
      <div className="container schedule-section__grid">
        <div className="schedule-section__intro">
          <p className="eyebrow"><span className="eyebrow__line" />Seu próximo gesto</p>
          <h2 id="schedule-title">Reserve seu descarte em <em>menos de dois minutos.</em></h2>
          <p>Conte para a equipe o que você vai trazer. O registro ajuda a organizar a coleta por setor e evita que materiais fiquem sem destino.</p>
          <div className="schedule-section__aside">
            <span className="schedule-section__aside-mark">i</span>
            <p><strong>O que pode entrar?</strong><br />Pilhas, baterias, cabos, celulares, carregadores, teclados, mouses e placas leves.</p>
          </div>
        </div>

        <div className="form-panel">
          <div className="form-panel__heading">
            <span className="form-panel__label">FORMULÁRIO DE AGENDAMENTO</span>
            <span className="form-panel__required">* campos obrigatórios</span>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="nome">Nome completo <span aria-hidden="true">*</span></label>
              <input id="nome" name="nome" type="text" placeholder="Digite seu nome" autoComplete="name" required />
            </div>
            <div className="form-field">
              <label htmlFor="email">E-mail corporativo <span aria-hidden="true">*</span></label>
              <input id="email" name="email" type="email" placeholder="nome.sobrenome@inpasa.com.br" autoComplete="email" required />
            </div>
            <div className="form-field-grid">
              <div className="form-field">
                <label htmlFor="setor">Setor <span aria-hidden="true">*</span></label>
                <select id="setor" name="setor" defaultValue="" required>
                  <option value="" disabled>Selecione</option>
                  <option value="Tecnologia da Informação">Tecnologia da Informação</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Operacional / Planta">Operacional / Planta</option>
                  <option value="SGI / Segurança">SGI / Segurança</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="tipo">Tipo de resíduo <span aria-hidden="true">*</span></label>
                <select id="tipo" name="tipo" defaultValue="" required>
                  <option value="" disabled>Selecione</option>
                  <option value="Pilhas e baterias">Pilhas e baterias</option>
                  <option value="Celulares e carregadores">Celulares e carregadores</option>
                  <option value="Teclados, mouses e cabos">Teclados, mouses e cabos</option>
                  <option value="Placas e hardware leve">Placas e hardware leve</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="peso">Peso estimado (em gramas) <span aria-hidden="true">*</span></label>
              <input id="peso" name="peso" type="number" min="1" step="1" inputMode="numeric" placeholder="Ex.: 500" required aria-describedby="peso-help" />
              <span id="peso-help" className="form-field__help">Uma estimativa já ajuda a equipe a planejar a coleta.</span>
            </div>
            <div className="form-consent">
              <input id="lgpd" name="lgpd" type="checkbox" required />
              <label htmlFor="lgpd">Autorizo o uso dos meus dados corporativos exclusivamente para o controle logístico do mutirão, conforme a LGPD.</label>
            </div>
            {status === "error" && <p className="form-message form-message--error" role="alert">Não foi possível registrar o descarte. Revise os campos obrigatórios e verifique se o ambiente de dados está disponível.</p>}
            {status === "success" && <p className="form-message form-message--success" role="status"><CheckCircle2 aria-hidden="true" /> Agendamento persistido no banco. Protocolo <strong>{protocol}</strong>.</p>}
            <button className="button button--primary button--full" type="submit" disabled={isSubmitting || colaboradoresQuery.isLoading}>
              {isSubmitting ? <><Loader2 aria-hidden="true" className="animate-spin" /> Registrando…</> : <>Confirmar agendamento <Send aria-hidden="true" /></>}
            </button>
          </form>
          <p className="form-panel__footer">Os dados são enviados à camada controladora da aplicação para validação, persistência relacional e atualização dos indicadores.</p>
        </div>
      </div>
    </section>
  );
}
