import { MapPin, Briefcase, ShieldCheck, ShieldAlert, ShieldQuestion, Eye, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Candidate, BackgroundCheckStatus } from "@/data/candidates";

interface CandidateCardProps {
  candidate: Candidate;
  onView: (c: Candidate) => void;
}

const bgConfig: Record<BackgroundCheckStatus, { label: string; icon: typeof ShieldCheck; className: string }> = {
  verified: { label: "Verificado", icon: ShieldCheck, className: "bg-success/10 text-success border-success/30" },
  clean: { label: "Limpio", icon: ShieldCheck, className: "bg-success/10 text-success border-success/30" },
  pending: { label: "En proceso", icon: ShieldQuestion, className: "bg-warning/10 text-warning border-warning/30" },
  issues: { label: "Revisar", icon: ShieldAlert, className: "bg-destructive/10 text-destructive border-destructive/30" },
};

export const CandidateCard = ({ candidate, onView }: CandidateCardProps) => {
  const bg = bgConfig[candidate.backgroundCheck];
  const BgIcon = bg.icon;

  return (
    <Card className="group relative flex flex-col overflow-hidden border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
      <div className="absolute right-4 top-4 flex flex-col items-end">
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl font-bold tabular-nums text-primary">{candidate.matchScore}</span>
          <span className="text-xs font-semibold text-muted-foreground">/100</span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Match score</span>
      </div>

      <div className="flex items-start gap-3 pr-20">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-base font-bold text-primary-foreground shadow-md">
          {candidate.initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold tracking-tight">{candidate.name}</h3>
          <p className="truncate text-sm font-medium text-foreground/80">{candidate.title}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{candidate.location || "—"}</span>
        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{candidate.yearsExperience} años exp.</span>
        {candidate.pdfName && (
          <span className="flex items-center gap-1 text-primary"><FileText className="h-3.5 w-3.5" />PDF</span>
        )}
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{candidate.bio}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {candidate.hardSkills.slice(0, 4).map((s) => (
          <Badge key={s.name} variant="secondary" className="text-[11px] font-medium">{s.name}</Badge>
        ))}
        {candidate.hardSkills.length > 4 && (
          <Badge variant="outline" className="text-[11px]">+{candidate.hardSkills.length - 4}</Badge>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
        <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${bg.className}`}>
          <BgIcon className="h-3 w-3" />
          {bg.label}
        </div>
        {candidate.available ? (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Disponible
          </span>
        ) : (
          <span className="text-[11px] font-medium text-muted-foreground">No disponible</span>
        )}
      </div>

      <Button onClick={() => onView(candidate)} className="mt-4 w-full font-semibold">
        <Eye className="mr-1.5 h-4 w-4" />
        Ver perfil completo
      </Button>
    </Card>
  );
};
