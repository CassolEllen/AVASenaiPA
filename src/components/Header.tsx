import { useIdioma } from "../hooks/useIdioma";
import { textos } from "../i18n";

export default function Header() {
  const { idioma } = useIdioma();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between transition-colors">
      <input
        placeholder={textos[idioma].header.buscar}
        className="bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 px-4 py-2 rounded-lg w-96 outline-none"
      />

      <div className="flex items-center gap-4">
        <div className="relative">
          🔔
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full">
            EC
          </div>
          <span className="font-medium text-slate-900 dark:text-white">
            Ellen
          </span>
        </div>
      </div>
    </header>
  );
}