import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, FileText } from "lucide-react";
import type { Candidate, BackgroundCheckStatus } from "@/data/candidates";
import { toast } from "sonner";

interface Props {
  initial?: Candidate;
  onSave: (c: Candidate) => void;
}

const empty: Candidate = {
  id: "",
  name: "",
  title: "",
  location: "",
  yearsExperience: 0,
  matchScore: 0,
  price: 0,
  avatar: "",
  initials: "",
  bio: "",
  email: "",
  phone: "",
  hardSkills: [],
  softSkills: [],
  experience: [],
  education: [],
  languages: [],
  backgroundCheck: "pending",
  backgroundDetails: "",
  available: true,
};

export const CVForm = ({ initial, onSave }: Props) => {
  const [c, setC] = useState<Candidate>(initial ?? { ...empty, id: crypto.randomUUID() });
  const [skillInput, setSkillInput] = useState("");
  const [skillLevel, setSkillLevel] = useState(70);
  const [softInput, setSoftInput] = useState("");
  const [pdfName, setPdfName] = useState<string | undefined>(initial?.pdfName);

  const update = <K extends keyof Candidate>(k: K, v: Candidate[K]) => setC((p) => ({ ...p, [k]: v }));

  const addHard = () => {
    if (!skillInput.trim()) return;
    update("hardSkills", [...c.hardSkills, { name: skillInput.trim(), level: skillLevel }]);
    setSkillInput("");
  };
  const removeHard = (n: string) => update("hardSkills", c.hardSkills.filter((s) => s.name !== n));

  const addSoft = () => {
    if (!softInput.trim()) return;
    update("softSkills", [...c.softSkills, softInput.trim()]);
    setSoftInput("");
  };
  const removeSoft = (n: string) => update("softSkills", c.softSkills.filter((s) => s !== n));

  const addExp = () =>
    update("experience", [...c.experience, { company: "", role: "", period: "", description: "" }]);
  const updateExp = (i: number, k: string, v: string) =>
    update("experience", c.experience.map((e, idx) => (idx === i ? { ...e, [k]: v } : e)));
  const removeExp = (i: number) => update("experience", c.experience.filter((_, idx) => idx !== i));

  const addEdu = () => update("education", [...c.education, { school: "", degree: "", year: "" }]);
  const updateEdu = (i: number, k: string, v: string) =>
    update("education", c.education.map((e, idx) => (idx === i ? { ...e, [k]: v } : e)));
  const removeEdu = (i: number) => update("education", c.education.filter((_, idx) => idx !== i));

  const addLang = () => update("languages", [...c.languages, { name: "", level: "B1" }]);
  const updateLang = (i: number, k: string, v: string) =>
    update("languages", c.languages.map((l, idx) => (idx === i ? { ...l, [k]: v } : l)));
  const removeLang = (i: number) => update("languages", c.languages.filter((_, idx) => idx !== i));

  const onPdf = (file?: File) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Solo se permiten archivos PDF");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("El archivo no debe superar los 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      update("pdfData", reader.result as string);
      update("pdfName", file.name);
      setPdfName(file.name);
      toast.success("PDF cargado");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!c.name.trim() || !c.title.trim()) {
      toast.error("Nombre y título son obligatorios");
      return;
    }
    const initials = c.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
    onSave({ ...c, initials });
    toast.success("Hoja de vida guardada");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="space-y-4 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Información personal</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5"><Label>Nombre completo *</Label><Input value={c.name} onChange={(e) => update("name", e.target.value)} required /></div>
          <div className="space-y-1.5"><Label>Cargo / Título *</Label><Input value={c.title} onChange={(e) => update("title", e.target.value)} required /></div>
          <div className="space-y-1.5"><Label>Ubicación</Label><Input value={c.location} onChange={(e) => update("location", e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Años de experiencia</Label><Input type="number" min={0} value={c.yearsExperience} onChange={(e) => update("yearsExperience", +e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={c.email} onChange={(e) => update("email", e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Teléfono</Label><Input value={c.phone} onChange={(e) => update("phone", e.target.value)} /></div>
        </div>
        <div className="space-y-1.5"><Label>Resumen profesional</Label><Textarea rows={3} value={c.bio} onChange={(e) => update("bio", e.target.value)} /></div>
      </Card>

      <Card className="space-y-4 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">CV en PDF</h3>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-secondary/30 p-6 text-sm transition hover:bg-secondary/50">
          <input type="file" accept="application/pdf" className="hidden" onChange={(e) => onPdf(e.target.files?.[0])} />
          {pdfName ? (
            <><FileText className="h-5 w-5 text-primary" /><span className="font-medium">{pdfName}</span><span className="text-xs text-muted-foreground">(click para cambiar)</span></>
          ) : (
            <><Upload className="h-5 w-5 text-muted-foreground" /><span>Subir CV en PDF (máx. 5MB)</span></>
          )}
        </label>
      </Card>

      <Card className="space-y-4 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Skills duras (técnicas)</h3>
        <div className="flex flex-wrap gap-2">
          {c.hardSkills.map((s) => (
            <Badge key={s.name} variant="secondary" className="gap-1.5 pr-1">
              {s.name} · {s.level}%
              <button type="button" onClick={() => removeHard(s.name)} className="rounded-full hover:bg-destructive/20 p-0.5"><X className="h-3 w-3" /></button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Ej: React" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} />
          <Input type="number" min={0} max={100} className="w-24" value={skillLevel} onChange={(e) => setSkillLevel(+e.target.value)} />
          <Button type="button" variant="outline" onClick={addHard}><Plus className="h-4 w-4" /></Button>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Skills blandas</h3>
        <div className="flex flex-wrap gap-2">
          {c.softSkills.map((s) => (
            <Badge key={s} variant="outline" className="gap-1.5 pr-1">
              {s}
              <button type="button" onClick={() => removeSoft(s)} className="rounded-full hover:bg-destructive/20 p-0.5"><X className="h-3 w-3" /></button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Ej: Liderazgo" value={softInput} onChange={(e) => setSoftInput(e.target.value)} />
          <Button type="button" variant="outline" onClick={addSoft}><Plus className="h-4 w-4" /></Button>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Experiencia laboral</h3>
          <Button type="button" size="sm" variant="outline" onClick={addExp}><Plus className="mr-1 h-3.5 w-3.5" />Agregar</Button>
        </div>
        {c.experience.map((exp, i) => (
          <div key={i} className="grid gap-2 rounded-lg border border-border p-3 md:grid-cols-2">
            <Input placeholder="Empresa" value={exp.company} onChange={(e) => updateExp(i, "company", e.target.value)} />
            <Input placeholder="Cargo" value={exp.role} onChange={(e) => updateExp(i, "role", e.target.value)} />
            <Input placeholder="Periodo (2020 — 2023)" value={exp.period} onChange={(e) => updateExp(i, "period", e.target.value)} />
            <Button type="button" variant="ghost" size="sm" onClick={() => removeExp(i)} className="text-destructive"><X className="mr-1 h-3.5 w-3.5" />Quitar</Button>
            <Textarea placeholder="Descripción" className="md:col-span-2" rows={2} value={exp.description} onChange={(e) => updateExp(i, "description", e.target.value)} />
          </div>
        ))}
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Educación</h3>
          <Button type="button" size="sm" variant="outline" onClick={addEdu}><Plus className="mr-1 h-3.5 w-3.5" />Agregar</Button>
        </div>
        {c.education.map((e, i) => (
          <div key={i} className="grid gap-2 rounded-lg border border-border p-3 md:grid-cols-4">
            <Input placeholder="Institución" className="md:col-span-2" value={e.school} onChange={(ev) => updateEdu(i, "school", ev.target.value)} />
            <Input placeholder="Título" value={e.degree} onChange={(ev) => updateEdu(i, "degree", ev.target.value)} />
            <div className="flex gap-1">
              <Input placeholder="Año" value={e.year} onChange={(ev) => updateEdu(i, "year", ev.target.value)} />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeEdu(i)} className="text-destructive"><X className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Idiomas</h3>
          <Button type="button" size="sm" variant="outline" onClick={addLang}><Plus className="mr-1 h-3.5 w-3.5" />Agregar</Button>
        </div>
        {c.languages.map((l, i) => (
          <div key={i} className="grid gap-2 md:grid-cols-3">
            <Input placeholder="Idioma" value={l.name} onChange={(e) => updateLang(i, "name", e.target.value)} />
            <Input placeholder="Nivel (A1, B2, Nativo...)" value={l.level} onChange={(e) => updateLang(i, "level", e.target.value)} />
            <Button type="button" variant="ghost" size="sm" onClick={() => removeLang(i)} className="text-destructive"><X className="mr-1 h-3.5 w-3.5" />Quitar</Button>
          </div>
        ))}
      </Card>

      <Card className="space-y-4 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Antecedentes</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Estado</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={c.backgroundCheck}
              onChange={(e) => update("backgroundCheck", e.target.value as BackgroundCheckStatus)}
            >
              <option value="pending">En proceso</option>
              <option value="clean">Limpio</option>
              <option value="verified">Verificado oficialmente</option>
              <option value="issues">Con observaciones</option>
            </select>
          </div>
          <div className="space-y-1.5 flex items-end gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={c.available} onChange={(e) => update("available", e.target.checked)} />
              Disponible para entrevistas
            </label>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Detalles</Label>
          <Textarea rows={2} value={c.backgroundDetails} onChange={(e) => update("backgroundDetails", e.target.value)} />
        </div>
      </Card>

      <Button type="submit" size="lg" className="w-full">Guardar hoja de vida</Button>
    </form>
  );
};
