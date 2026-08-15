// Direção visual: Manifesto Verde Digital — símbolo de circuito orgânico, wordmark textual e escala compacta.
// O texto permanece em HTML para preservar legibilidade e acessibilidade; a imagem funciona como marca gráfica.

import { cn } from "@/lib/utils";

const LOGO_URL = "/manus-storage/inpasa_logo_mark_cb75fd1f.png";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, className }: BrandMarkProps) {
  return (
    <a
      href="#inicio"
      className={cn("brand-mark", compact && "brand-mark--compact", className)}
      aria-label="Inpasa TI Verde — voltar ao início"
    >
      <img src={LOGO_URL} alt="" aria-hidden="true" className="brand-mark__symbol" />
      <span className="brand-mark__wordmark">
        <span>INPASA</span>
        <span className="brand-mark__accent">TI VERDE</span>
      </span>
    </a>
  );
}
