import {
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  GraduationCap,
  Lock,
  Mail,
  Settings,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";

type Conquista = {
  titulo: string;
  descricao: string;
  emoji: string;
  conquistada: boolean;
};

const conquistas: Conquista[] = [
  {
    titulo: "Primeira Entrega",
    descricao: "Você enviou sua primeira atividade no AVA.",
    emoji: "🎯",
    conquistada: true,
  },
  {
    titulo: "Sem Faltas",
    descricao: "Participou das aulas recentes sem faltas registradas.",
    emoji: "✅",
    conquistada: true,
  },
  {
    titulo: "Nota 10",
    descricao: "Alcançou nota máxima em uma atividade avaliativa.",
    emoji: "🏆",
    conquistada: true,
  },
  {
    titulo: "Maratonista",
    descricao: "Concluiu várias aulas em sequência.",
    emoji: "🏃‍♀️",
    conquistada: true,
  },
  {
    titulo: "Mentor",
    descricao: "Ajudou colegas ou interagiu com professores pelo AVA.",
    emoji: "🧑‍🏫",
    conquistada: false,
  },
  {
    titulo: "Explorador",
    descricao: "Acessou diferentes áreas do AVA pela primeira vez.",
    emoji: "👾",
    conquistada: false,
  },
  {
    titulo: "Entrega Antecipada",
    descricao: "Entregou uma atividade antes do prazo final.",
    emoji: "⚡",
    conquistada: false,
  },
  {
    titulo: "Em Chamas",
    descricao: "Manteve uma sequência de estudos por vários dias.",
    emoji: "🔥",
    conquistada: false,
  },
  {
    titulo: "Matéria Concluída",
    descricao: "Concluiu todas as aulas de uma matéria.",
    emoji: "🎓",
    conquistada: false,
  },
  {
    titulo: "Elite",
    descricao: "Desbloqueie todas as conquistas principais do curso.",
    emoji: "💎",
    conquistada: false,
  },
];

export default function Perfil() {
  const totalConquistas = conquistas.length;
  const desbloqueadas = conquistas.filter((c) => c.conquistada).length;
  const progresso = Math.round((desbloqueadas / totalConquistas) * 100);

  return (
    <div className="max-w-[1300px] mx-auto space-y-6">
      <div className="grid grid-cols-[360px_1fr] gap-6">
        <aside className="bg-white/95 dark:bg-slate-800 rounded-3xl p-8 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 h-fit text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
            EC
          </div>

          <h1 className="text-2xl font-bold mt-5 text-slate-900 dark:text-white">
            Ellen Cristina Cassol
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Matrícula: 2021SI0043
          </p>

          <span className="inline-flex mt-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            ADS · 4º Semestre
          </span>

          <div className="mt-6 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <Mail size={16} />
              ellen@email.com
            </div>

            <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-400 font-semibold">
              <Settings size={16} />
              Configurações
            </div>
          </div>
        </aside>

        <main className="space-y-5">
          <section className="grid grid-cols-3 gap-4">
            <StatCard
              icon={<BookOpen size={20} />}
              label="Aulas concluídas"
              value="12"
              description="de 30 aulas"
            />

            <StatCard
              icon={<Trophy size={20} />}
              label="Atividades enviadas"
              value="8"
              description="2 pendentes"
            />

            <StatCard
              icon={<Flame size={20} />}
              label="Sequência atual"
              value="3 dias"
              description="continue assim"
            />
          </section>

          <section className="bg-white/95 dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Award size={20} className="text-blue-700 dark:text-blue-400" />
              <h2 className="font-bold text-xl text-slate-900 dark:text-white">
                Conquistas
              </h2>
            </div>

            <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-4 mb-5">
              <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                <span>
                  {desbloqueadas} de {totalConquistas} conquistas desbloqueadas
                </span>
                <span>{progresso}%</span>
              </div>

              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-700 to-cyan-500 rounded-full"
                  style={{ width: `${progresso}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {conquistas.map((conquista) => (
                <AchievementCard key={conquista.titulo} {...conquista} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-white/95 dark:bg-slate-800 rounded-2xl p-5 shadow-[0_4px_20px_rgba(15,23,42,0.06)] border border-slate-100 dark:border-slate-700 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="font-bold text-xl text-slate-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function AchievementCard({
  titulo,
  descricao,
  emoji,
  conquistada,
}: Conquista) {
  return (
    <div className="relative group">
      <div
        className={`min-h-[115px] rounded-2xl p-4 flex flex-col items-center justify-center text-center border transition hover:-translate-y-1 hover:shadow-md ${
          conquistada
            ? "bg-slate-50 dark:bg-slate-700/70 border-slate-100 dark:border-slate-600"
            : "bg-slate-100 dark:bg-slate-900 border-transparent opacity-70"
        }`}
      >
        <div
          className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
            conquistada
              ? "bg-blue-100 dark:bg-blue-900/40"
              : "bg-white/70 dark:bg-slate-800 grayscale"
          }`}
        >
          {emoji}

          {!conquistada && (
            <span className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
              <Lock size={13} />
            </span>
          )}

          {conquistada && (
            <span className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
              <CheckCircle2 size={14} />
            </span>
          )}
        </div>

        <p
          className={`text-sm font-semibold mt-3 ${
            conquistada
              ? "text-slate-900 dark:text-white"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {titulo}
        </p>
      </div>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition z-20">
        <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl">
          <p className="font-bold mb-1">{titulo}</p>
          <p className="text-slate-300">{descricao}</p>
          <p className="mt-2 text-[10px] text-slate-400">
            {conquistada ? "Conquista desbloqueada" : "Conquista bloqueada"}
          </p>
        </div>
      </div>
    </div>
  );
}