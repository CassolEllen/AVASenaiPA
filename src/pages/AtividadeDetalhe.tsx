import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { ArrowLeft, Download, FileText, Trash2, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const atividades = [
  {
    id: "atividade-1",
    titulo: "Trabalho Prático de Listas Encadeadas",
    disciplina: "Estrutura de Dados",
    professor: "Prof. Doglas André Finco",
    prazo: "01/06/2024 23:59",
    status: "Pendente",
    descricao:
      "Desenvolver uma implementação de listas encadeadas em Java, incluindo inserção, remoção e busca de elementos.",
  },
  {
    id: "atividade-2",
    titulo: "Desafio 3 - Big Data, Analytics e Inteligência Artificial",
    disciplina: "Big Data, Analytics e Inteligência Artificial",
    professor: "Prof. Victor Cézar Bonatti Carvalho",
    prazo: "05/06/2024 23:59",
    status: "Enviado",
    descricao:
      "Elaborar uma análise prática sobre aplicações de Big Data, Analytics e Inteligência Artificial em cenários reais.",
  },
  {
    id: "atividade-3",
    titulo: "Atividade Prática - Falhas de Implantação",
    disciplina: "Implantação de Sistemas",
    professor: "Prof. Maximiano",
    prazo: "20/03/2024",
    status: "Atrasado",
    descricao:
      "Identificar falhas comuns em processos de implantação de sistemas e propor ações corretivas.",
  },
];

type Submission = {
  id: string;
  atividade_id: string;
  file_name: string;
  file_url: string;
  status: string;
  created_at: string;
};

export default function AtividadeDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const atividade = atividades.find((item) => item.id === id);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function fetchSubmissions() {
    if (!id) return;

    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("atividade_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Não foi possível carregar os envios desta atividade.",
      });
      return;
    }

    setSubmissions(data || []);
  }

  useEffect(() => {
    fetchSubmissions();
  }, [id]);

  async function handleUpload() {
    if (!file) {
      setMessage({
        type: "error",
        text: "Selecione um arquivo antes de enviar.",
      });
      return;
    }

    if (!id) {
      setMessage({
        type: "error",
        text: "Atividade não identificada.",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    const safeFileName = file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9.]/g, "_")
      .toLowerCase();

    const filePath = `${Date.now()}_${safeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("submissions")
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      setMessage({
        type: "error",
        text: "Erro ao enviar o arquivo. Tente novamente.",
      });
      setLoading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("submissions")
      .getPublicUrl(filePath);

    const { error: dbError } = await supabase.from("submissions").insert([
      {
        atividade_id: id,
        file_name: file.name,
        file_url: publicUrlData.publicUrl,
        status: "Enviado",
      },
    ]);

    setLoading(false);

    if (dbError) {
      console.error(dbError);
      setMessage({
        type: "error",
        text: "Arquivo enviado, mas não foi possível salvar o registro no banco.",
      });
      return;
    }

    setFile(null);
    setMessage({
      type: "success",
      text: "Atividade enviada com sucesso!",
    });

    fetchSubmissions();
  }

  async function handleDeleteSubmission(submission: Submission) {
    const confirmed = confirm(`Deseja excluir o arquivo "${submission.file_name}"?`);

    if (!confirmed) return;

    const filePath = decodeURIComponent(
      submission.file_url.split("/submissions/")[1] || ""
    );

    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from("submissions")
        .remove([filePath]);

      if (storageError) {
        console.error(storageError);
        setMessage({
          type: "error",
          text: "Não foi possível excluir o arquivo do Storage.",
        });
        return;
      }
    }

    const { error } = await supabase
      .from("submissions")
      .delete()
      .eq("id", submission.id);

    if (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Não foi possível excluir o envio.",
      });
      return;
    }

    setMessage({
      type: "success",
      text: "Envio excluído com sucesso.",
    });

    fetchSubmissions();
  }

  if (!atividade) {
    return (
      <div className="max-w-[900px] mx-auto">
        <button
          onClick={() => navigate("/atividades")}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <ArrowLeft size={16} />
          Voltar às atividades
        </button>

        <div className="mt-6 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Atividade não encontrada
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Não foi possível encontrar os dados desta atividade.
          </p>
        </div>
      </div>
    );
  }

  const hasSubmission = submissions.length > 0;
  const currentStatus = hasSubmission ? "Enviado" : atividade.status;

  const statusStyle =
    currentStatus === "Enviado"
      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
      : currentStatus === "Atrasado"
      ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";

  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      <button
        onClick={() => navigate("/atividades")}
        className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <ArrowLeft size={16} />
        Voltar às atividades
      </button>

      <div className="space-y-3">
        <span
          className={`inline-flex text-xs px-3 py-1 rounded-full font-semibold ${statusStyle}`}
        >
          {currentStatus}
        </span>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">
          {atividade.titulo}
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
          {atividade.disciplina} · {atividade.professor}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Prazo de entrega
        </p>
        <p className="font-semibold text-slate-900 dark:text-white">
          {atividade.prazo}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 space-y-4">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">
            Descrição
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            {atividade.descricao}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 space-y-4">
        <h2 className="font-bold text-slate-900 dark:text-white">
          Enviar Trabalho
        </h2>

        {message && (
          <div
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3">
          <Upload size={30} className="text-slate-400 dark:text-slate-500" />

          <p className="text-sm text-slate-600 dark:text-slate-300">
            {file
              ? `Arquivo selecionado: ${file.name}`
              : "Clique para selecionar o arquivo"}
          </p>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm text-slate-600 dark:text-slate-300"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 active:scale-[0.98] transition disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar Trabalho"}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 space-y-4">
        <h2 className="font-bold text-slate-900 dark:text-white">
          Arquivos enviados
        </h2>

        {submissions.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Nenhum arquivo enviado para esta atividade ainda.
          </p>
        ) : (
          <div className="space-y-3">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 p-4"
              >
                <div className="flex items-center gap-3">
                  <FileText
                    size={20}
                    className="text-blue-700 dark:text-blue-300"
                  />

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {submission.file_name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Enviado em{" "}
                      {new Date(submission.created_at).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={submission.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200"
                    title="Baixar arquivo"
                  >
                    <Download size={20} />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDeleteSubmission(submission)}
                    className="text-red-500 hover:text-red-700"
                    title="Excluir envio"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}