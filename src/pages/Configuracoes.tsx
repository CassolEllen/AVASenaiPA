import { useEffect, useState } from "react";
import { Bell, Globe, Lock, Moon, Sun, Type } from "lucide-react";
import { useIdioma } from "../hooks/useIdioma";
import { textos } from "../i18n";

type Fonte = "pequeno" | "medio" | "grande";

export default function Configuracoes() {
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [novasNotas, setNovasNotas] = useState(true);
  const [mensagens, setMensagens] = useState(true);
  const [lembretesAula, setLembretesAula] = useState(true);
  const [eventos, setEventos] = useState(false);
  const [ocultarNotas, setOcultarNotas] = useState(false);
  const [fonte, setFonte] = useState<Fonte>("medio");

  const { idioma, setIdioma } = useIdioma();
  const t = textos[idioma].configuracoes;

  useEffect(() => {
    const configSalva = localStorage.getItem("ava_configuracoes");

    if (configSalva) {
      const config = JSON.parse(configSalva);

      setTemaEscuro(config.temaEscuro ?? false);
      setNovasNotas(config.novasNotas ?? true);
      setMensagens(config.mensagens ?? true);
      setLembretesAula(config.lembretesAula ?? true);
      setEventos(config.eventos ?? false);
      setOcultarNotas(config.ocultarNotas ?? false);
      setFonte(config.fonte ?? "medio");
    }
  }, []);

  useEffect(() => {
    const config = {
      temaEscuro,
      novasNotas,
      mensagens,
      lembretesAula,
      eventos,
      ocultarNotas,
      fonte,
    };

    localStorage.setItem("ava_configuracoes", JSON.stringify(config));

    if (temaEscuro) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.documentElement.style.fontSize =
      fonte === "pequeno" ? "14px" : fonte === "grande" ? "18px" : "16px";
  }, [
    temaEscuro,
    novasNotas,
    mensagens,
    lembretesAula,
    eventos,
    ocultarNotas,
    fonte,
  ]);

  return (
    <div className="max-w-[1000px] mx-auto space-y-5 pb-8 text-slate-900 dark:text-white transition-colors duration-300">
      <h1 className="text-2xl font-bold">{t.titulo}</h1>

      <SettingCard>
        <div className="flex items-center justify-between">
          <SettingTitle
            icon={temaEscuro ? <Moon size={20} /> : <Sun size={20} />}
            title={t.tema}
            description={temaEscuro ? t.escuro : t.claro}
          />

          <Switch checked={temaEscuro} onChange={setTemaEscuro} />
        </div>
      </SettingCard>

      <SettingCard>
        <SettingTitle icon={<Bell size={20} />} title={t.notificacoes} />

        <div className="mt-5 divide-y divide-slate-200 dark:divide-slate-700">
          <SettingRow label={t.novasNotas}>
            <Switch checked={novasNotas} onChange={setNovasNotas} />
          </SettingRow>

          <SettingRow label={t.mensagens}>
            <Switch checked={mensagens} onChange={setMensagens} />
          </SettingRow>

          <SettingRow label={t.lembretesAula}>
            <Switch checked={lembretesAula} onChange={setLembretesAula} />
          </SettingRow>

          <SettingRow label={t.eventos}>
            <Switch checked={eventos} onChange={setEventos} />
          </SettingRow>
        </div>
      </SettingCard>

      <SettingCard>
        <SettingTitle icon={<Type size={20} />} title={t.tamanhoFonte} />

        <SegmentedControl
          value={fonte}
          options={[
            { label: t.pequeno, value: "pequeno" },
            { label: t.medio, value: "medio" },
            { label: t.grande, value: "grande" },
          ]}
          onChange={(value) => setFonte(value as Fonte)}
        />
      </SettingCard>

      <SettingCard>
        <div className="flex items-center justify-between">
          <SettingTitle
            icon={<Lock size={20} />}
            title={t.ocultarNotas}
            description={t.ocultarNotasDesc}
          />

          <Switch checked={ocultarNotas} onChange={setOcultarNotas} />
        </div>
      </SettingCard>

      <SettingCard>
        <SettingTitle icon={<Globe size={20} />} title={t.idioma} />

        <SegmentedControl
          value={idioma}
          options={[
            { label: "Português", value: "pt" },
            { label: "English", value: "en" },
          ]}
          onChange={(value) => setIdioma(value as "pt" | "en")}
        />
      </SettingCard>

      <p className="text-center text-xs text-slate-400">{t.versao}</p>
    </div>
  );
}

function SettingCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-3xl p-5 bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-colors duration-300">
      {children}
    </section>
  );
}

function SettingTitle({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-blue-700 dark:text-blue-400">{icon}</div>

      <div>
        <h2 className="font-bold text-slate-900 dark:text-white">{title}</h2>
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function SettingRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3 text-slate-900 dark:text-white">
      <span>{label}</span>
      {children}
    </div>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 rounded-full p-1 transition ${
        checked ? "bg-blue-700" : "bg-slate-200 dark:bg-slate-700"
      }`}
    >
      <span
        className={`block w-5 h-5 bg-white rounded-full transition ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SegmentedControl({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-5 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 grid grid-cols-3 transition-colors duration-300">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`py-3 rounded-xl text-sm font-semibold transition ${
            value === option.value
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}