// Direção visual: Manifesto Verde Digital — página longa em ritmo editorial, alternando prova, ação e educação.
// A página apenas compõe seções; regras de negócio e conteúdo ficam nos componentes próprios.

import { EducationSection } from "@/components/site/EducationSection";
import { HeroSection } from "@/components/site/HeroSection";
import { ImpactSection } from "@/components/site/ImpactSection";
import { SchedulingForm } from "@/components/site/SchedulingForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { StepsSection } from "@/components/site/StepsSection";

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
      <SiteHeader />
      <main id="conteudo-principal">
        <HeroSection />
        <ImpactSection />
        <StepsSection />
        <SchedulingForm />
        <EducationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
