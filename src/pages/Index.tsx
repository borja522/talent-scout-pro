import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { FilterSidebar, type FilterState } from "@/components/FilterSidebar";
import { CandidateCard } from "@/components/CandidateCard";
import { CandidateDetail } from "@/components/CandidateDetail";
import { candidates as initialCandidates, type Candidate } from "@/data/candidates";
import { toast } from "sonner";
import { Sparkles, Users, ShieldCheck, TrendingUp } from "lucide-react";

const defaultFilters: FilterState = {
  query: "",
  location: "",
  minExperience: 0,
  minScore: 0,
  verifiedOnly: false,
  availableOnly: false,
};

const Index = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [credits, setCredits] = useState(50);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = filters.query.toLowerCase().trim();
    const loc = filters.location.toLowerCase().trim();
    return candidates.filter((c) => {
      if (q) {
        const hay = `${c.title} ${c.bio} ${c.hardSkills.map((s) => s.name).join(" ")} ${c.softSkills.join(" ")} ${c.purchased ? c.name : ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (loc && !c.location.toLowerCase().includes(loc)) return false;
      if (c.yearsExperience < filters.minExperience) return false;
      if (c.matchScore < filters.minScore) return false;
      if (filters.verifiedOnly && !["verified", "clean"].includes(c.backgroundCheck)) return false;
      if (filters.availableOnly && !c.available) return false;
      return true;
    });
  }, [candidates, filters]);

  const purchasedCount = candidates.filter((c) => c.purchased).length;

  const handleView = (c: Candidate) => {
    setSelected(c);
    setOpen(true);
  };

  const handlePurchase = (id: string) => {
    const c = candidates.find((x) => x.id === id);
    if (!c) return;
    if (credits < c.price) {
      toast.error("Créditos insuficientes", { description: "Recarga tu plan para continuar." });
      return;
    }
    setCredits((p) => p - c.price);
    setCandidates((prev) => prev.map((x) => (x.id === id ? { ...x, purchased: true } : x)));
    setSelected({ ...c, purchased: true });
    toast.success("Perfil desbloqueado", {
      description: `Has gastado ${c.price} créditos. Ya puedes ver los datos completos.`,
    });
  };

  const stats = [
    { label: "Candidatos", value: candidates.length, icon: Users },
    { label: "Verificados", value: candidates.filter((c) => ["verified", "clean"].includes(c.backgroundCheck)).length, icon: ShieldCheck },
    { label: "Match >90", value: candidates.filter((c) => c.matchScore >= 90).length, icon: TrendingUp },
    { label: "Tus créditos", value: credits, icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header credits={credits} purchasedCount={purchasedCount} />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-primary via-primary to-accent">
        <div className="container py-10 md:py-14">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              Plataforma B2B de talento verificado
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
              Contrata talento con CV, skills y antecedentes verificados
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-primary-foreground/85">
              Compra acceso a perfiles completos: hard skills evaluadas, soft skills, historial laboral y verificación de antecedentes penales. Todo en un mismo lugar.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-4 backdrop-blur-sm">
                  <Icon className="h-4 w-4 text-primary-foreground/70" />
                  <div className="mt-2 text-2xl font-bold tabular-nums text-primary-foreground">{s.value}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/70">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="container py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
            totalResults={filtered.length}
          />

          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Talento disponible</h2>
                <p className="text-sm text-muted-foreground">Ordenado por match score</p>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
                <Users className="h-10 w-10 text-muted-foreground/40" />
                <p className="mt-3 text-sm font-semibold">No hay candidatos con esos filtros</p>
                <p className="mt-1 text-xs text-muted-foreground">Intenta ampliar los criterios de búsqueda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered
                  .slice()
                  .sort((a, b) => b.matchScore - a.matchScore)
                  .map((c) => (
                    <CandidateCard key={c.id} candidate={c} onView={handleView} />
                  ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="container py-6 text-center text-xs text-muted-foreground">
          © 2026 TalentVault Enterprise · Verificación de antecedentes potenciada por proveedores certificados
        </div>
      </footer>

      <CandidateDetail
        candidate={selected}
        open={open}
        onOpenChange={setOpen}
        credits={credits}
        onPurchase={handlePurchase}
      />
    </div>
  );
};

export default Index;
