import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Plus, X, Save } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";

export const JobSpecCard = () => {
  const { job, setJob } = useApp();
  const [draft, setDraft] = useState(job);
  const [reqInput, setReqInput] = useState("");
  const [niceInput, setNiceInput] = useState("");

  const addReq = () => {
    if (!reqInput.trim()) return;
    setDraft({ ...draft, requiredSkills: [...draft.requiredSkills, reqInput.trim()] });
    setReqInput("");
  };
  const addNice = () => {
    if (!niceInput.trim()) return;
    setDraft({ ...draft, niceToHave: [...draft.niceToHave, niceInput.trim()] });
    setNiceInput("");
  };

  const save = () => {
    setJob(draft);
    toast.success("Vacante actualizada · ranking recalculado");
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Briefcase className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider">Vacante para comparar</h2>
          <p className="text-xs text-muted-foreground">Define los requisitos. El sistema rankea los CVs automáticamente.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Título del cargo</Label>
          <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Años de experiencia mínima</Label>
          <Input type="number" min={0} value={draft.minExperience} onChange={(e) => setDraft({ ...draft, minExperience: +e.target.value })} />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Label>Skills requeridas</Label>
        <div className="flex flex-wrap gap-1.5">
          {draft.requiredSkills.map((s) => (
            <Badge key={s} className="gap-1 pr-1">
              {s}
              <button onClick={() => setDraft({ ...draft, requiredSkills: draft.requiredSkills.filter((x) => x !== s) })} className="rounded-full p-0.5 hover:bg-destructive/20">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Agregar skill..." value={reqInput} onChange={(e) => setReqInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addReq())} />
          <Button type="button" variant="outline" size="sm" onClick={addReq}><Plus className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Label>Deseables (nice to have)</Label>
        <div className="flex flex-wrap gap-1.5">
          {draft.niceToHave.map((s) => (
            <Badge key={s} variant="outline" className="gap-1 pr-1">
              {s}
              <button onClick={() => setDraft({ ...draft, niceToHave: draft.niceToHave.filter((x) => x !== s) })} className="rounded-full p-0.5 hover:bg-destructive/20">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Agregar deseable..." value={niceInput} onChange={(e) => setNiceInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addNice())} />
          <Button type="button" variant="outline" size="sm" onClick={addNice}><Plus className="h-4 w-4" /></Button>
        </div>
      </div>

      <Button onClick={save} className="mt-4 w-full sm:w-auto">
        <Save className="mr-1.5 h-4 w-4" /> Guardar vacante y recalcular ranking
      </Button>
    </Card>
  );
};
