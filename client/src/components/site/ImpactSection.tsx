// Direção visual: Manifesto Verde Digital — métricas como evidência, não como decoração; hierarquia editorial e alto contraste.
// Os valores atuais são indicadores da campanha fornecidos pelo material original e ficam isolados para futura integração.

import { BatteryCharging, Users, Weight } from "lucide-react";

const metrics = [
  {
    value: "58,2 kg",
    label: "resíduos coletados",
    note: "meta: 50 kg",
    icon: Weight,
    tone: "green",
  },
  {
    value: "64",
    label: "colaboradores engajados",
    note: "meta: 50 pessoas",
    icon: Users,
    tone: "blue",
  },
  {
    value: "142 kWh",
    label: "energia economizada",
    note: "equipamentos desligados",
    icon: BatteryCharging,
    tone: "coral",
  },
];

export function ImpactSection() {
  return (
    <section id="impacto" className="impact-section" aria-labelledby="impact-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" />O que já mudou</p>
            <h2 id="impact-title">Impacto que cabe<br /><em>na palma da mão.</em></h2>
          </div>
          <p className="section-heading__copy">Acompanhe os resultados consolidados do mutirão e veja como pequenos hábitos criam uma cultura de tecnologia mais responsável.</p>
        </div>
        <div className="metrics-grid" role="list" aria-label="Indicadores de impacto da campanha">
          {metrics.map(({ icon: Icon, ...metric }, index) => (
            <article className={`metric-card metric-card--${metric.tone}`} key={metric.label} role="listitem">
              <div className="metric-card__top">
                <span className="metric-card__icon"><Icon aria-hidden="true" /></span>
                <span className="metric-card__index">0{index + 1}</span>
              </div>
              <p className="metric-card__value">{metric.value}</p>
              <h3>{metric.label}</h3>
              <p className="metric-card__note">{metric.note}</p>
            </article>
          ))}
        </div>
        <div className="impact-section__footnote"><span />Indicadores demonstrativos da campanha · atualização conectada ao SGI/TI em próxima versão</div>
      </div>
    </section>
  );
}
