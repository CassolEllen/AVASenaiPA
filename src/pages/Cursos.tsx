import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";
import { useIdioma } from "../hooks/useIdioma";
import { textos } from "../i18n";

const cursos = [
  {
    id: "ads",
    titulo: textos["pt"].cursos.items.ads.titulo,
    descricao: textos["pt"].cursos.items.ads.descricao,
    progresso: 72,
    semestres: 5,
  },
];

export default function Cursos() {
  const { idioma } = useIdioma();
  const t = textos[idioma].cursos;

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      <header className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
          <BookOpen size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-5">
        {cursos.map((curso) => (
          <CursoCard key={curso.id} {...curso} />
        ))}
      </section>
    </div>
  );
}

function CursoCard({
  id,
  titulo,
  descricao,
  progresso,
  semestres,
}: {
  id: string;
  titulo: string;
  descricao: string;
  progresso: number;
  semestres: number;
}) {
  const navigate = useNavigate();
  const { idioma } = useIdioma();
  const t = textos[idioma].cursos;

  const translatedTitulo = t.items.ads.titulo;
  const translatedDescricao = t.items.ads.descricao;

  return (
    <article
      onClick={() => navigate(`/cursos/${id}`)}
      className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 cursor-pointer hover:scale-[1.01] transition space-y-4"
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="font-bold text-lg text-slate-900 dark:text-white">
            {translatedTitulo}
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {translatedDescricao}
          </p>
        </div>

        <ChevronRight
          className="text-slate-400 dark:text-slate-500 shrink-0"
          size={22}
        />
      </div>

      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>{semestres} {t.semesters}</span>
        <span>{progresso}% {t.completed}</span>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div
          className="bg-blue-700 h-2 rounded-full"
          style={{ width: `${progresso}%` }}
        />
      </div>
    </article>
  );
}