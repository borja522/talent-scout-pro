import { Briefcase, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  credits: number;
  purchasedCount: number;
}

export const Header = ({ credits, purchasedCount }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-md">
            <Briefcase className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight">TalentVault</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:block">
              Enterprise Hiring
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a className="text-sm font-medium text-foreground transition-colors hover:text-primary" href="#">Buscar talento</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">Mis candidatos</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">Verificaciones</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="#">Empresa</a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 sm:flex">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold tabular-nums">{credits} créditos</span>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            <span className="text-xs font-semibold text-success tabular-nums">{purchasedCount} comprados</span>
          </div>
          <Button size="sm" variant="default">Comprar créditos</Button>
        </div>
      </div>
    </header>
  );
};
