import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  MessageCircle,
  Video,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in">
      <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-500 text-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
        <div className="flex justify-between items-center gap-6">
          <div>
            <p className="text-sm opacity-90">Bem-vinda de volta 👋</p>
            <h1 className="text-3xl font-bold mt-1">
              Ellen, continue sua jornada no AVA
            </h1>
            <p className="text-sm opacity-90 mt-2">
              Acompanhe suas aulas, atividades e progresso em um só lugar.
            </p>
          </div>

          <div className="bg-white/20 rounded-2xl p-5 text-center min-w-[160px]">
            <p className="text-4xl font-bold">72%</p>
            <p className="text-sm opacity-90">progresso geral</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-5">
        <DashboardCard
          icon={<BookOpen size={22} />}
          title="Cursos"
          value="1 ativo"
          description="ADS em andamento"
          onClick={() => navigate("/cursos")}
        />

        <DashboardCard
          icon={<CalendarDays size={22} />}
          title="Próxima aula"
          value="Hoje"
          description="Banco de Dados · 10:00"
          onClick={() => navigate("/aulas")}
        />

        <DashboardCard
          icon={<ClipboardList size={22} />}
          title="Atividades"
          value="2 pendentes"
          description="1 enviada recentemente"
          onClick={() => navigate("/atividades")}
        />

        <DashboardCard
          icon={<MessageCircle size={22} />}
          title="Mensagens"
          value="2 recentes"
          description="Professores e lembretes"
          onClick={() => navigate("/mensagens")}
        />
      </section>

      <section className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Próximas aulas
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Acompanhe seus próximos encontros
              </p>
            </div>

            <button
              onClick={() => navigate("/calendario")}
              className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Ver calendário
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="space-y-3">
            <AulaItem
              materia="Banco de Dados"
              data="28/04/2026 · 10:00 - 11:40"
              online
            />

            <AulaItem
              materia="Redes de Computadores"
              data="29/04/2026 · 14:00 - 15:40"
              online
            />

            <AulaItem
              materia="Desenvolvimento Web"
              data="30/04/2026 · 08:00 - 09:40"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Progresso do curso
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">ADS</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Conclusão geral</span>
              <span className="font-semibold">72%</span>
            </div>

            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-700 rounded-full w-[72%]" />
            </div>
          </div>

          <button
            onClick={() => navigate("/cursos/ads")}
            className="mt-5 w-full bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-800 active:scale-[0.98] transition"
          >
            Continuar curso
          </button>
        </div>
      </section>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  value,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 text-left hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center group-hover:scale-110 transition">
        {icon}
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
        {title}
      </p>

      <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">
        {value}
      </p>

      <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
        {description}
      </p>
    </button>
  );
}

function AulaItem({
  materia,
  data,
  online = false,
}: {
  materia: string;
  data: string;
  online?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-slate-700/60 p-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
      <div>
        <p className="font-bold text-slate-900 dark:text-white">{materia}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{data}</p>
      </div>

      <button
        onClick={() => navigate(online ? "/aulas" : "/calendario")}
        className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-800 active:scale-[0.98] transition"
      >
        {online && <Video size={16} />}
        {online ? "Entrar" : "Ver aula"}
      </button>
    </div>
  );
}