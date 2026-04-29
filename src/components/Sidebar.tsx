import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  GraduationCap,
  ClipboardList,
  MessageSquare,
  Calendar,
  Bell,
  User,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const itemClass = (path: string) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
    }`;

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
      <div>
        <div className="p-4 font-bold text-lg text-slate-900 dark:text-white">
          SENAI AVA
        </div>

        <nav className="flex flex-col gap-1 px-2">
          <Link to="/" className={itemClass("/")}>
            <Home size={18} /> Início
          </Link>

          <Link to="/aulas" className={itemClass("/aulas")}>
            <BookOpen size={18} /> Aulas
          </Link>

          <Link to="/cursos" className={itemClass("/cursos")}>
            <GraduationCap size={18} /> Cursos
          </Link>

          <Link to="/atividades" className={itemClass("/atividades")}>
            <ClipboardList size={18} /> Atividades
          </Link>

          <Link to="/mensagens" className={itemClass("/mensagens")}>
            <MessageSquare size={18} /> Mensagens
          </Link>

          <Link to="/calendario" className={itemClass("/calendario")}>
            <Calendar size={18} /> Calendário
          </Link>

          <Link to="/notificacoes" className={itemClass("/notificacoes")}>
            <Bell size={18} /> Notificações
          </Link>

          <Link to="/perfil" className={itemClass("/perfil")}>
            <User size={18} /> Perfil
          </Link>

          <Link to="/configuracoes" className={itemClass("/configuracoes")}>
            <Settings size={18} /> Configurações
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
            EC
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              Ellen Cristina
            </div>
            <div className="text-xs text-gray-500 dark:text-slate-400">ADS</div>
          </div>
        </div>
      </div>
    </div>
  );
}