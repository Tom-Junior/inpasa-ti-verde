// Direção visual: Manifesto Verde Digital — sequência numerada, leitura rápida e linguagem de instrução sem excesso de decoração.
// A lista usa elementos nativos para manter a ordem compreensível em leitores de tela e em telas estreitas.

import { ArrowRight, Box, ClipboardCheck, MapPin } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Registre no portal",
    description: "Informe o tipo e o peso aproximado do resíduo que você vai entregar.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Prepare o item",
    description: "Separe cabos, pilhas e aparelhos antigos com segurança e sem misturar materiais.",
    icon: Box,
  },
  {
    number: "03",
    title: "Leve ao coletor",
    description: "Entregue no ponto identificado do seu setor dentro do período do mutirão.",
    icon: MapPin,
  },
];

export function StepsSection() {
  return (
    <section className="steps-section" aria-labelledby="steps-title">
      <div className="container steps-section__grid">
        <div className="steps-section__intro">
          <p className="eyebrow"><span className="eyebrow__line" />Sem complicação</p>
          <h2 id="steps-title">Do clique ao coletor, em <em>três passos.</em></h2>
          <p>O descarte responsável não precisa interromper sua rotina. Reserve um momento, prepare o material e deixe a logística reversa acontecer.</p>
          <a className="text-link" href="#agendamento">Começar agora <ArrowRight aria-hidden="true" /></a>
        </div>
        <ol className="steps-list">
          {steps.map(({ number, title, description, icon: Icon }) => (
            <li className="step" key={number}>
              <span className="step__number">{number}</span>
              <span className="step__icon"><Icon aria-hidden="true" /></span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
