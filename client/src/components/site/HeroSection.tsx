// Direção visual: Manifesto Verde Digital — hero assimétrico, imagem com função narrativa e CTA de ação imediata.
// A imagem é visualmente rica, mas o conteúdo textual fica fora dela para garantir contraste e leitura assistiva.

import { ArrowDownRight, ArrowUpRight, Leaf, Recycle } from "lucide-react";

const HERO_IMAGE_URL = "/manus-storage/inpasa_hero_banner_da645c7c.png";

export function HeroSection() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow"><span className="eyebrow__line" />Ação de extensão · Dourados/MS</p>
          <h1 id="hero-title">Cada equipamento tem um próximo destino.</h1>
          <p className="hero__lead">
            O portal Inpasa TI Verde conecta pessoas, descarte responsável e impacto mensurável em uma jornada simples de logística reversa.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#agendamento">
              Agendar meu descarte <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="text-link" href="#impacto">
              Ver o impacto <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
          <div className="hero__meta" aria-label="Contexto da campanha">
            <span><strong>01</strong> Mutirão ativo</span>
            <span><strong>02</strong> Coleta no setor</span>
            <span><strong>03</strong> Destino correto</span>
          </div>
        </div>
        <div className="hero__visual" aria-label="Tecnologia e sustentabilidade em equilíbrio">
          <div className="hero__image-frame">
            <img src={HERO_IMAGE_URL} alt="Equipamentos eletrônicos e natureza representando tecnologia verde" />
            <div className="hero__stamp"><Leaf aria-hidden="true" /><span>green<br />IT</span></div>
          </div>
          <div className="hero__note">
            <Recycle aria-hidden="true" />
            <span><strong>circularidade</strong><br />começa no gesto diário</span>
          </div>
        </div>
      </div>
      <div className="hero__rail" aria-hidden="true"><span>TI VERDE · 2026.2</span><span>rolar para explorar ↓</span></div>
    </section>
  );
}
