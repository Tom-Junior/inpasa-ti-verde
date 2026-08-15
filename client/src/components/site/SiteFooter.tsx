// Direção visual: Manifesto Verde Digital — rodapé como ficha institucional, com contexto, não como bloco decorativo.
// Links externos usam nomes claros e o estado frontend-only fica explícito para evitar expectativas incorretas.

import { ArrowUpRight, Github, Leaf } from "lucide-react";
import { BrandMark } from "./BrandMark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <BrandMark compact />
          <p>Um gesto simples para uma tecnologia mais responsável.</p>
        </div>
        <div className="site-footer__column">
          <span className="site-footer__label">NAVEGAÇÃO</span>
          <a href="#inicio">Início</a>
          <a href="#impacto">Impacto</a>
          <a href="#agendamento">Agendar descarte</a>
        </div>
        <div className="site-footer__column">
          <span className="site-footer__label">PROJETO</span>
          <a href="https://www.inpasa.com.br/" target="_blank" rel="noreferrer">Inpasa Agroindustrial <ArrowUpRight aria-hidden="true" /></a>
          <a href="https://github.com/" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> Código no GitHub</a>
        </div>
        <div className="site-footer__signature">
          <Leaf aria-hidden="true" />
          <span>TI VERDE<br /><strong>INPASA</strong></span>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>Projeto Integrador II · UFMS Digital · 2026.2</span>
        <span>Feito para o SGI/TI · Dourados/MS</span>
      </div>
    </footer>
  );
}
