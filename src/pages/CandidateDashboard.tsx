import { Header } from "@/components/Header";
import { CVForm } from "@/components/CVForm";
import { useApp } from "@/contexts/AppContext";
import { FileText, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CandidateDashboard = () => {
  const { user, candidates, saveCandidate, deleteCandidate } = useApp();
  const myCV = candidates.find((c) => c.id === user?.candidateId);

  const handleDelete = () => {
    if (!myCV) return;
    if (!confirm("¿Eliminar tu hoja de vida?")) return;
    deleteCandidate(myCV.id);
    toast.success("Hoja de vida eliminada");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl py-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mi hoja de vida</h1>
            <p className="text-sm text-muted-foreground">
              Completa tu perfil para que las empresas puedan compararte con sus vacantes.
            </p>
          </div>
          {myCV && (
            <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive">
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />Eliminar
            </Button>
          )}
        </div>

        {myCV?.pdfName && (
          <Card className="mb-4 flex items-center gap-3 border-success/30 bg-success/5 p-4">
            <FileText className="h-5 w-5 text-success" />
            <div className="flex-1">
              <p className="text-sm font-semibold">PDF cargado: {myCV.pdfName}</p>
              <p className="text-xs text-muted-foreground">Puedes reemplazarlo abajo si quieres.</p>
            </div>
            {myCV.pdfData && (
              <Button asChild size="sm" variant="outline">
                <a href={myCV.pdfData} download={myCV.pdfName}>Descargar</a>
              </Button>
            )}
          </Card>
        )}

        <CVForm initial={myCV} onSave={saveCandidate} />
      </main>
    </div>
  );
};

export default CandidateDashboard;
