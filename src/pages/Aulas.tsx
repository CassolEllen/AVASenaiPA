export default function Aulas() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      
      {/* HEADER */}
      <h1 className="text-2xl font-bold">Aulas</h1>

      {/* FILTROS */}
      <div className="flex gap-3">
        <Filter active label="Todas" />
        <Filter label="Presencial" />
        <Filter label="Online" />
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* HEADER DA TABELA */}
        <div className="grid grid-cols-6 px-6 py-4 text-sm font-semibold text-gray-500 border-b">
          <span>Matéria</span>
          <span>Professor</span>
          <span>Dia/Hora</span>
          <span>Tipo</span>
          <span>Local</span>
          <span>Status</span>
        </div>

        {/* LINHAS */}
        <AulaRow
          materia="Estrutura de Dados"
          professor="Prof. Carlos Souza"
          horario="Segunda · 08:00 - 09:40"
          tipo="Presencial"
          local="Sala 204 – Bloco B"
          status="Agendada"
        />

        <AulaRow
          materia="Banco de Dados"
          professor="Prof. Ana Lima"
          horario="Segunda · 10:00 - 11:40"
          tipo="Online"
          local="Google Meet"
          status="Agendada"
        />

        <AulaRow
          materia="Engenharia de Software"
          professor="Prof. Roberto Dias"
          horario="Terça · 08:00 - 09:40"
          tipo="Presencial"
          local="Sala 105 – Bloco A"
          status="Em andamento"
        />

        <AulaRow
          materia="Redes de Computadores"
          professor="Prof. Fernanda Costa"
          horario="Quarta · 14:00 - 15:40"
          tipo="Online"
          local="Google Meet"
          status="Agendada"
        />

        <AulaRow
          materia="Estrutura de Dados"
          professor="Prof. Carlos Souza"
          horario="Quinta · 08:00 - 09:40"
          tipo="Presencial"
          local="Sala 204 – Bloco B"
          status="Concluída"
        />
      </div>
    </div>
  );
}

function Filter({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition
        ${
          active
            ? "bg-blue-600 text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-600"
        }
      `}
    >
      {label}
    </button>
  );
}

function AulaRow({
  materia,
  professor,
  horario,
  tipo,
  local,
  status,
}: any) {
  const isOnline = tipo === "Online";

  const statusColor =
    status === "Em andamento"
      ? "bg-green-100 text-green-700"
      : status === "Concluída"
      ? "bg-gray-200 text-gray-600"
      : "bg-blue-100 text-blue-700";

  return (
    <div className="grid grid-cols-6 px-6 py-4 items-center border-b last:border-0 hover:bg-gray-50 transition">
      <span className="font-semibold">{materia}</span>
      <span className="text-blue-700 cursor-pointer">{professor}</span>
      <span className="text-sm text-gray-500">{horario}</span>

      <span
        className={`text-xs px-3 py-1 rounded-full font-semibold w-fit
          ${isOnline ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}
        `}
      >
        {tipo}
      </span>

      <span className="text-sm text-gray-500">{local}</span>

      <span
        className={`text-xs px-3 py-1 rounded-full font-semibold w-fit ${statusColor}`}
      >
        {status}
      </span>
    </div>
  );
}