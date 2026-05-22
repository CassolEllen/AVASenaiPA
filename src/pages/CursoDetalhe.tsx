import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Video,
  MapPin,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useIdioma } from "../hooks/useIdioma";
import { textos } from "../i18n";

const cursos = [
  {
    id: "ads",
    titulo: "Análise e Desenvolvimento de Sistemas",
    semestres: [
      {
        numero: 1,
        materias: [
          {
            nome: "Lógica de Programação",
            professor: "Prof. Ana Lima",
            aulas: [
              {
                titulo: "Introdução à lógica",
                tipo: "Presencial",
                data: "16/02/2026",
                local: "Sala F07",
              },
              {
                titulo: "Exercícios práticos",
                tipo: "Online",
                data: "Quarta · 19:00",
                meetUrl: "https://meet.google.com/abc-defg-hij",
              },
            ],
          },
          {
            nome: "Fundamentos de Tecnologia da Informação",
            professor: "Prof. Marcos Silva",
            aulas: [
              {
                titulo: "Conceitos de TI",
                tipo: "Presencial",
                data: "17/02/2026",
                local: "Sala F07",
              },
              {
                titulo: "Sistemas computacionais",
                tipo: "Online",
                data: "18/02/2026",
                meetUrl: "https://meet.google.com/ti-fundamentos",
              },
            ],
          },
        ],
      },

      {
        numero: 2,
        materias: [
          {
            nome: "Banco de Dados",
            professor: "Prof. Carlos Souza",
            aulas: [
              {
                titulo: "Modelagem de dados",
                tipo: "Presencial",
                data: "13/03/2026",
                local: "Sala F07",
              },
              {
                titulo: "SQL na prática",
                tipo: "Online",
                data: "19/03/2026",
                meetUrl: "https://meet.google.com/sql-pratica",
              },
            ],
          },
        ],
      },

      {
        numero: 3,
        materias: [
          {
            nome: "Desenvolvimento Web",
            professor: "Prof. Matheus Pereira",
            aulas: [
              {
                titulo: "HTML, CSS e responsividade",
                tipo: "Presencial",
                data: "17/04/2026",
                local: "Laboratório 1",
              },
              {
                titulo: "React na prática",
                tipo: "Online",
                data: "19/04/2026",
                meetUrl: "https://meet.google.com/dev-web-react",
              },
            ],
          },
        ],
      },

      {
        numero: 4,
        materias: [
          {
            nome: "Desenvolvimento Mobile",
            professor: "Prof. Bruno Almeida",
            aulas: [
              {
                titulo: "Introdução ao mobile",
                tipo: "Presencial",
                data: "05/05/2026",
                local: "Laboratório 3",
              },
              {
                titulo: "Componentes mobile",
                tipo: "Online",
                data: "07/05/2026",
                meetUrl: "https://meet.google.com/dev-mobile",
              },
            ],
          },
        ],
      },

      {
        numero: 5,
        materias: [
          {
            nome: "Big Data, Analytics e Inteligência Artificial",
            professor: "Prof. Victor Cézar Bonatti Carvalho",
            aulas: [
              {
                titulo: "Conceitos de Big Data",
                tipo: "Presencial",
                data: "03/06/2026",
                local: "Sala 304",
              },
              {
                titulo: "Aplicações de IA",
                tipo: "Online",
                data: "10/06/2026",
                meetUrl: "https://meet.google.com/big-data-ia",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "iaPratica",
    titulo: "IA na Prática",
    semestres: [
      {
        numero: 1,
        materias: [
          {
            nome: "Fundamentos da Inteligência Artificial",
            professor: "SCTEC",
            aulas: [
              {
                titulo: "Introdução à Inteligência Artificial",
                tipo: "Online",
                data: "14/04/2026",
                meetUrl: "https://meet.google.com/ia-pratica",
              },
              {
                titulo: "IA tradicional e pensamento computacional",
                tipo: "Online",
                data: "21/04/2026",
                meetUrl: "https://meet.google.com/ia-pratica",
              },
            ],
          },

          {
            nome: "Modelos de Linguagem",
            professor: "SCTEC",
            aulas: [
              {
                titulo: "Como funcionam os modelos de linguagem",
                tipo: "Online",
                data: "28/04/2026",
                meetUrl: "https://meet.google.com/modelos-linguagem",
              },
              {
                titulo: "Aplicações de IA generativa",
                tipo: "Online",
                data: "05/05/2026",
                meetUrl: "https://meet.google.com/ia-generativa",
              },
            ],
          },
        ],
      },

      {
        numero: 2,
        materias: [
          {
            nome: "IA na Prática",
            professor: "SCTEC",
            aulas: [
              {
                titulo: "Prompts, automações e produtividade",
                tipo: "Online",
                data: "12/05/2026",
                meetUrl: "https://meet.google.com/prompts-ia",
              },
              {
                titulo: "Uso responsável da Inteligência Artificial",
                tipo: "Online",
                data: "19/05/2026",
                meetUrl: "https://meet.google.com/ia-responsavel",
              },
            ],
          },

          {
            nome: "Projeto Final com IA",
            professor: "SCTEC",
            aulas: [
              {
                titulo: "Desenvolvimento do projeto prático",
                tipo: "Online",
                data: "26/05/2026",
                meetUrl: "https://meet.google.com/projeto-ia",
              },
              {
                titulo: "Apresentação e encerramento",
                tipo: "Online",
                data: "13/06/2026",
                meetUrl: "https://meet.google.com/apresentacao-ia",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function CursoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { idioma } = useIdioma();
  const t = textos[idioma].cursoDetalhe;

  const curso = cursos.find((c) => c.id === id);
  const storageKey = `curso-progress-${id}`;

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [openSemesters, setOpenSemesters] = useState<number[]>([1]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, [storageKey]);

  function toggleLesson(lessonId: string) {
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter((item) => item !== lessonId)
      : [...completedLessons, lessonId];

    setCompletedLessons(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  }

  function toggleSemester(numero: number) {
    setOpenSemesters((current) =>
      current.includes(numero)
        ? current.filter((item) => item !== numero)
        : [...current, numero]
    );
  }

  if (!curso) {
    return (
      <p className="text-slate-900 dark:text-white">{t.courseNotFound}</p>
    );
  }

  const totalLessons = curso.semestres.reduce(
    (total, semestre) =>
      total +
      semestre.materias.reduce((sum, materia) => sum + materia.aulas.length, 0),
    0
  );

  const courseProgress =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="max-w-[1100px] mx-auto space-y-6">
      <button
        onClick={() => navigate("/cursos")}
        className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <ArrowLeft size={16} />
        {t.back}
      </button>

      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 rounded-3xl p-6 text-white shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
        <p className="text-sm opacity-90">{t.courseLabel}</p>
        <h1 className="text-2xl font-bold mt-1">{curso.titulo}</h1>
        <p className="text-sm opacity-90 mt-1">{t.description}</p>

        <div className="mt-5">
          <div className="flex justify-between text-sm mb-2">
            <span>{t.progressGeneral}</span>
            <span>{courseProgress}%</span>
          </div>

          <div className="h-2 bg-white/25 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${courseProgress}%` }}
            />
          </div>
        </div>
      </section>

      <div className="space-y-5">
        {curso.semestres.map((semestre) => {
          const semesterLessons = semestre.materias.flatMap(
            (materia) => materia.aulas
          );

          const semesterLessonIds = semestre.materias.flatMap((materia) =>
            materia.aulas.map(
              (aula) => `${semestre.numero}-${materia.nome}-${aula.titulo}`
            )
          );

          const semesterCompleted = semesterLessonIds.filter((lessonId) =>
            completedLessons.includes(lessonId)
          ).length;

          const semesterProgress =
            semesterLessons.length === 0
              ? 0
              : Math.round((semesterCompleted / semesterLessons.length) * 100);

          const isOpen = openSemesters.includes(semestre.numero);

          return (
            <section
              key={semestre.numero}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleSemester(semestre.numero)}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/60 transition"
              >
                <div className="text-left">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {semestre.numero}º {t.semester}
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {semesterCompleted} de {semesterLessons.length}{" "}
                    {t.lessonsCompleted}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-700 rounded-full"
                        style={{ width: `${semesterProgress}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-right">
                      {semesterProgress}%
                    </p>
                  </div>

                  <span className="text-slate-700 dark:text-slate-300">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="p-5 pt-0 space-y-4">
                  {semestre.materias.map((materia, index) => {
                    const materiaLessonIds = materia.aulas.map(
                      (aula) =>
                        `${semestre.numero}-${materia.nome}-${aula.titulo}`
                    );

                    const materiaCompleted = materiaLessonIds.filter(
                      (lessonId) => completedLessons.includes(lessonId)
                    ).length;

                    const materiaProgress = Math.round(
                      (materiaCompleted / materia.aulas.length) * 100
                    );

                    return (
                      <div
                        key={index}
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 space-y-4 transition-colors"
                      >
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">
                              {materia.nome}
                            </h3>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {materia.professor}
                            </p>
                          </div>

                          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                            {materiaProgress}% {t.completed}
                          </span>
                        </div>

                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-700 rounded-full"
                            style={{ width: `${materiaProgress}%` }}
                          />
                        </div>

                        <div className="space-y-3">
                          {materia.aulas.map((aula, i) => {
                            const lessonId = `${semestre.numero}-${materia.nome}-${aula.titulo}`;
                            const isCompleted =
                              completedLessons.includes(lessonId);

                            return (
                              <div
                                key={i}
                                className={`flex justify-between items-center rounded-xl p-4 border transition ${
                                  isCompleted
                                    ? "bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-800"
                                    : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <button
                                    onClick={() => toggleLesson(lessonId)}
                                    className={
                                      isCompleted
                                        ? "text-green-600 dark:text-green-300"
                                        : "text-slate-400 hover:text-blue-700 dark:hover:text-blue-300"
                                    }
                                    title={
                                      isCompleted
                                        ? t.markIncomplete
                                        : t.markComplete
                                    }
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 size={22} />
                                    ) : (
                                      <Circle size={22} />
                                    )}
                                  </button>

                                  <div>
                                    <p
                                      className={`font-semibold ${
                                        isCompleted
                                          ? "text-green-700 dark:text-green-300"
                                          : "text-slate-800 dark:text-white"
                                      }`}
                                    >
                                      {aula.titulo}
                                    </p>

                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      {aula.data}
                                    </p>
                                  </div>
                                </div>

                                {aula.tipo === "Online" ? (
                                  <a
                                    href={aula.meetUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/70 px-3 py-2 rounded-lg text-sm font-semibold transition"
                                  >
                                    <Video size={16} />
                                    {t.accessMeet}
                                  </a>
                                ) : (
                                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                                    <MapPin size={16} />
                                    {aula.local}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}