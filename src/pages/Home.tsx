import { BookOpen, Calendar, ClipboardList, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-3xl p-8 flex justify-between items-center shadow-lg">
        <div>
          <p className="text-sm opacity-80">Bem-vinda de volta 👋</p>
          <h1 className="text-3xl font-bold mt-1">
            Ellen, continue sua jornada no AVA
          </h1>
          <p className="text-sm mt-2 opacity-90">
            Acompanhe suas aulas, atividades e progresso em um só lugar.
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur rounded-2xl px-6 py-4 text-center">
          <p className="text-3xl font-bold">72%</p>
          <p className="text-xs opacity-80">progresso geral</p>
        </div>
      </section>

      {/* CARDS PRINCIPAIS */}
      <section className="grid grid-cols-4 gap-4">
        <Card
          icon={<BookOpen size={20} />}
          title="Cursos"
          value="1 ativo"
          description="ADS em andamento"
        />

        <Card
          icon={<Calendar size={20} />}
          title="Próxima aula"
          value="Hoje"
          description="Banco de Dados · 10:00"
        />

        <Card
          icon={<ClipboardList size={20} />}
          title="Atividades"
          value="2 pendentes"
          description="1 enviada recentemente"
        />

        <Card
          icon={<MessageSquare size={20} />}
          title="Mensagens"
          value="2 recentes"
          description="Professores e lembretes"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="grid grid-cols-2 gap-6">

        {/* PRÓXIMAS AULAS */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                Próximas aulas
              </h2>
              <p className="text-sm text-slate-500">
                Acompanhe seus próximos encontros
              </p>
            </div>

            <button className="text-blue-700 text-sm font-semibold hover:underline">
              Ver calendário →
            </button>
          </div>

          <div className="space-y-3">
            <AulaItem
              materia="Banco de Dados"
              data="28/04/2026 · 10:00 - 11:40"
            />
            <AulaItem
              materia="Redes de Computadores"
              data="29/04/2026 · 14:00 - 15:40"
            />
            <AulaItem
              materia="Desenvolvimento Web"
              data="30/04/2026 · 08:00 - 09:40"
            />
          </div>
        </div>

        {/* PROGRESSO */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700">
          <h2 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">
            Progresso do curso
          </h2>

          <p className="text-sm text-slate-500">ADS</p>

          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Conclusão geral</span>
              <span>72%</span>
            </div>

            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-[72%]" />
            </div>
          </div>

          <button className="mt-6 w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition">
            Continuar curso
          </button>
        </div>
      </section>
    </div>
  );
}

/* COMPONENTES */

function Card({
  icon,
  title,
  value,
  description,
}: any) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_4px_20px_rgba(15,23,42,0.06)] border border-slate-100 dark:border-slate-700 flex items-center gap-4 hover:scale-[1.02] transition">
      
      <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500">{title}</p>
        <p className="font-bold text-lg text-slate-900 dark:text-white">
          {value}
        </p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function AulaItem({ materia, data }: any) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/60 rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">
          {materia}
        </p>
        <p className="text-xs text-slate-500">{data}</p>
      </div>

      <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition">
        Entrar
      </button>
    </div>
  );
}