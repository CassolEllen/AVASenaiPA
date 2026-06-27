import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, CircleAlert, ClipboardCheck } from "lucide-react";
import { supabase } from "../lib/supabase";
import { provaDisponivel } from "../lib/provas";
import { useProvaLock } from "../context/ProvaLockContext";

type Etapa = "questoes" | "revisao" | "resultado";

export default function Prova() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setBloqueado } = useProvaLock();

  const prova = id === provaDisponivel.id ? provaDisponivel : null;

  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [etapa, setEtapa] = useState<Etapa>("questoes");
  const [enviando, setEnviando] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);

  useEffect(() => {
    const desbloqueada = sessionStorage.getItem(`prova-desbloqueada-${id}`);

    if (!desbloqueada) {
      navigate("/", { replace: true });
      return;
    }

    setBloqueado(true);
  }, [id, navigate, setBloqueado]);

  useEffect(() => {
    function avisarSaida(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }

    window.addEventListener("beforeunload", avisarSaida);
    return () => window.removeEventListener("beforeunload", avisarSaida);
  }, []);

  if (!prova) {
    return (
      <div className="max-w-[800px] mx-auto">
        <div className="mt-6 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Prova não encontrada
          </h1>
        </div>
      </div>
    );
  }

  const questaoAtual = prova.questoes[paginaAtual];
  const ultimaPagina = paginaAtual === prova.questoes.length - 1;

  function calcularPontuacao() {
    const acertos = prova!.questoes.filter(
      (questao) => respostas[questao.id] === questao.correta
    ).length;

    return Math.round((acertos / prova!.questoes.length) * 100);
  }

  async function handleFinalizarTentativa() {
    setEnviando(true);

    const nota = calcularPontuacao();

    const { error } = await supabase.from("prova_respostas").insert([
      {
        prova_id: prova!.id,
        respostas,
        pontuacao: nota,
      },
    ]);

    setEnviando(false);

    if (error) {
      console.error(error);
    }

    sessionStorage.removeItem(`prova-desbloqueada-${id}`);
    setPontuacao(nota);
    setEtapa("resultado");
  }

  function handleFechar() {
    setBloqueado(false);
    navigate("/", { replace: true });
  }

    if (etapa === "resultado") {
    return (
      <div className="max-w-[800px] mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center gap-3">
          <CheckCircle2 size={48} className="text-green-600" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Prova enviada com sucesso!
          </h1>

          <div className="mt-2 bg-blue-50 dark:bg-blue-900/30 rounded-2xl px-8 py-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sua pontuação
            </p>
            <p className="text-4xl font-bold text-blue-700 dark:text-blue-300">
              {pontuacao}
            </p>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Suas respostas foram registradas.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-slate-900 dark:text-white">
            Gabarito
          </h2>

          {prova.questoes.map((questao, index) => {
            const respostaAluno = respostas[questao.id];
            const acertou = respostaAluno === questao.correta;
            const semResposta = respostaAluno === undefined;

            return (
              <div
                key={questao.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {index + 1}. {questao.enunciado}
                  </p>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                      acertou
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {acertou ? "Certa" : "Errada"}
                  </span>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Sua resposta:{" "}
                  <span
                    className={
                      acertou
                        ? "text-green-700 dark:text-green-300 font-medium"
                        : "text-red-600 dark:text-red-400 font-medium"
                    }
                  >
                    {semResposta
                      ? "Não respondida"
                      : questao.opcoes[respostaAluno]}
                  </span>
                </p>

                {!acertou && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Resposta correta:{" "}
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      {questao.opcoes[questao.correta]}
                    </span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={handleFechar}
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 active:scale-[0.98] transition"
        >
          Fechar
        </button>
      </div>
    );
  }

  if (etapa === "revisao") {
    return (
      <div className="max-w-[800px] mx-auto space-y-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            <ClipboardCheck size={14} />
            Revisão antes de finalizar
          </span>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {prova.titulo}
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Confira se todas as questões foram respondidas antes de finalizar a tentativa.
          </p>
        </div>

        <div className="space-y-2">
          {prova.questoes.map((questao, index) => {
            const respondida = respostas[questao.id] !== undefined;

            return (
              <button
                key={questao.id}
                onClick={() => {
                  setPaginaAtual(index);
                  setEtapa("questoes");
                }}
                className="w-full flex items-center justify-between gap-4 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition text-left"
              >
                <div className="flex items-center gap-3">
                  {respondida ? (
                    <CheckCircle2 size={20} className="text-green-600 shrink-0" />
                  ) : (
                    <CircleAlert size={20} className="text-amber-500 shrink-0" />
                  )}

                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {index + 1}. {questao.enunciado}
                  </span>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${
                    respondida
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                  }`}
                >
                  {respondida ? "Respondida" : "Sem resposta"}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleFinalizarTentativa}
          disabled={enviando}
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 active:scale-[0.98] transition disabled:opacity-50"
        >
          {enviando ? "Finalizando..." : "Finalizar tentativa"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto space-y-6">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          <ClipboardCheck size={14} />
          Prova em andamento — navegação bloqueada até o envio
        </span>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {prova.titulo}
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {prova.disciplina} · {prova.professor} · {prova.data} ·{" "}
          {prova.janela}
        </p>

        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Questão {paginaAtual + 1} de {prova.questoes.length}
        </p>

        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-700 rounded-full transition-all"
            style={{
              width: `${((paginaAtual + 1) / prova.questoes.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div
        key={questaoAtual.id}
        className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 space-y-3"
      >
        <p className="font-semibold text-slate-900 dark:text-white">
          {paginaAtual + 1}. {questaoAtual.enunciado}
        </p>

        <div className="space-y-2">
          {questaoAtual.opcoes.map((opcao, opcaoIndex) => (
            <label
              key={opcaoIndex}
              className={`flex items-center gap-3 rounded-xl p-3 border cursor-pointer transition ${
                respostas[questaoAtual.id] === opcaoIndex
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30"
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60"
              }`}
            >
              <input
                type="radio"
                name={questaoAtual.id}
                checked={respostas[questaoAtual.id] === opcaoIndex}
                onChange={() =>
                  setRespostas((prev) => ({
                    ...prev,
                    [questaoAtual.id]: opcaoIndex,
                  }))
                }
                className="accent-blue-700"
              />
              <span className="text-sm text-slate-700 dark:text-slate-200">
                {opcao}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setPaginaAtual((p) => Math.max(0, p - 1))}
          disabled={paginaAtual === 0}
          className="px-5 py-3 rounded-xl font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition disabled:opacity-50"
        >
          Anterior
        </button>

        {ultimaPagina ? (
          <button
            onClick={() => setEtapa("revisao")}
            className="px-5 py-3 rounded-xl font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-[0.98] transition"
          >
            Finalizar tentativa
          </button>
        ) : (
          <button
            onClick={() => setPaginaAtual((p) => Math.min(prova.questoes.length - 1, p + 1))}
            className="px-5 py-3 rounded-xl font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-[0.98] transition"
          >
            Próxima
          </button>
        )}
      </div>
    </div>
  );
}