import { ChevronLeft, ChevronRight, MapPin, Video, X } from "lucide-react";
import { useMemo, useState } from "react";

type Aula = {
  materia: string;
  data: string;
  hora: string;
  tipo: "Online" | "Presencial";
  local?: string;
  meetUrl?: string;
};

const aulas: Aula[] = [
  { materia: "Estrutura de Dados", data: "2026-04-06", hora: "08:00", tipo: "Presencial", local: "Sala F07" },
  { materia: "Banco de Dados", data: "2026-04-06", hora: "10:00", tipo: "Online", meetUrl: "https://meet.google.com/sql-pratica" },
  { materia: "Engenharia de Software", data: "2026-04-07", hora: "08:00", tipo: "Presencial", local: "Sala F07" },
  { materia: "Redes de Computadores", data: "2026-04-08", hora: "14:00", tipo: "Online", meetUrl: "https://meet.google.com/redes-computadores" },
  { materia: "Interface e UX", data: "2026-04-09", hora: "19:00", tipo: "Online", meetUrl: "https://meet.google.com/ux-ui" },
  { materia: "Qualidade de Software", data: "2026-04-10", hora: "08:00", tipo: "Presencial", local: "Laboratório 2" },
  { materia: "Desenvolvimento Web", data: "2026-04-13", hora: "08:00", tipo: "Presencial", local: "Laboratório 1" },
  { materia: "APIs e Integrações", data: "2026-04-13", hora: "10:00", tipo: "Online", meetUrl: "https://meet.google.com/apis-integracoes" },
  { materia: "Implantação de Sistemas", data: "2026-04-14", hora: "08:00", tipo: "Presencial", local: "Sala F07" },
  { materia: "Segurança da Informação", data: "2026-04-15", hora: "10:00", tipo: "Presencial", local: "Sala 205" },
  { materia: "Gestão de Projetos", data: "2026-04-16", hora: "19:00", tipo: "Online", meetUrl: "https://meet.google.com/gestao-projetos" },
  { materia: "Arquitetura de Software", data: "2026-04-17", hora: "08:00", tipo: "Presencial", local: "Sala 306" },
  { materia: "Big Data e IA", data: "2026-04-20", hora: "08:00", tipo: "Presencial", local: "Sala 304" },
  { materia: "Projeto Integrador", data: "2026-04-20", hora: "10:00", tipo: "Online", meetUrl: "https://meet.google.com/projeto-integrador" },
  { materia: "Empreendedorismo", data: "2026-04-21", hora: "19:00", tipo: "Online", meetUrl: "https://meet.google.com/empreendedorismo" },
  { materia: "Tópicos Avançados", data: "2026-04-22", hora: "08:00", tipo: "Presencial", local: "Laboratório 3" },
  { materia: "Banco de Dados", data: "2026-04-23", hora: "10:00", tipo: "Online", meetUrl: "https://meet.google.com/sql-pratica" },
  { materia: "Estrutura de Dados", data: "2026-04-24", hora: "08:00", tipo: "Presencial", local: "Sala F07" },
  { materia: "Estrutura de Dados", data: "2026-04-27", hora: "08:00", tipo: "Presencial", local: "Sala F07" },
  { materia: "Banco de Dados", data: "2026-04-27", hora: "10:00", tipo: "Online", meetUrl: "https://meet.google.com/sql-pratica" },
  { materia: "Engenharia de Software", data: "2026-04-28", hora: "08:00", tipo: "Presencial", local: "Sala F07" },
  { materia: "Redes de Computadores", data: "2026-04-29", hora: "14:00", tipo: "Online", meetUrl: "https://meet.google.com/redes-computadores" },
  { materia: "Qualidade de Software", data: "2026-04-29", hora: "19:00", tipo: "Online", meetUrl: "https://meet.google.com/qualidade-software" },
  { materia: "Desenvolvimento Web", data: "2026-04-30", hora: "08:00", tipo: "Presencial", local: "Laboratório 1" },
];

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function formatDateISO(date: Date) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function formatarData(data: string) {
  return new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR");
}

function hojeISO() {
  return formatDateISO(new Date());
}

function monthLabel(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
}

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [selectedAula, setSelectedAula] = useState<Aula | null>(null);
  const hoje = hojeISO();

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const startDate = new Date(year, month, 1 - startDay);

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      return date;
    });
  }, [currentDate]);

  function nextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  }

  function prevMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }

  function goToday() {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold capitalize">
            {monthLabel(currentDate)}
          </h1>
          <p className="text-sm text-slate-500">
            Visualize suas aulas em formato de agenda
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={goToday} className="px-4 py-2 rounded-xl bg-white text-slate-700 text-sm font-semibold shadow-sm hover:bg-slate-100 transition">
            Hoje
          </button>

          <button onClick={prevMonth} className="p-2 rounded-xl bg-white shadow-sm hover:bg-slate-100 transition">
            <ChevronLeft size={20} />
          </button>

          <button onClick={nextMonth} className="p-2 rounded-xl bg-white shadow-sm hover:bg-slate-100 transition">
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-400" />
          Presencial
        </span>

        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-400" />
          Online
        </span>

        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-700" />
          Hoje
        </span>
      </div>

      <section className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] overflow-hidden border border-slate-100">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-100">
          {diasSemana.map((dia) => (
            <div key={dia} className="p-4 text-center text-sm font-bold text-slate-500">
              {dia}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarDays.map((date: Date) => {
            const iso = formatDateISO(date);
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = iso === hoje;
            const aulasDoDia = aulas.filter((aula: Aula) => aula.data === iso);

            return (
              <div
                key={iso}
                className={`min-h-[140px] p-3 border-r border-b border-slate-100 transition ${
                  isCurrentMonth ? "bg-white" : "bg-slate-50/70"
                } ${isToday ? "bg-blue-50/40" : ""}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition ${
                      isToday
                        ? "bg-blue-700 text-white shadow-md"
                        : isCurrentMonth
                        ? "text-slate-700"
                        : "text-slate-300"
                    }`}
                  >
                    {date.getDate()}
                  </span>

                  {aulasDoDia.length > 0 && (
                    <span className="text-[10px] text-slate-400">
                      {aulasDoDia.length} aula{aulasDoDia.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {aulasDoDia.map((aula: Aula, index: number) => {
                    const isOnline = aula.tipo === "Online";

                    return (
                      <button
                        type="button"
                        key={`${aula.materia}-${index}`}
                        onClick={() => setSelectedAula(aula)}
                        className={`w-full text-left group rounded-xl p-2 text-xs border transition hover:scale-[1.02] hover:shadow-sm ${
                          isOnline
                            ? "bg-blue-50 text-blue-700 border-blue-100"
                            : "bg-green-50 text-green-700 border-green-100"
                        }`}
                      >
                        <p className="font-bold truncate">
                          {aula.hora} · {aula.materia}
                        </p>

                        <div className="mt-1 flex items-center justify-between gap-2">
                          {isOnline ? (
                            <span className="inline-flex items-center gap-1 font-semibold">
                              <Video size={13} />
                              Meet
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 truncate">
                              <MapPin size={13} />
                              {aula.local}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedAula && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-[420px] shadow-[0_20px_60px_rgba(15,23,42,0.25)] space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedAula.tipo === "Online"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {selectedAula.tipo}
                </span>

                <h2 className="text-xl font-bold mt-3">{selectedAula.materia}</h2>

                <p className="text-sm text-slate-500 mt-1">
                  {formatarData(selectedAula.data)} · {selectedAula.hora}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAula(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            {selectedAula.tipo === "Online" ? (
              <a
                href={selectedAula.meetUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
              >
                <Video size={18} />
                Entrar na aula
              </a>
            ) : (
              <div className="flex items-center gap-2 bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-semibold">
                <MapPin size={18} />
                {selectedAula.local}
              </div>
            )}

            <button
              type="button"
              onClick={() => setSelectedAula(null)}
              className="w-full text-sm text-slate-500 hover:text-slate-800 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}