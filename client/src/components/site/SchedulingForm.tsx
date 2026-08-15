// Direção visual: Manifesto Verde Digital — formulário tratado como ponto de ação, com labels claros e confirmação objetiva.
// O envio é demonstrativo e local: nenhum dado é transmitido enquanto a aplicação não tiver uma API autorizada.

import { CheckCircle2, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

type FormStatus = "idle" | "success" | "error";

function createProtocol() {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `TV-${new Date().getFullYear()}-${suffix}`;
}

export function SchedulingForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [protocol, setProtocol] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const hasConsent = data.get("lgpd") === "on";
    const weight = Number(data.get("peso"));

    if (!hasConsent || !weight || weight < 1) {
      setStatus("error");
      return;
    }

    setProtocol(createProtocol());
    setStatus("success");
    form.reset();
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
                  <option value="ti">Tecnologia da Informação</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="operacional">Operacional / Planta</option>
                  <option value="sgi">SGI / Segurança</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="tipo">Tipo de resíduo <span aria-hidden="true">*</span></label>
                <select id="tipo" name="tipo" defaultValue="" required>
                  <option value="" disabled>Selecione</option>
                  <option value="baterias">Pilhas e baterias</option>
                  <option value="celulares">Celulares e carregadores</option>
                  <option value="perifericos">Teclados, mouses e cabos</option>
                  <option value="hardware">Placas e hardware leve</option>
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
            {status === "error" && <p className="form-message form-message--error" role="alert">Revise os campos obrigatórios e aceite o termo de tratamento de dados.</p>}
            {status === "success" && <p className="form-message form-message--success" role="status"><CheckCircle2 aria-hidden="true" /> Agendamento registrado nesta sessão. Protocolo <strong>{protocol}</strong>.</p>}
            <button className="button button--primary button--full" type="submit">
              Confirmar agendamento <Send aria-hidden="true" />
            </button>
          </form>
          <p className="form-panel__footer">Ao enviar, você verá uma confirmação local. A integração com o SGI/TI será conectada em uma próxima etapa.</p>
        </div>
      </div>
    </section>
  );
}
