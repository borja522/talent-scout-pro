import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useApp, type Role } from "@/contexts/AppContext";
import { toast } from "sonner";
import { Briefcase } from "lucide-react";

const Register = () => {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "candidate" as Role });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    const u = register(form);
    if (!u) {
      toast.error("Ese email ya está registrado");
      return;
    }
    toast.success("Cuenta creada");
    navigate(u.role === "admin" ? "/admin" : "/candidate");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight">Crear cuenta</h1>
            <p className="mt-1 text-sm text-muted-foreground">Empieza a usar TalentVault</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Tipo de cuenta</Label>
              <RadioGroup
                value={form.role}
                onValueChange={(v) => setForm({ ...form, role: v as Role })}
                className="grid grid-cols-2 gap-2"
              >
                <Label
                  htmlFor="r-cand"
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm font-medium ${
                    form.role === "candidate" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <RadioGroupItem id="r-cand" value="candidate" />
                  Candidato
                </Label>
                <Label
                  htmlFor="r-adm"
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm font-medium ${
                    form.role === "admin" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <RadioGroupItem id="r-adm" value="admin" />
                  Administrador
                </Label>
              </RadioGroup>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña (mín. 6)</Label>
              <Input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <Button type="submit" className="w-full">Crear cuenta</Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta? <Link to="/login" className="font-semibold text-primary hover:underline">Inicia sesión</Link>
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Register;
