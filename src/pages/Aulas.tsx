import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Video, Star } from "lucide-react";

const aulas = [
  {
    materia: "Estrutura de Dados",
    professor: "Prof. Doglas André Finco",
    data: "2026-04-27",
    hora: "08:00 - 09:40",
    tipo: "Presencial",
    local: "Sala F07",
    status: "Agendada",
  },
  {
    materia: "Banco de Dados",
    professor: "Prof. Ana Lima",
    data: "2026-04-28",
    hora: "10:00 - 11:40",
    tipo: "Online",
    local: "Google Meet",
    meetUrl: "https://meet.google.com/sql-pratica",
    status: "Agendada",
  },
  {
    materia: "Engenharia de Software",
    professor: "Prof. Roberto Dias",
    data: "2026-04-26",
    hora: "08:00 - 09:40",
    tipo: "Presencial",
    local: "Sala F07",
    status: "Em andamento",
  },
  {
    materia: "Redes de Computadores",
    professor: "Prof. Fernanda Costa",
    data: "2026-04-29",
    hora: "14:00 - 15:40",
    tipo: "Online",
    local: "Google Meet",
    meetUrl: "https://meet.google.com/redes-computadores",
    status: "Agendada",
  },
  {
    materia: "Estrutura de Dados",
    professor: "Prof. Doglas André Finco",
    data: "2026-04-24",
    hora: "08:00 - 09:40",
    tipo: "Presencial",
    local: "Sala F07",
    status: "Concluída",
  },
];

type Filtro = "Todas" | "Presencial" | "Online";

function formatarData(data: string) {
  return new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR");
}

function hojeISO() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

export default function Aulas() {
  const [filtro, setFiltro] = useState<Filtro>("Todas");

  const aulasOrdenadas = useMemo(() => {
    return [...aulas].sort((a, b) => {
      const dataA = new Date(`${a.data}T${a.hora.split(" - ")[0]}`);
      const dataB = new Date(`${b.data}T${b.hora.split(" - ")[0]}`);
      return dataA.getTime() - dataB.getTime();
    });
  }, []);

  const hoje = hojeISO();

  const proximaAula = aulasOrdenadas.find(
    (aula) => aula.data >= hoje && aula.status !== "Concluída"
  );

  const aulasFiltradas = aulasOrdenadas.filter((aula) => {
    if (filtro === "Presencial") return aula.tipo === "Presencial";
    if (filtro === "Online") return aula.tipo === "Online";
    return true;
  });

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <header className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
          <CalendarDays size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Aulas</h1>
          <p className="text-sm text-slate-500">
            Acompanhe suas aulas presenciais e online
          </p>
        </div>
      </header>

      {proximaAula && (
        <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Star size={16} />
              Próxima aula
            </div>

            <h2 className="text-2xl font-bold mt-2">{proximaAula.materia}</h2>

            <p className="text-sm opacity-90 mt-1">
              {proximaAula.professor} · {formatarData(proximaAula.data)} ·{" "}
              {proximaAula.hora}
            </p>
          </div>

          {proximaAula.tipo === "Online" ? (
            <a
              href={proximaAula.meetUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-blue-700 px-5 py-3 rounded-xl text-sm font-bold hover:bg-blue-50 transition flex items-center gap-2"
            >
              <Video size={16} />
              Entrar no Meet
            </a>
          ) : (
            <div className="bg-white/20 px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
              <MapPin size={16} />
              {proximaAula.local}
            </div>
          )}
        </section>
      )}

      <div className="flex gap-3 flex-wrap">
        <Filter
          active={filtro === "Todas"}
          label={`Todas (${aulas.length})`}
          onClick={() => setFiltro("Todas")}
        />
        <Filter
          active={filtro === "Presencial"}
          label={`Presenciais (${aulas.filter((a) => a.tipo === "Presencial").length})`}
          onClick={() => setFiltro("Presencial")}
        />
        <Filter
          active={filtro === "Online"}
          label={`Online (${aulas.filter((a) => a.tipo === "Online").length})`}
          onClick={() => setFiltro("Online")}
        />
      </div>

      <section className="grid grid-cols-2 gap-5">
        {aulasFiltradas.map((aula) => (
          <AulaCard
            key={`${aula.materia}-${aula.data}-${aula.hora}`}
            {...aula}
            isToday={aula.data === hoje}
            isNext={proximaAula === aula}
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
          : "bg-white text-slate-600 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

function AulaCard({
  materia,
  professor,
  data,
  hora,
  tipo,
  local,
  status,
  meetUrl,
  isToday,
  isNext,
}: {
  materia: string;
  professor: string;
  data: string;
  hora: string;
  tipo: string;
  local: string;
  status: string;
  meetUrl?: string;
  isToday: boolean;
  isNext: boolean;
}) {
  const isOnline = tipo === "Online";

  const statusColor =
    status === "Em andamento"
      ? "bg-green-100 text-green-700"
      : status === "Concluída"
      ? "bg-slate-200 text-slate-600"
      : "bg-blue-100 text-blue-700";

  const tipoColor = isOnline
    ? "bg-blue-100 text-blue-700"
    : "bg-green-100 text-green-700";

  return (
    <article
      className={`bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:scale-[1.01] transition space-y-4 border ${
        isToday
          ? "border-blue-300 ring-2 ring-blue-100"
          : isNext
          ? "border-cyan-200"
          : "border-transparent"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-bold text-lg">{materia}</h2>

            {isToday && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-700 text-white font-semibold">
                Hoje
              </span>
            )}

            {isNext && !isToday && (
              <span className="text-xs px-2 py-1 rounded-full bg-cyan-100 text-cyan-700 font-semibold">
                Próxima
              </span>
            )}
          </div>

          <p className="text-sm text-blue-700 font-medium mt-1">{professor}</p>
        </div>

        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor}`}>
          {status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${tipoColor}`}>
          {tipo}
        </span>

        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold">
          {formatarData(data)}
        </span>

        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold">
          {hora}
        </span>
      </div>

      <div className="flex items-center justify-between pt-2">
        {isOnline ? (
          <a
            href={meetUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-blue-700 text-white hover:bg-blue-800 px-4 py-2 rounded-xl text-sm font-semibold transition"
          >
            <Video size={16} />
            Acessar Meet
          </a>
        ) : (
          <div className="flex items-center gap-2 text-slate-600 text-sm bg-slate-100 px-4 py-2 rounded-xl">
            <MapPin size={16} />
            {local}
          </div>
        )}
      </div>
    </article>
  );
}