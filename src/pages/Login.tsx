import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
import { Briefcase } from "lucide-react";

const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = login(email, password);
    if (!u) {
      toast.error("Credenciales inválidas");
      return;
    }
    toast.success(`Bienvenido, ${u.name}`);
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
            <h1 className="mt-3 text-2xl font-bold tracking-tight">Iniciar sesión</h1>
            <p className="mt-1 text-sm text-muted-foreground">Accede a tu cuenta de TalentVault</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿No tienes cuenta? <Link to="/register" className="font-semibold text-primary hover:underline">Regístrate</Link>
          </p>

          <div className="mt-6 rounded-lg border border-dashed border-border bg-secondary/40 p-3 text-xs">
            <p className="font-semibold">Cuenta admin demo:</p>
            <p className="text-muted-foreground">admin@demo.com · admin123</p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Login;
