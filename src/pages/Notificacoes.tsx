import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
} from "lucide-react";

const notificacoes = [
  {
    id: 1,
    tipo: "atividade",
    titulo: "Atividade próxima do prazo",
    descricao: "Trabalho Prático de Listas Encadeadas vence em breve.",
    horario: "Hoje · 08:30",
    lida: false,
  },
  {
    id: 2,
    tipo: "aula",
    titulo: "Aula online hoje",
    descricao: "Banco de Dados inicia às 10:00 pelo Google Meet.",
    horario: "Hoje · 09:15",
    lida: false,
  },
  {
    id: 3,
    tipo: "mensagem",
    titulo: "Nova mensagem do professor",
    descricao: "Prof. Doglas respondeu sua dúvida sobre listas encadeadas.",
    horario: "Ontem · 14:25",
    lida: true,
  },
  {
    id: 4,
    tipo: "sistema",
    titulo: "Bem-vinda ao AVA",
    descricao: "Seu ambiente acadêmico está pronto para uso.",
    horario: "Segunda · 08:00",
    lida: true,
  },
];

export default function Notificacoes() {
  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      <header className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
          <Bell size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Notificações
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {naoLidas} {naoLidas === 1 ? "não lida" : "não lidas"} · acompanhe
            lembretes, mensagens e avisos importantes
          </p>
        </div>
      </header>

      <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 overflow-hidden">
        {notificacoes.map((notificacao) => (
          <NotificationItem key={notificacao.id} {...notificacao} />
        ))}
      </section>
    </div>
  );
}

function NotificationItem({
  tipo,
  titulo,
  descricao,
  horario,
  lida,
}: {
  tipo: string;
  titulo: string;
  descricao: string;
  horario: string;
  lida: boolean;
}) {
  const iconConfig = {
    atividade: {
      icon: <ClipboardList size={20} />,
      color:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    },
    aula: {
      icon: <CalendarDays size={20} />,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    },
    mensagem: {
      icon: <MessageCircle size={20} />,
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    },
    sistema: {
      icon: <CheckCircle2 size={20} />,
      color:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    },
  } as const;

  const config = iconConfig[tipo as keyof typeof iconConfig];

  return (
    <div
      className={`p-5 border-b border-slate-100 dark:border-slate-700 last:border-0 flex items-start gap-4 transition hover:bg-slate-50 dark:hover:bg-slate-700/60 ${
        !lida
          ? "bg-blue-50/50 dark:bg-blue-900/20"
          : "bg-white dark:bg-slate-800"
      }`}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${config.color}`}
      >
        {config.icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-slate-900 dark:text-white">{titulo}</h2>

          {!lida && <span className="w-2 h-2 rounded-full bg-blue-700" />}
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {descricao}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          {horario}
        </p>
      </div>
    </div>
  );
}