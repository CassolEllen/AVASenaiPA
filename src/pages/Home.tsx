import { BookOpen, ClipboardList, Clock, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#06b6d4] text-white p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Bom dia, Ellen 👋 · Nível 4</p>
            <h1 className="text-3xl font-bold mt-1">Ellen – Destaque 🏅</h1>

            <div className="mt-5 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[78%] bg-white rounded-full" />
            </div>

            <p className="mt-2 text-sm opacity-90">260 XP para o próximo nível</p>
          </div>

          <div className="text-right">
            <p className="text-4xl font-bold">1240</p>
            <p className="text-sm">XP</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-4">
        <InfoCard icon={<BookOpen size={22} />} value="2" label="Cursos Ativos" />
        <InfoCard icon={<ClipboardList size={22} />} value="3" label="Atividades Pendentes" />
        <InfoCard icon={<TrendingUp size={22} />} value="8.4" label="Média Geral" />
        <InfoCard icon={<Clock size={22} />} value="Seg 08h" label="Próxima Aula" />
      </section>

      <section className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Próximas Aulas</h2>
              <button className="text-blue-700 font-semibold text-sm">Ver todas</button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <ClassCard title="Estrutura de Dados" time="Segunda · 08:00 - 09:40" type="Presencial" />
              <ClassCard title="Banco de Dados" time="Segunda · 10:00 - 11:40" type="Online" />
              <ClassCard title="Engenharia de Software" time="Terça · 08:00 - 09:40" type="Presencial" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Continue de onde parou</h2>

            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-blue-700 flex items-center justify-center font-bold">
                  78%
                </div>

                <div>
                  <h3 className="font-bold">Estrutura de Dados</h3>
                  <p className="text-sm text-slate-500">Prof. Carlos Souza</p>
                </div>
              </div>

              <button className="bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold">
                Continuar
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Avisos Recentes</h2>
              <button className="text-blue-700 font-semibold text-sm">Ver todos</button>
            </div>

            <div className="space-y-3">
              <NoticeCard initials="AL" name="Ana Lima" text="Olá turma! Informo que a prova 2 foi reagendada para..." />
              <NoticeCard initials="RD" name="Roberto Dias" text="A entrega do trabalho de Metodologias Ágeis foi prorrogada..." />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Calendário</h2>
              <button className="text-blue-700 font-semibold text-sm">Ver completo</button>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <p className="font-semibold">Próximos eventos</p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="border-l-4 border-red-400 pl-3">
                  <p className="font-semibold">Prova 2 – Banco de Dados</p>
                  <p className="text-slate-500">28/03 · 10:00</p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-3">
                  <p className="font-semibold">Entrega Eng. Software</p>
                  <p className="text-slate-500">29/03 · 23:59</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function InfoCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="text-blue-700 mb-2">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function ClassCard({
  title,
  time,
  type,
}: {
  title: string;
  time: string;
  type: string;
}) {
  const isOnline = type === "Online";

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{time}</p>

      <span
        className={`inline-block mt-3 text-xs px-3 py-1 rounded-full font-semibold ${
          isOnline ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
        }`}
      >
        {type}
      </span>
    </div>
  );
}

function NoticeCard({
  initials,
  name,
  text,
}: {
  initials: string;
  name: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-3 items-center">
      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
        {initials}
      </div>

      <div className="flex-1">
        <p className="font-bold">{name}</p>
        <p className="text-sm text-slate-500 truncate">{text}</p>
      </div>

      <span className="w-2 h-2 rounded-full bg-blue-700" />
    </div>
  );
}