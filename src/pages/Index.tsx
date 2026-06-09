import { Link, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { Sparkles, ShieldCheck, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const { user } = useApp();

  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/candidate"} replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="border-b border-border bg-gradient-to-br from-primary via-primary to-accent">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
              <Sparkles className="h-3 w-3" />
              Plataforma B2B de reclutamiento
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
              Encuentra al mejor candidato con scoring + análisis IA
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
              Los candidatos suben su hoja de vida. Las empresas definen la vacante y el sistema rankea automáticamente los mejores perfiles.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/register">Crear cuenta gratis</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                <Link to="/login">Iniciar sesión</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Users, title: "Para candidatos", desc: "Sube tu CV en PDF y completa tu perfil con skills, experiencia y antecedentes." },
            { icon: TrendingUp, title: "Para empresas", desc: "Define los requisitos de la vacante y obtén un ranking automático de los mejores perfiles." },
            { icon: ShieldCheck, title: "Verificación incluida", desc: "Cada candidato muestra el estado de su verificación de antecedentes." },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 text-lg font-bold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Index;
