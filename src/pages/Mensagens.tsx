import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  MessageCirclePlus,
  Search,
  Send,
  Trash2,
  UserRound,
} from "lucide-react";
import { useIdioma } from "../hooks/useIdioma";
import { textos } from "../i18n";

type Conversa = {
  id: number;
  nome: string;
  tipo: "automatico" | "professor";
  cargo: string;
  ultimaMensagem: string;
};

type Mensagem = {
  texto: string;
  enviada: boolean;
  hora: string;
};

const STORAGE_CONVERSAS = "ava_conversas";
const STORAGE_MENSAGENS = "ava_mensagens";

const conversasIniciais: Conversa[] = [
  {
    id: 1,
    nome: "Sistema AVA",
    tipo: "automatico",
    cargo: "Lembretes automáticos",
    ultimaMensagem: "Você possui uma atividade pendente para amanhã.",
  },
  {
    id: 2,
    nome: "Prof. Doglas André Finco",
    tipo: "professor",
    cargo: "Estrutura de Dados",
    ultimaMensagem: "Pode me enviar sua dúvida por aqui.",
  },
  {
    id: 3,
    nome: "Prof. Victor Cézar Bonatti Carvalho",
    tipo: "professor",
    cargo: "Big Data, Analytics e IA",
    ultimaMensagem: "A aula online será pelo link disponibilizado no AVA.",
  },
  {
    id: 4,
    nome: "Prof. Maximiano",
    tipo: "professor",
    cargo: "Implantação de Sistemas",
    ultimaMensagem: "Revise o material antes da próxima aula.",
  },
];

const professoresDisponiveis = [
  { id: 10, nome: "Prof. Ana Lima", cargo: "Banco de Dados" },
  { id: 11, nome: "Prof. Roberto Dias", cargo: "Engenharia de Software" },
  { id: 12, nome: "Prof. Fernanda Costa", cargo: "Redes de Computadores" },
  { id: 13, nome: "Prof. Mariana Lopes", cargo: "Interface e UX" },
];

const mensagensIniciais: Record<number, Mensagem[]> = {
  1: [
    {
      texto: "Lembrete: você possui uma atividade pendente com prazo para amanhã.",
      enviada: false,
      hora: "08:00",
    },
    {
      texto: "Sua próxima aula online começa às 10:00.",
      enviada: false,
      hora: "09:30",
    },
  ],
  2: [
    {
      texto: "Olá, professor! Tenho uma dúvida sobre listas encadeadas.",
      enviada: true,
      hora: "14:20",
    },
    {
      texto: "Pode me enviar sua dúvida por aqui que eu verifico.",
      enviada: false,
      hora: "14:25",
    },
  ],
  3: [
    {
      texto: "Professor, o trabalho de Big Data pode ser enviado em PDF?",
      enviada: true,
      hora: "10:15",
    },
    {
      texto: "Sim, pode enviar em PDF pelo AVA.",
      enviada: false,
      hora: "10:22",
    },
  ],
  4: [
    {
      texto: "Revise o material sobre falhas de implantação antes da próxima aula.",
      enviada: false,
      hora: "16:00",
    },
  ],
};


export default function Mensagens() {
  const { idioma } = useIdioma();
  const t = textos[idioma].mensagens;

  const [conversas, setConversas] = useState<Conversa[]>(() => {
    const data = localStorage.getItem(STORAGE_CONVERSAS);
    return data ? JSON.parse(data) : t.initialConversations;
  });
  const [chatAtivo, setChatAtivo] = useState<number | null>(1);
  const [mensagens, setMensagens] = useState<Record<number, Mensagem[]>>(() => {
    const data = localStorage.getItem(STORAGE_MENSAGENS);
    return data ? JSON.parse(data) : t.initialMessages;
  });
  const [novaMensagem, setNovaMensagem] = useState("");
  const [busca, setBusca] = useState("");
  const [mostrandoNovoChat, setMostrandoNovoChat] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const conversaAtiva = conversas.find((c) => c.id === chatAtivo);

  useEffect(() => {
    localStorage.setItem(STORAGE_CONVERSAS, JSON.stringify(conversas));
  }, [conversas]);

  useEffect(() => {
    localStorage.setItem(STORAGE_MENSAGENS, JSON.stringify(mensagens));
  }, [mensagens]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatAtivo, mensagens]);

  const conversasFiltradas = useMemo(() => {
    const termo = busca.toLowerCase();

    return conversas.filter(
      (conversa) =>
        conversa.nome.toLowerCase().includes(termo) ||
        conversa.cargo.toLowerCase().includes(termo)
    );
  }, [busca, conversas]);

  function enviarMensagem() {
    if (
      !novaMensagem.trim() ||
      !chatAtivo ||
      conversaAtiva?.tipo === "automatico"
    ) {
      return;
    }

    const textoMensagem = novaMensagem;

    const nova: Mensagem = {
      texto: textoMensagem,
      enviada: true,
      hora: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMensagens((prev) => ({
      ...prev,
      [chatAtivo]: [...(prev[chatAtivo] || []), nova],
    }));

    setConversas((prev) => {
      const conversaAtualizada = prev.find((c) => c.id === chatAtivo);
      const outrasConversas = prev.filter((c) => c.id !== chatAtivo);

      if (!conversaAtualizada) return prev;

      return [
        {
          ...conversaAtualizada,
          ultimaMensagem: textoMensagem,
        },
        ...outrasConversas,
      ];
    });

    setNovaMensagem("");
  }

  function excluirChat(id: number) {
    const conversa = conversas.find((c) => c.id === id);

    if (!conversa || conversa.tipo === "automatico") return;

    const confirmado = confirm(`${t.deleteChatConfirm} ${conversa.nome}?`);

    if (!confirmado) return;

    const novasConversas = conversas.filter((c) => c.id !== id);

    setConversas(novasConversas);

    setMensagens((prev) => {
      const copia = { ...prev };
      delete copia[id];
      return copia;
    });

    if (chatAtivo === id) {
      setChatAtivo(novasConversas[0]?.id || null);
    }
  }

  function iniciarNovoChat(professor: {
    id: number;
    nome: string;
    cargo: string;
  }) {
    const conversaExistente = conversas.find((c) => c.nome === professor.nome);

    if (conversaExistente) {
      setConversas((prev) => [
        conversaExistente,
        ...prev.filter((c) => c.id !== conversaExistente.id),
      ]);

      setChatAtivo(conversaExistente.id);
      setMostrandoNovoChat(false);
      return;
    }

    const novaConversa: Conversa = {
      id: professor.id,
      nome: professor.nome,
      tipo: "professor",
      cargo: professor.cargo,
      ultimaMensagem: "Conversa iniciada. Envie sua primeira mensagem.",
    };

    setConversas((prev) => [novaConversa, ...prev]);

    setMensagens((prev) => ({
      ...prev,
      [professor.id]: [],
    }));

    setChatAtivo(professor.id);
    setMostrandoNovoChat(false);
  }

  return (
    <div className="max-w-[1200px] mx-auto h-[80vh] bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] overflow-hidden flex border border-slate-100 dark:border-slate-700">
      <aside className="w-[340px] border-r border-slate-100 dark:border-slate-700 flex flex-col">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.title}
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.subtitle}
          </p>

          <div className="mt-4 relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40"
            />
          </div>

          <button
            onClick={() => setMostrandoNovoChat((prev) => !prev)}
            className="mt-3 w-full bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2"
          >
            <MessageCirclePlus size={17} />
            {t.newChat}
          </button>

          {mostrandoNovoChat && (
            <div className="mt-3 bg-slate-50 dark:bg-slate-900 rounded-xl p-2 space-y-1 border border-slate-100 dark:border-slate-700">
              {professoresDisponiveis.map((professor) => (
                <button
                  key={professor.id}
                  onClick={() => iniciarNovoChat(professor)}
                  className="w-full text-left p-3 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition"
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {professor.nome}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {professor.cargo}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversasFiltradas.map((conversa) => {
            const active = conversa.id === chatAtivo;
            const isAutomatic = conversa.tipo === "automatico";

            return (
              <div
                key={conversa.id}
                className={`group w-full border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition ${
                  active ? "bg-blue-50 dark:bg-blue-900/30" : ""
                }`}
              >
                <button
                  onClick={() => setChatAtivo(conversa.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isAutomatic
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      }`}
                    >
                      {isAutomatic ? (
                        <Bell size={19} />
                      ) : (
                        <UserRound size={19} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate text-slate-900 dark:text-white">
                          {conversa.nome}
                        </p>

                        {isAutomatic && (
                          <span className="text-[10px] bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 px-2 py-0.5 rounded-full font-semibold">
                            {t.systemTag}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {conversa.cargo}
                      </p>

                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">
                        {conversa.ultimaMensagem}
                      </p>
                    </div>

                    {!isAutomatic && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          excluirChat(conversa.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition"
                        title={t.deleteChatTitle}
                      >
                        <Trash2 size={17} />
                      </button>
                    )}
                  </div>
                </button>
              </div>
            );
          })}

          {conversasFiltradas.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400 p-5">
              {t.noConversations}
            </p>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        {conversaAtiva ? (
          <>
            <header className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center ${
                  conversaAtiva.tipo === "automatico"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                }`}
              >
                {conversaAtiva.tipo === "automatico" ? (
                  <Bell size={20} />
                ) : (
                  <UserRound size={20} />
                )}
              </div>

              <div>
                <h2 className="font-bold text-slate-900 dark:text-white">
                  {conversaAtiva.nome}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {conversaAtiva.cargo}
                </p>
              </div>
            </header>

            <section className="flex-1 p-5 space-y-3 overflow-y-auto bg-slate-50 dark:bg-slate-900">
              {(mensagens[chatAtivo || 0] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.enviada
                      ? "bg-blue-700 text-white ml-auto rounded-br-md"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-md border border-slate-100 dark:border-slate-700"
                  }`}
                >
                  <p className="text-sm">{msg.texto}</p>

                  <p
                    className={`text-[10px] mt-1 ${
                      msg.enviada ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {msg.hora}
                  </p>
                </div>
              ))}

              <div ref={chatEndRef} />
            </section>

            {conversaAtiva.tipo === "automatico" ? (
              <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                  {t.chatNote}
                </p>
              </div>
            ) : (
              <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex gap-3">
                <input
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") enviarMensagem();
                  }}
                  placeholder={t.messagePlaceholder}
                  className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40"
                />

                <button
                  onClick={enviarMensagem}
                  className="bg-blue-700 text-white px-5 rounded-xl font-semibold hover:bg-blue-800 transition flex items-center gap-2"
                >
                  <Send size={17} />
                  {t.send}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900">
            {t.selectConversation}
          </div>
        )}
      </main>
    </div>
  );
}