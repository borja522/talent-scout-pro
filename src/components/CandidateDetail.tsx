import {
  MapPin, Briefcase, Mail, Phone, GraduationCap, Languages,
  ShieldCheck, ShieldAlert, ShieldQuestion, Sparkles, Lock, CheckCircle2, FileDown
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Candidate, BackgroundCheckStatus } from "@/data/candidates";

interface CandidateDetailProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  credits: number;
  onPurchase: (id: string) => void;
}

const bgConfig: Record<BackgroundCheckStatus, { label: string; icon: typeof ShieldCheck; className: string; iconBg: string }> = {
  verified: { label: "Verificado oficialmente", icon: ShieldCheck, className: "border-success/30 bg-success/5", iconBg: "bg-success/10 text-success" },
  clean: { label: "Sin antecedentes", icon: ShieldCheck, className: "border-success/30 bg-success/5", iconBg: "bg-success/10 text-success" },
  pending: { label: "Verificación en proceso", icon: ShieldQuestion, className: "border-warning/30 bg-warning/5", iconBg: "bg-warning/10 text-warning" },
  issues: { label: "Requiere atención", icon: ShieldAlert, className: "border-destructive/30 bg-destructive/5", iconBg: "bg-destructive/10 text-destructive" },
};

export const CandidateDetail = ({ candidate, open, onOpenChange, credits, onPurchase }: CandidateDetailProps) => {
  if (!candidate) return null;

  const isPurchased = candidate.purchased;
  const canAfford = credits >= candidate.price;
  const bg = bgConfig[candidate.backgroundCheck];
  const BgIcon = bg.icon;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-2xl">
        {/* Hero header */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-accent p-6 text-primary-foreground">
          <SheetHeader className="text-left">
            <SheetTitle className="sr-only">Perfil de candidato</SheetTitle>
          </SheetHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 text-xl font-bold backdrop-blur-sm ring-2 ring-primary-foreground/30">
              {candidate.initials}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className={`text-xl font-bold tracking-tight ${isPurchased ? "" : "blur-md select-none"}`}>
                {isPurchased ? candidate.name : "Nombre Confidencial"}
              </h2>
              <p className="mt-0.5 text-sm font-medium text-primary-foreground/90">{candidate.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-primary-foreground/80">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{candidate.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{candidate.yearsExperience} años</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold tabular-nums">{candidate.matchScore}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/70">Match</div>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* Purchase CTA */}
          {!isPurchased && (
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold">Perfil bloqueado</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Desbloquea el contacto, CV completo y verificación de antecedentes por <span className="font-bold text-foreground">{candidate.price} créditos</span>.
                  </p>
                  <Button
                    onClick={() => onPurchase(candidate.id)}
                    disabled={!canAfford}
                    className="mt-3 w-full sm:w-auto"
                  >
                    <Sparkles className="mr-1.5 h-4 w-4" />
                    {canAfford ? `Comprar por ${candidate.price} créditos` : "Créditos insuficientes"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isPurchased && (
            <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success/5 px-4 py-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              <div className="flex-1 text-sm">
                <span className="font-semibold text-success">Perfil desbloqueado</span>
                <span className="text-muted-foreground"> · Acceso completo al CV</span>
              </div>
              <Button size="sm" variant="outline">
                <FileDown className="mr-1.5 h-3.5 w-3.5" />
                Descargar CV
              </Button>
            </div>
          )}

          {/* Bio */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Resumen profesional</h3>
            <p className="mt-2 text-sm leading-relaxed">{candidate.bio}</p>
          </section>

          {/* Contact */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contacto</h3>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className={isPurchased ? "font-medium" : "blur-sm select-none"}>{isPurchased ? candidate.email : "oculto@email.com"}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className={isPurchased ? "font-medium" : "blur-sm select-none"}>{isPurchased ? candidate.phone : "+00 000 000 000"}</span>
              </div>
            </div>
          </section>

          <Separator />

          {/* Background check */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Verificación de antecedentes</h3>
            <div className={`mt-2 rounded-xl border p-4 ${bg.className}`}>
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg.iconBg}`}>
                  <BgIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{bg.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{candidate.backgroundDetails}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Hard skills */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skills técnicas (duras)</h3>
            <div className="mt-3 space-y-3">
              {candidate.hardSkills.map((s) => (
                <div key={s.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-xs font-bold tabular-nums text-primary">{s.level}%</span>
                  </div>
                  <Progress value={s.level} className="h-1.5" />
                </div>
              ))}
            </div>
          </section>

          {/* Soft skills */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skills blandas</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.softSkills.map((s) => (
                <Badge key={s} className="bg-accent/10 text-accent-foreground hover:bg-accent/20 border border-accent/20" variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          </section>

          <Separator />

          {/* Experience */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Experiencia laboral</h3>
            <div className="mt-3 space-y-4">
              {candidate.experience.map((exp, i) => (
                <div key={i} className="relative pl-5">
                  <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/15" />
                  {i < candidate.experience.length - 1 && (
                    <div className="absolute left-[5px] top-4 h-full w-px bg-border" />
                  )}
                  <div className="pb-2">
                    <p className="text-sm font-bold">{exp.role}</p>
                    <p className="text-sm font-medium text-primary">{exp.company}</p>
                    <p className="text-xs text-muted-foreground">{exp.period}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Languages */}
          <div className="grid gap-4 sm:grid-cols-2">
            <section>
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5" /> Educación
              </h3>
              <div className="mt-2 space-y-2">
                {candidate.education.map((e, i) => (
                  <div key={i} className="rounded-lg border border-border bg-secondary/40 p-3">
                    <p className="text-sm font-semibold">{e.degree}</p>
                    <p className="text-xs text-muted-foreground">{e.school} · {e.year}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Languages className="h-3.5 w-3.5" /> Idiomas
              </h3>
              <div className="mt-2 space-y-2">
                {candidate.languages.map((l) => (
                  <div key={l.name} className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm">
                    <span className="font-semibold">{l.name}</span>
                    <Badge variant="secondary" className="text-[10px]">{l.level}</Badge>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
