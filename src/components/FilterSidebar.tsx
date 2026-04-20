import { Search, MapPin, Briefcase, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export interface FilterState {
  query: string;
  location: string;
  minExperience: number;
  minScore: number;
  verifiedOnly: boolean;
  availableOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSidebar = ({ filters, onChange, onReset, totalResults }: FilterSidebarProps) => {
  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <aside className="space-y-6 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div>
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight">Filtros</h2>
          <button onClick={onReset} className="text-xs font-medium text-primary hover:underline">
            Limpiar
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground tabular-nums">{totalResults}</span> candidatos encontrados
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Buscar
        </Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Skill, rol, nombre..."
            value={filters.query}
            onChange={(e) => update("query", e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Ubicación
        </Label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="location"
            placeholder="Ciudad o país"
            value={filters.location}
            onChange={(e) => update("location", e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5" />
            Experiencia mínima
          </Label>
          <span className="text-xs font-bold tabular-nums text-primary">{filters.minExperience}+ años</span>
        </div>
        <Slider
          value={[filters.minExperience]}
          onValueChange={([v]) => update("minExperience", v)}
          min={0}
          max={15}
          step={1}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Match score mínimo
          </Label>
          <span className="text-xs font-bold tabular-nums text-primary">{filters.minScore}%</span>
        </div>
        <Slider
          value={[filters.minScore]}
          onValueChange={([v]) => update("minScore", v)}
          min={0}
          max={100}
          step={5}
        />
      </div>

      <div className="space-y-3 rounded-lg bg-secondary/50 p-3">
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="verified"
            checked={filters.verifiedOnly}
            onCheckedChange={(v) => update("verifiedOnly", !!v)}
          />
          <Label htmlFor="verified" className="flex cursor-pointer items-center gap-1.5 text-sm font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Solo antecedentes verificados
          </Label>
        </div>
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="available"
            checked={filters.availableOnly}
            onCheckedChange={(v) => update("availableOnly", !!v)}
          />
          <Label htmlFor="available" className="cursor-pointer text-sm font-medium">
            Solo disponibles ahora
          </Label>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={onReset}>
        Restablecer filtros
      </Button>
    </aside>
  );
};
