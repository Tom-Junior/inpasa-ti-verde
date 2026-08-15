// Direção visual: Manifesto Verde Digital — blocos de leitura editorial, bordas leves e ícones como sinalizadores de conteúdo.
// A cartilha é apresentada como recurso futuro com feedback claro, sem link quebrado ou promessa de download inexistente.

import { ArrowUpRight, BookOpen, Scale, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const pillars = [
  {
    number: "01",
    title: "Ética digital",
    description: "Refletir sobre as consequências das inovações digitais para o bem comum, com transparência e responsabilidade.",
    icon: Scale,
  },
  {
    number: "02",
    title: "TI Verde",
    description: "Reduzir o impacto ecológico do hardware com eficiência energética, manutenção e descarte correto.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Conformidade",
    description: "Conectar LGPD e Política Nacional de Resíduos Sólidos à logística reversa praticada no dia a dia.",
    icon: ShieldCheck,
  },
];

export function EducationSection() {
  function handleGuideClick() {
    toast("A cartilha será disponibilizada pelo SGI/TI em uma próxima atualização.");
  }

  return (
    <section id="cartilha" className="education-section" aria-labelledby="education-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" />Para levar adiante</p>
            <h2 id="education-title">Informação também<br /><em>é infraestrutura.</em></h2>
          </div>
          <div>
            <p className="section-heading__copy">A sustentabilidade digital depende de escolhas técnicas, hábitos coletivos e uma cultura que sabe explicar o porquê de cada passo.</p>
            <button className="text-link text-link--button" type="button" onClick={handleGuideClick}>Consultar cartilha <ArrowUpRight aria-hidden="true" /></button>
          </div>
        </div>
        <div className="pillar-grid">
          {pillars.map(({ number, title, description, icon: Icon }) => (
            <article className="pillar-card" key={title}>
              <div className="pillar-card__top"><span>{number}</span><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
