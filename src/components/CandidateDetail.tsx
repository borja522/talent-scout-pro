import {
  MapPin, Briefcase, Mail, Phone, GraduationCap, Languages,
  ShieldCheck, ShieldAlert, ShieldQuestion, Sparkles, FileDown, CheckCircle2, XCircle,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Candidate, BackgroundCheckStatus } from "@/data/candidates";
import { scoreCandidate, useApp } from "@/contexts/AppContext";

interface CandidateDetailProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const bgConfig: Record<BackgroundCheckStatus, { label: string; icon: typeof ShieldCheck; className: string; iconBg: string }> = {
  verified: { label: "Verificado oficialmente", icon: ShieldCheck, className: "border-success/30 bg-success/5", iconBg: "bg-success/10 text-success" },
  clean: { label: "Sin antecedentes", icon: ShieldCheck, className: "border-success/30 bg-success/5", iconBg: "bg-success/10 text-success" },
  pending: { label: "Verificación en proceso", icon: ShieldQuestion, className: "border-warning/30 bg-warning/5", iconBg: "bg-warning/10 text-warning" },
  issues: { label: "Requiere atención", icon: ShieldAlert, className: "border-destructive/30 bg-destructive/5", iconBg: "bg-destructive/10 text-destructive" },
};

export const CandidateDetail = ({ candidate, open, onOpenChange }: CandidateDetailProps) => {
  const { job, user } = useApp();
  if (!candidate) return null;

  const bg = bgConfig[candidate.backgroundCheck];
  const BgIcon = bg.icon;
  const match = scoreCandidate(candidate, job);
  const isAdmin = user?.role === "admin";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-2xl">
        <div className="relative bg-gradient-to-br from-primary via-primary to-accent p-6 text-primary-foreground">
          <SheetHeader className="text-left">
            <SheetTitle className="sr-only">Perfil de candidato</SheetTitle>
          </SheetHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 text-xl font-bold backdrop-blur-sm ring-2 ring-primary-foreground/30">
              {candidate.initials}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold tracking-tight">{candidate.name}</h2>
              <p className="mt-0.5 text-sm font-medium text-primary-foreground/90">{candidate.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-primary-foreground/80">
                {candidate.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{candidate.location}</span>}
                <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{candidate.yearsExperience} años</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold tabular-nums">{match.score}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/70">Match</div>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {isAdmin && (
            <section className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold">Análisis IA · {job.title}</h3>
                <Badge className="ml-auto">{match.recommendation}</Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{match.aiSummary}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Skills cubiertas</p>
                  <div className="flex flex-wrap gap-1">
                    {match.matchedSkills.length ? match.matchedSkills.map((s) => (
                      <Badge key={s} className="gap-1 bg-success/15 text-success hover:bg-success/20 border-success/30" variant="outline">
                        <CheckCircle2 className="h-3 w-3" />{s}
                      </Badge>
                    )) : <span className="text-xs text-muted-foreground">Ninguna</span>}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Brechas</p>
                  <div className="flex flex-wrap gap-1">
                    {match.missingSkills.length ? match.missingSkills.map((s) => (
                      <Badge key={s} className="gap-1 bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/30" variant="outline">
                        <XCircle className="h-3 w-3" />{s}
                      </Badge>
                    )) : <span className="text-xs text-muted-foreground">Ninguna</span>}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Ajuste de experiencia: <span className="font-semibold text-foreground">{match.experienceFit}%</span> · Bonus por antecedentes: <span className="font-semibold text-foreground">+{match.backgroundBonus}</span>
              </div>
            </section>
          )}

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Resumen profesional</h3>
            <p className="mt-2 text-sm leading-relaxed">{candidate.bio || "—"}</p>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contacto</h3>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-medium">{candidate.email || "—"}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-medium">{candidate.phone || "—"}</span>
              </div>
            </div>
          </section>

          {candidate.pdfData && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CV en PDF</h3>
              <Button asChild variant="outline" className="mt-2">
                <a href={candidate.pdfData} download={candidate.pdfName} target="_blank" rel="noreferrer">
                  <FileDown className="mr-1.5 h-4 w-4" /> Descargar {candidate.pdfName}
                </a>
              </Button>
            </section>
          )}

          <Separator />

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Verificación de antecedentes</h3>
            <div className={`mt-2 rounded-xl border p-4 ${bg.className}`}>
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg.iconBg}`}>
                  <BgIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{bg.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{candidate.backgroundDetails || "Sin detalles registrados."}</p>
                </div>
              </div>
            </div>
          </section>

          {candidate.hardSkills.length > 0 && (
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
          )}

          {candidate.softSkills.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skills blandas</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {candidate.softSkills.map((s) => (
                  <Badge key={s} className="bg-accent/10 border border-accent/20" variant="outline">{s}</Badge>
                ))}
              </div>
            </section>
          )}

          {candidate.experience.length > 0 && (
            <>
              <Separator />
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Experiencia laboral</h3>
                <div className="mt-3 space-y-4">
                  {candidate.experience.map((exp, i) => (
                    <div key={i} className="relative pl-5">
                      <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/15" />
                      {i < candidate.experience.length - 1 && <div className="absolute left-[5px] top-4 h-full w-px bg-border" />}
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
            </>
          )}

          {(candidate.education.length > 0 || candidate.languages.length > 0) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {candidate.education.length > 0 && (
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
              )}
              {candidate.languages.length > 0 && (
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
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
