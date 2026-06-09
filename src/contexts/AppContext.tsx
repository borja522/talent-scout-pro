import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { candidates as seedCandidates, type Candidate } from "@/data/candidates";

export type Role = "admin" | "candidate";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // demo only
  role: Role;
  candidateId?: string; // link to their CV
}

export interface JobSpec {
  title: string;
  requiredSkills: string[];
  minExperience: number;
  niceToHave: string[];
}

interface AppContextType {
  user: User | null;
  users: User[];
  candidates: Candidate[];
  job: JobSpec;
  login: (email: string, password: string) => User | null;
  register: (data: Omit<User, "id">) => User | null;
  logout: () => void;
  saveCandidate: (c: Candidate) => void;
  deleteCandidate: (id: string) => void;
  setJob: (j: JobSpec) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const LS_USERS = "tv_users";
const LS_SESSION = "tv_session";
const LS_CANDIDATES = "tv_candidates";
const LS_JOB = "tv_job";

const defaultJob: JobSpec = {
  title: "Senior Full-Stack Engineer",
  requiredSkills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  niceToHave: ["AWS", "Kubernetes"],
  minExperience: 4,
};

const defaultAdmin: User = {
  id: "admin-seed",
  name: "Administrador Demo",
  email: "admin@demo.com",
  password: "admin123",
  role: "admin",
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(() => load<User[]>(LS_USERS, [defaultAdmin]));
  const [user, setUser] = useState<User | null>(() => load<User | null>(LS_SESSION, null));
  const [candidates, setCandidates] = useState<Candidate[]>(() => load<Candidate[]>(LS_CANDIDATES, seedCandidates));
  const [job, setJobState] = useState<JobSpec>(() => load<JobSpec>(LS_JOB, defaultJob));

  useEffect(() => localStorage.setItem(LS_USERS, JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem(LS_SESSION, JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem(LS_CANDIDATES, JSON.stringify(candidates)), [candidates]);
  useEffect(() => localStorage.setItem(LS_JOB, JSON.stringify(job)), [job]);

  const login = (email: string, password: string) => {
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
    if (u) setUser(u);
    return u ?? null;
  };

  const register = (data: Omit<User, "id">) => {
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) return null;
    const newUser: User = { ...data, id: crypto.randomUUID() };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return newUser;
  };

  const logout = () => setUser(null);

  const saveCandidate = (c: Candidate) => {
    setCandidates((prev) => {
      const idx = prev.findIndex((x) => x.id === c.id);
      if (idx === -1) return [...prev, c];
      const next = [...prev];
      next[idx] = c;
      return next;
    });
    // link to user if candidate role and unassigned
    if (user && user.role === "candidate" && !user.candidateId) {
      const updated = { ...user, candidateId: c.id };
      setUser(updated);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
    }
  };

  const deleteCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  const setJob = (j: JobSpec) => setJobState(j);

  return (
    <AppContext.Provider
      value={{ user, users, candidates, job, login, register, logout, saveCandidate, deleteCandidate, setJob }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};

// ---------- Scoring + IA simulada ----------
export interface MatchResult {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  niceMatched: string[];
  experienceFit: number; // 0-100
  backgroundBonus: number;
  aiSummary: string;
  recommendation: "Altamente recomendado" | "Recomendado" | "Considerar" | "No recomendado";
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#./ ]/g, "").trim();

export function scoreCandidate(c: Candidate, job: JobSpec): MatchResult {
  const candSkills = c.hardSkills.map((s) => norm(s.name));
  const required = job.requiredSkills.map(norm).filter(Boolean);
  const nice = job.niceToHave.map(norm).filter(Boolean);

  const matched: string[] = [];
  const missing: string[] = [];
  required.forEach((r, i) => {
    const hit = candSkills.some((cs) => cs.includes(r) || r.includes(cs));
    if (hit) matched.push(job.requiredSkills[i]);
    else missing.push(job.requiredSkills[i]);
  });
  const niceMatched: string[] = [];
  nice.forEach((n, i) => {
    if (candSkills.some((cs) => cs.includes(n) || n.includes(cs))) niceMatched.push(job.niceToHave[i]);
  });

  const skillScore = required.length ? (matched.length / required.length) * 60 : 60;
  const niceScore = nice.length ? (niceMatched.length / nice.length) * 10 : 5;
  const expFit = Math.min(100, (c.yearsExperience / Math.max(1, job.minExperience)) * 100);
  const expScore = (expFit / 100) * 20;
  const bgBonus = ["verified", "clean"].includes(c.backgroundCheck) ? 10 : c.backgroundCheck === "pending" ? 5 : 0;
  const score = Math.round(skillScore + niceScore + expScore + bgBonus);

  let recommendation: MatchResult["recommendation"] = "No recomendado";
  if (score >= 85) recommendation = "Altamente recomendado";
  else if (score >= 70) recommendation = "Recomendado";
  else if (score >= 55) recommendation = "Considerar";

  // "IA" simulada: resumen construido a partir de los datos
  const topSkills = c.hardSkills
    .slice()
    .sort((a, b) => b.level - a.level)
    .slice(0, 3)
    .map((s) => s.name)
    .join(", ");
  const lastRole = c.experience[0];
  const bgText =
    c.backgroundCheck === "verified" || c.backgroundCheck === "clean"
      ? "Antecedentes verificados sin observaciones."
      : c.backgroundCheck === "pending"
      ? "Verificación de antecedentes en proceso."
      : "Verificación con observaciones que deben revisarse.";

  const aiSummary =
    `Perfil con ${c.yearsExperience} años de experiencia, destacando en ${topSkills}. ` +
    (lastRole ? `Rol más reciente: ${lastRole.role} en ${lastRole.company}. ` : "") +
    (matched.length
      ? `Cubre ${matched.length}/${required.length} skills requeridas (${matched.join(", ")}). `
      : "No cubre las skills requeridas para esta vacante. ") +
    (missing.length ? `Brechas: ${missing.join(", ")}. ` : "Sin brechas técnicas detectadas. ") +
    bgText +
    ` Recomendación: ${recommendation.toLowerCase()}.`;

  return {
    score,
    matchedSkills: matched,
    missingSkills: missing,
    niceMatched,
    experienceFit: Math.round(expFit),
    backgroundBonus: bgBonus,
    aiSummary,
    recommendation,
  };
}
