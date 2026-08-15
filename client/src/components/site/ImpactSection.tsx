// Direção visual: Manifesto Verde Digital — métricas como evidência, não como decoração; hierarquia editorial e alto contraste.
// Os cards consultam o dashboard persistido e exibem estado de carregamento sem inventar dados.

import { trpc } from "@/lib/trpc";
import { BatteryCharging, Database, Users, Weight } from "lucide-react";

function formatWeight(weightInGrams: number) {
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(weightInGrams / 1000)} kg`;
}

export function ImpactSection() {
  const metricsQuery = trpc.dashboard.metrics.useQuery();
  const metrics = metricsQuery.data ?? { totalPesoG: 0, totalDescartes: 0, totalColaboradores: 0 };
  const loadingValue = metricsQuery.isLoading ? "—" : null;
  const cards = [
    {
      value: loadingValue ?? formatWeight(metrics.totalPesoG),
      label: "resíduos registrados",
      note: "peso consolidado",
      icon: Weight,
      tone: "green",
    },
    {
      value: loadingValue ?? String(metrics.totalColaboradores),
      label: "colaboradores engajados",
      note: "cadastros ativos",
      icon: Users,
      tone: "blue",
    },
    {
      value: loadingValue ?? String(metrics.totalDescartes),
      label: "descartes registrados",
      note: "operações persistidas",
      icon: BatteryCharging,
      tone: "coral",
    },
  ];

  return (
    <section id="impacto" className="impact-section" aria-labelledby="impact-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" />O que já mudou</p>
            <h2 id="impact-title">Impacto que cabe<br /><em>na palma da mão.</em></h2>
          </div>
          <div>
            <p className="section-heading__copy">Acompanhe os resultados consolidados do banco de dados e veja como pequenos hábitos criam uma cultura de tecnologia mais responsável.</p>
            <p className="dashboard-status"><Database aria-hidden="true" /> {metricsQuery.isError ? "Dashboard indisponível no momento" : "Atualização conectada ao SGI/TI"}</p>
          </div>
        </div>
        <div className="metrics-grid" role="list" aria-label="Indicadores persistidos de impacto da campanha">
          {cards.map(({ icon: Icon, ...metric }, index) => (
            <article className={`metric-card metric-card--${metric.tone}`} key={metric.label} role="listitem">
              <div className="metric-card__top">
                <span className="metric-card__icon"><Icon aria-hidden="true" /></span>
                <span className="metric-card__index">0{index + 1}</span>
              </div>
              <p className="metric-card__value" aria-live="polite">{metric.value}</p>
              <h3>{metric.label}</h3>
              <p className="metric-card__note">{metric.note}</p>
            </article>
          ))}
        </div>
        <div className="impact-section__footnote"><span />Os indicadores são calculados por consultas relacionais sobre `Colaborador` e `Descarte`.</div>
      </div>
    </section>
  );
}
