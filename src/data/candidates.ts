export type BackgroundCheckStatus = "verified" | "clean" | "pending" | "issues";

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  yearsExperience: number;
  matchScore: number;
  price: number;
  avatar: string;
  initials: string;
  bio: string;
  email: string;
  phone: string;
  hardSkills: { name: string; level: number }[];
  softSkills: string[];
  experience: Experience[];
  education: { school: string; degree: string; year: string }[];
  languages: { name: string; level: string }[];
  backgroundCheck: BackgroundCheckStatus;
  backgroundDetails: string;
  available: boolean;
  purchased?: boolean;
}

export const candidates: Candidate[] = [
  {
    id: "1",
    name: "María González Restrepo",
    title: "Senior Full-Stack Engineer",
    location: "Bogotá, Colombia",
    yearsExperience: 8,
    matchScore: 96,
    price: 12,
    avatar: "",
    initials: "MG",
    bio: "Ingeniera de software con 8 años construyendo plataformas SaaS escalables. Liderazgo técnico de equipos remotos en LATAM y EE.UU.",
    email: "maria.gonzalez@email.com",
    phone: "+57 300 123 4567",
    hardSkills: [
      { name: "TypeScript", level: 95 },
      { name: "React / Next.js", level: 92 },
      { name: "Node.js", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "AWS", level: 80 },
    ],
    softSkills: ["Liderazgo", "Comunicación", "Pensamiento crítico", "Mentoría", "Negociación"],
    experience: [
      { company: "Rappi", role: "Tech Lead", period: "2022 — Presente", description: "Lidera equipo de 6 ingenieros en plataforma de pagos." },
      { company: "Platzi", role: "Senior Engineer", period: "2019 — 2022", description: "Arquitectura del sistema de cursos en vivo." },
      { company: "Globant", role: "Software Engineer", period: "2016 — 2019", description: "Desarrollo de microservicios para clientes Fortune 500." },
    ],
    education: [{ school: "Universidad de los Andes", degree: "Ing. de Sistemas", year: "2016" }],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "C1" },
    ],
    backgroundCheck: "verified",
    backgroundDetails: "Sin antecedentes penales. Verificado por Truora el 12/03/2025. Identidad y referencias laborales confirmadas.",
    available: true,
  },
  {
    id: "2",
    name: "Carlos Mendoza Vargas",
    title: "Product Designer Senior",
    location: "Ciudad de México",
    yearsExperience: 6,
    matchScore: 91,
    price: 10,
    avatar: "",
    initials: "CM",
    bio: "Diseñador de producto enfocado en sistemas de diseño y research cuantitativo. Experiencia en fintech y e-commerce.",
    email: "carlos.mendoza@email.com",
    phone: "+52 55 9876 5432",
    hardSkills: [
      { name: "Figma", level: 98 },
      { name: "Design Systems", level: 92 },
      { name: "User Research", level: 85 },
      { name: "Prototyping", level: 90 },
      { name: "HTML / CSS", level: 75 },
    ],
    softSkills: ["Empatía", "Storytelling", "Colaboración", "Creatividad"],
    experience: [
      { company: "Kavak", role: "Senior Product Designer", period: "2021 — Presente", description: "Rediseño completo del flujo de compra de autos." },
      { company: "Clip", role: "Product Designer", period: "2018 — 2021", description: "Diseño del dashboard para comerciantes." },
    ],
    education: [{ school: "ITESM Monterrey", degree: "Diseño Industrial", year: "2018" }],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "B2" },
    ],
    backgroundCheck: "clean",
    backgroundDetails: "Verificación limpia. Sin reportes en bases de datos públicas de México.",
    available: true,
  },
  {
    id: "3",
    name: "Ana Lucía Ferreira",
    title: "Data Scientist",
    location: "São Paulo, Brasil",
    yearsExperience: 5,
    matchScore: 89,
    price: 11,
    avatar: "",
    initials: "AF",
    bio: "Especialista en ML aplicado a riesgo crediticio y detección de fraude. Publicaciones en NeurIPS y KDD.",
    email: "ana.ferreira@email.com",
    phone: "+55 11 5555 1234",
    hardSkills: [
      { name: "Python", level: 96 },
      { name: "PyTorch", level: 88 },
      { name: "SQL", level: 90 },
      { name: "Spark", level: 78 },
      { name: "MLOps", level: 80 },
    ],
    softSkills: ["Análisis crítico", "Curiosidad", "Comunicación técnica"],
    experience: [
      { company: "Nubank", role: "Data Scientist II", period: "2022 — Presente", description: "Modelos de scoring crediticio para 70M+ clientes." },
      { company: "iFood", role: "Data Scientist", period: "2020 — 2022", description: "Sistemas de recomendación de restaurantes." },
    ],
    education: [{ school: "USP", degree: "M.Sc. Computer Science", year: "2020" }],
    languages: [
      { name: "Portugués", level: "Nativo" },
      { name: "Inglés", level: "C1" },
      { name: "Español", level: "B1" },
    ],
    backgroundCheck: "verified",
    backgroundDetails: "Verificación completa con Serasa Experian. Antecedentes limpios y referencias confirmadas.",
    available: true,
  },
  {
    id: "4",
    name: "Diego Ramírez Castro",
    title: "DevOps / SRE Engineer",
    location: "Lima, Perú",
    yearsExperience: 7,
    matchScore: 87,
    price: 10,
    avatar: "",
    initials: "DR",
    bio: "SRE con foco en confiabilidad de sistemas distribuidos. Experto en Kubernetes y observabilidad.",
    email: "diego.ramirez@email.com",
    phone: "+51 999 888 777",
    hardSkills: [
      { name: "Kubernetes", level: 94 },
      { name: "Terraform", level: 90 },
      { name: "AWS / GCP", level: 88 },
      { name: "Prometheus", level: 85 },
      { name: "Go", level: 75 },
    ],
    softSkills: ["Resolución de problemas", "Trabajo bajo presión", "Documentación"],
    experience: [
      { company: "Yape", role: "Senior SRE", period: "2021 — Presente", description: "Mantiene SLO 99.99% para app con 12M usuarios." },
      { company: "Belcorp", role: "DevOps Engineer", period: "2017 — 2021", description: "Migración a la nube de sistemas legacy." },
    ],
    education: [{ school: "PUCP", degree: "Ing. Informática", year: "2017" }],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "B2" },
    ],
    backgroundCheck: "pending",
    backgroundDetails: "Verificación en proceso. Resultados estimados en 24-48h.",
    available: true,
  },
  {
    id: "5",
    name: "Sofía Patricia Rojas",
    title: "Marketing Manager",
    location: "Santiago, Chile",
    yearsExperience: 9,
    matchScore: 84,
    price: 9,
    avatar: "",
    initials: "SR",
    bio: "Estratega de marketing digital con foco en growth y performance. Lideró campañas con presupuestos > $2M USD.",
    email: "sofia.rojas@email.com",
    phone: "+56 9 8765 4321",
    hardSkills: [
      { name: "Google Ads", level: 95 },
      { name: "Meta Ads", level: 92 },
      { name: "Analytics 4", level: 88 },
      { name: "SEO", level: 80 },
      { name: "HubSpot", level: 85 },
    ],
    softSkills: ["Liderazgo", "Pensamiento estratégico", "Negociación", "Creatividad"],
    experience: [
      { company: "Cornershop", role: "Marketing Manager", period: "2020 — Presente", description: "Estrategia de adquisición en 3 países." },
      { company: "Falabella", role: "Digital Marketing Lead", period: "2016 — 2020", description: "Performance marketing e-commerce." },
    ],
    education: [{ school: "Universidad Católica de Chile", degree: "Ing. Comercial", year: "2014" }],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "C1" },
    ],
    backgroundCheck: "clean",
    backgroundDetails: "Antecedentes limpios verificados con registro civil de Chile.",
    available: false,
  },
  {
    id: "6",
    name: "Javier Andrés Soto",
    title: "Backend Engineer (Java)",
    location: "Buenos Aires, Argentina",
    yearsExperience: 4,
    matchScore: 82,
    price: 8,
    avatar: "",
    initials: "JS",
    bio: "Backend engineer especializado en sistemas transaccionales de alto volumen para banca digital.",
    email: "javier.soto@email.com",
    phone: "+54 11 4444 5555",
    hardSkills: [
      { name: "Java / Spring", level: 92 },
      { name: "Kafka", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "Microservicios", level: 88 },
    ],
    softSkills: ["Atención al detalle", "Trabajo en equipo", "Aprendizaje continuo"],
    experience: [
      { company: "Mercado Libre", role: "Software Engineer", period: "2021 — Presente", description: "Equipo de Mercado Pago — procesamiento de pagos." },
      { company: "Globant", role: "Jr Engineer", period: "2020 — 2021", description: "Desarrollo backend para clientes bancarios." },
    ],
    education: [{ school: "UBA", degree: "Lic. en Sistemas", year: "2020" }],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "B2" },
    ],
    backgroundCheck: "issues",
    backgroundDetails: "Reporte menor: deuda financiera reportada en Veraz (resuelta en 2023). Sin antecedentes penales.",
    available: true,
  },
];
