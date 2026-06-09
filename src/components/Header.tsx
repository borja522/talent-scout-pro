import { Briefcase, LogOut, ShieldCheck, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-md">
            <Briefcase className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight">TalentVault</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:block">
              Enterprise Hiring
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 sm:flex">
                {user.role === "admin" ? (
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <UserIcon className="h-3.5 w-3.5 text-primary" />
                )}
                <span className="text-xs font-semibold">{user.name}</span>
                <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {user.role === "admin" ? "Admin" : "Candidato"}
                </span>
              </div>
              <Button size="sm" variant="outline" onClick={() => { logout(); navigate("/login"); }}>
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Salir
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" asChild>
                <Link to="/login">Iniciar sesión</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Registrarse</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
