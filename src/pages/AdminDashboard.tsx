import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { FilterSidebar, type FilterState } from "@/components/FilterSidebar";
import { CandidateCard } from "@/components/CandidateCard";
import { CandidateDetail } from "@/components/CandidateDetail";
import { JobSpecCard } from "@/components/JobSpecCard";
import { useApp, scoreCandidate } from "@/contexts/AppContext";
import type { Candidate } from "@/data/candidates";
import { Sparkles, Users, ShieldCheck, TrendingUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const defaultFilters: FilterState = {
  query: "",
  location: "",
  minExperience: 0,
  minScore: 0,
  verifiedOnly: false,
  availableOnly: false,
};

const AdminDashboard = () => {
  const { candidates, job, deleteCandidate } = useApp();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [open, setOpen] = useState(false);

  // Recalcular scores contra la vacante actual
  const scored = useMemo(
    () => candidates.map((c) => ({ ...c, matchScore: scoreCandidate(c, job).score })),
    [candidates, job]
  );

  const filtered = useMemo(() => {
    const q = filters.query.toLowerCase().trim();
    const loc = filters.location.toLowerCase().trim();
    return scored.filter((c) => {
      if (q) {
        const hay = `${c.name} ${c.title} ${c.bio} ${c.hardSkills.map((s) => s.name).join(" ")} ${c.softSkills.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (loc && !c.location.toLowerCase().includes(loc)) return false;
      if (c.yearsExperience < filters.minExperience) return false;
      if (c.matchScore < filters.minScore) return false;
      if (filters.verifiedOnly && !["verified", "clean"].includes(c.backgroundCheck)) return false;
      if (filters.availableOnly && !c.available) return false;
      return true;
    });
  }, [scored, filters]);

  const ranked = filtered.slice().sort((a, b) => b.matchScore - a.matchScore);

  const stats = [
    { label: "CVs totales", value: candidates.length, icon: Users },
    { label: "Verificados", value: candidates.filter((c) => ["verified", "clean"].includes(c.backgroundCheck)).length, icon: ShieldCheck },
    { label: "Match >80", value: scored.filter((c) => c.matchScore >= 80).length, icon: TrendingUp },
    { label: "Top recomendados", value: scored.filter((c) => c.matchScore >= 85).length, icon: Sparkles },
  ];

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`¿Eliminar la hoja de vida de ${name}?`)) return;
    deleteCandidate(id);
    setOpen(false);
    toast.success("Hoja de vida eliminada");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-gradient-to-br from-primary via-primary to-accent">
        <div className="container py-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              Panel de administrador
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Hojas de vida y ranking de mejores candidatos
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-primary-foreground/85">
              Define los requisitos de tu vacante y el sistema rankea automáticamente los CVs con scoring por skills + análisis IA.
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

      <main className="container py-8">
        <div className="mb-6">
          <JobSpecCard />
        </div>

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
                <h2 className="text-xl font-bold tracking-tight">Ranking de candidatos</h2>
                <p className="text-sm text-muted-foreground">Ordenado por match score contra la vacante</p>
              </div>
            </div>

            {ranked.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
                <Users className="h-10 w-10 text-muted-foreground/40" />
                <p className="mt-3 text-sm font-semibold">No hay candidatos con esos filtros</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {ranked.map((c, i) => (
                  <div key={c.id} className="relative">
                    {i < 3 && (
                      <div className="absolute -left-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground shadow-lg">
                        #{i + 1}
                      </div>
                    )}
                    <CandidateCard candidate={c} onView={(x) => { setSelected(x); setOpen(true); }} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(c.id, c.name)}
                      className="absolute right-2 top-2 h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <CandidateDetail candidate={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default AdminDashboard;
