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

const proximasAulas = [
  {
    materia: "Banco de Dados",
    data: "28/04/2026",
    hora: "10:00 - 11:40",
    tipo: "Online",
    meetUrl: "https://meet.google.com/sql-pratica",
  },
  {
    materia: "Redes de Computadores",
    data: "29/04/2026",
    hora: "14:00 - 15:40",
    tipo: "Online",
    meetUrl: "https://meet.google.com/redes-computadores",
  },
  {
    materia: "Desenvolvimento Web",
    data: "30/04/2026",
    hora: "08:00 - 09:40",
    tipo: "Presencial",
    local: "Laboratório 1",
  },
];

const atividadesPendentes = [
  {
    titulo: "Trabalho Prático de Listas Encadeadas",
    disciplina: "Estrutura de Dados",
    prazo: "01/06/2026",
  },
  {
    titulo: "Projeto de Desenvolvimento Web Frontend",
    disciplina: "Desenvolvimento Web",
    prazo: "08/06/2026",
  },
  {
    titulo: "Atividade Prática - Falhas de Implantação",
    disciplina: "Implantação de Sistemas",
    prazo: "05/06/2026",
  },
  {
    titulo: "Exercícios de Banco de Dados SQL",
    disciplina: "Banco de Dados",
    prazo: "18/06/2026",
  }
];

const mensagensRecentes = [
  {
    nome: "Sistema AVA",
    texto: "Você possui uma atividade pendente para amanhã.",
  },
  {
    nome: "Prof. Doglas André Finco",
    texto: "Pode me enviar sua dúvida por aqui.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-500 text-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
        <div className="flex justify-between items-center gap-6">
          <div>
            <p className="text-sm opacity-90">Bem-vinda de volta 👋</p>
            <h1 className="text-3xl font-bold mt-1">
              Ellen, continue sua jornada no AVA
            </h1>
            <p className="text-sm opacity-90 mt-2">
              Acompanhe suas aulas, atividades, mensagens e progresso em um só lugar.
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
          color="blue"
          onClick={() => navigate("/cursos")}
        />

        <DashboardCard
          icon={<CalendarDays size={22} />}
          title="Próxima aula"
          value="Hoje"
          description="Banco de Dados · 10:00"
          color="green"
          onClick={() => navigate("/aulas")}
        />

        <DashboardCard
          icon={<ClipboardList size={22} />}
          title="Atividades"
          value="2 pendentes"
          description="1 enviada recentemente"
          color="yellow"
          onClick={() => navigate("/atividades")}
        />

        <DashboardCard
          icon={<MessageCircle size={22} />}
          title="Mensagens"
          value="2 recentes"
          description="Professores e lembretes"
          color="purple"
          onClick={() => navigate("/mensagens")}
        />
      </section>

      <section className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold">Próximas aulas</h2>
                <p className="text-sm text-slate-500">
                  Acompanhe os próximos encontros do curso
                </p>
              </div>

              <button
                onClick={() => navigate("/calendario")}
                className="text-blue-700 text-sm font-semibold flex items-center gap-1"
              >
                Ver calendário
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="space-y-3">
              {proximasAulas.map((aula) => (
                <div
                  key={`${aula.materia}-${aula.data}`}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 hover:bg-slate-100 transition"
                >
                  <div>
                    <p className="font-bold">{aula.materia}</p>
                    <p className="text-sm text-slate-500">
                      {aula.data} · {aula.hora}
                    </p>
                  </div>

                  {aula.tipo === "Online" ? (
                    <a
                      href={aula.meetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-800 transition"
                    >
                      <Video size={16} />
                      Entrar
                    </a>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
                      {aula.local}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold">Atividades pendentes</h2>
                <p className="text-sm text-slate-500">
                  Priorize entregas próximas do prazo
                </p>
              </div>

              <button
                onClick={() => navigate("/atividades")}
                className="text-blue-700 text-sm font-semibold flex items-center gap-1"
              >
                Ver atividades
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {atividadesPendentes.map((atividade) => (
                <div
                  key={atividade.titulo}
                  className="rounded-2xl border border-slate-100 p-4 hover:shadow-sm transition"
                >
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                    Pendente
                  </span>

                  <h3 className="font-bold mt-3">{atividade.titulo}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {atividade.disciplina}
                  </p>
                  <p className="text-xs text-slate-400 mt-3">
                    Prazo: {atividade.prazo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <TrendingUp size={20} />
              </div>

              <div>
                <h2 className="font-bold">Progresso do curso</h2>
                <p className="text-sm text-slate-500">ADS</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Conclusão geral</span>
                <span className="font-semibold">72%</span>
              </div>

              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-700 rounded-full w-[72%]" />
              </div>
            </div>

            <button
              onClick={() => navigate("/cursos/ads")}
              className="mt-5 w-full bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-800 transition"
            >
              Continuar curso
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Mensagens recentes</h2>

              <button
                onClick={() => navigate("/mensagens")}
                className="text-blue-700 text-sm font-semibold"
              >
                Ver
              </button>
            </div>

            <div className="space-y-3">
              {mensagensRecentes.map((mensagem) => (
                <div
                  key={mensagem.nome}
                  className="rounded-2xl bg-slate-50 p-4"
                >
                  <p className="font-semibold">{mensagem.nome}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {mensagem.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  value,
  description,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: "blue" | "green" | "yellow" | "purple";
  onClick: () => void;
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-left hover:scale-[1.02] transition"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
        {icon}
      </div>

      <p className="text-sm text-slate-500 mt-4">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{description}</p>
    </button>
  );
}