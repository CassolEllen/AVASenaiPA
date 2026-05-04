import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, ChevronRight, Clock } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useIdioma } from "../hooks/useIdioma";

const atividades = [
  {
    id: "atividade-1",
    professor: "Prof. Doglas André Finco",
    prazo: "01/06/2024 23:59",
    status: "Pendente",
  },
  {
    id: "atividade-2",
    professor: "Prof. Victor Cézar Bonatti Carvalho",
    prazo: "05/06/2024 23:59",
    status: "Pendente",
  },
  {
    id: "atividade-3",
    professor: "Prof. Maximiano",
    prazo: "20/03/2024",
    status: "Atrasado",
  },
];

const labels = {
  pt: {
    title: "Atividades",
    pendingSingular: "pendente",
    pendingPlural: "pendentes",
    filters: {
      all: "Todas",
      pending: "Pendente",
      sent: "Enviadas",
      late: "Atrasadas",
    },
    status: {
      Pendente: "Pendente",
      Enviado: "Enviado",
      Atrasado: "Atrasado",
    },
    deadline: "Prazo",
    atividades: {
      "atividade-1": {
        titulo: "Trabalho Prático de Listas Encadeadas",
        disciplina: "Estrutura de Dados",
      },
      "atividade-2": {
        titulo: "Desafio 3 - Big Data, Analytics e Inteligência Artificial",
        disciplina: "Big Data, Analytics e Inteligência Artificial",
      },
      "atividade-3": {
        titulo: "Atividade Prática - Falhas de Implantação",
        disciplina: "Implantação de Sistemas",
      },
    },
  },
  en: {
    title: "Activities",
    pendingSingular: "pending",
    pendingPlural: "pending",
    filters: {
      all: "All",
      pending: "Pending",
      sent: "Sent",
      late: "Late",
    },
    status: {
      Pendente: "Pending",
      Enviado: "Sent",
      Atrasado: "Late",
    },
    deadline: "Deadline",
    atividades: {
      "atividade-1": {
        titulo: "Practical Assignment - Linked Lists",
        disciplina: "Data Structures",
      },
      "atividade-2": {
        titulo: "Challenge 3 - Big Data, Analytics and Artificial Intelligence",
        disciplina: "Big Data, Analytics and Artificial Intelligence",
      },
      "atividade-3": {
        titulo: "Practical Activity - Deployment Failures",
        disciplina: "Systems Deployment",
      },
    },
  },
};

type Submission = {
  atividade_id: string;
};

type Filtro = "todas" | "pendente" | "enviado" | "atrasado";

export default function Atividades() {
  const { idioma } = useIdioma();
  const t = labels[idioma];

  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [submittedActivityIds, setSubmittedActivityIds] = useState<string[]>([]);

  async function fetchSubmissions() {
    const { data, error } = await supabase
      .from("submissions")
      .select("atividade_id");

    if (error) {
      console.error(error);
      return;
    }

    const ids = Array.from(
      new Set((data as Submission[]).map((item) => item.atividade_id))
    );

    setSubmittedActivityIds(ids);
  }

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const atividadesComStatus = atividades.map((atividade) => ({
    ...atividade,
    status: submittedActivityIds.includes(atividade.id)
      ? "Enviado"
      : atividade.status,
  }));

  const total = atividadesComStatus.length;
  const pendentes = atividadesComStatus.filter(
    (atividade) => atividade.status === "Pendente"
  ).length;
  const enviadas = atividadesComStatus.filter(
    (atividade) => atividade.status === "Enviado"
  ).length;
  const atrasadas = atividadesComStatus.filter(
    (atividade) => atividade.status === "Atrasado"
  ).length;

  const atividadesFiltradas = atividadesComStatus.filter((atividade) => {
    if (filtro === "pendente") return atividade.status === "Pendente";
    if (filtro === "enviado") return atividade.status === "Enviado";
    if (filtro === "atrasado") return atividade.status === "Atrasado";
    return true;
  });

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      <header className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
          <ClipboardList size={20} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t.title}
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {pendentes} {pendentes === 1 ? t.pendingSingular : t.pendingPlural}
          </p>
        </div>
      </header>

      <div className="flex gap-3 flex-wrap">
        <Filter
          active={filtro === "todas"}
          label={`${t.filters.all} (${total})`}
          onClick={() => setFiltro("todas")}
        />

        <Filter
          active={filtro === "pendente"}
          label={`${t.filters.pending} (${pendentes})`}
          onClick={() => setFiltro("pendente")}
        />

        <Filter
          active={filtro === "enviado"}
          label={`${t.filters.sent} (${enviadas})`}
          onClick={() => setFiltro("enviado")}
        />

        <Filter
          active={filtro === "atrasado"}
          label={`${t.filters.late} (${atrasadas})`}
          onClick={() => setFiltro("atrasado")}
        />
      </div>

      <section className="grid grid-cols-2 gap-5">
        {atividadesFiltradas.map((atividade) => (
          <AtividadeCard
            key={atividade.id}
            id={atividade.id}
            titulo={t.atividades[atividade.id as keyof typeof t.atividades].titulo}
            disciplina={
              t.atividades[atividade.id as keyof typeof t.atividades].disciplina
            }
            professor={atividade.professor}
            prazo={atividade.prazo}
            status={atividade.status}
            statusLabel={t.status[atividade.status as keyof typeof t.status]}
            deadlineLabel={t.deadline}
          />
        ))}
      </section>
    </div>
  );
}

function Filter({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
        active
          ? "bg-blue-700 text-white shadow-sm"
          : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

function AtividadeCard({
  id,
  titulo,
  disciplina,
  professor,
  prazo,
  status,
  statusLabel,
  deadlineLabel,
}: {
  id: string;
  titulo: string;
  disciplina: string;
  professor: string;
  prazo: string;
  status: string;
  statusLabel: string;
  deadlineLabel: string;
}) {
  const navigate = useNavigate();

  const statusStyle =
    status === "Enviado"
      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
      : status === "Atrasado"
      ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";

  return (
    <article
      onClick={() => navigate(`/atividades/${id}`)}
      className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 flex justify-between gap-4 hover:scale-[1.01] transition cursor-pointer"
    >
      <div className="space-y-3">
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${statusStyle}`}
        >
          {statusLabel}
        </span>

        <div>
          <h2 className="font-bold text-lg text-slate-900 dark:text-white">
            {titulo}
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {disciplina} · {professor}
          </p>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Clock size={15} />
          {deadlineLabel}: {prazo}
        </p>
      </div>

      <ChevronRight
        className="text-slate-400 dark:text-slate-500 shrink-0"
        size={22}
      />
    </article>
  );
}