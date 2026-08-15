// Direção visual: Manifesto Verde Digital — cabeçalho de sinalização, navegação simples e foco visível.
// O menu mobile usa estado explícito, aria-expanded e fechamento após navegação.

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "./BrandMark";

const navigation = [
  { href: "#impacto", label: "Impacto" },
  { href: "#agendamento", label: "Agendar descarte" },
  { href: "#cartilha", label: "Cartilha" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <BrandMark />
        <button
          type="button"
          className="icon-button site-header__menu-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Fechar menu principal" : "Abrir menu principal"}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="site-nav__cta" href="#agendamento" onClick={() => setMenuOpen(false)}>
            Participar <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
