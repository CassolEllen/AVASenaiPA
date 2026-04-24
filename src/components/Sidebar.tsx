import { Home, Book, GraduationCap, ClipboardList, MessageSquare, Calendar, Bell, User, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col justify-between">
      
      {/* TOPO */}
      <div>
        <div className="p-6 font-bold text-lg flex items-center gap-2">
          🎓 SENAI AVA
        </div>

        <nav className="flex flex-col gap-2 px-4">
          <SidebarItem icon={<Home size={18} />} label="Início" active />
          <SidebarItem icon={<Book size={18} />} label="Aulas" />
          <SidebarItem icon={<GraduationCap size={18} />} label="Cursos" />
          <SidebarItem icon={<ClipboardList size={18} />} label="Atividades" />
          <SidebarItem icon={<MessageSquare size={18} />} label="Mensagens" />
          <SidebarItem icon={<Calendar size={18} />} label="Calendário" />
          <SidebarItem icon={<Bell size={18} />} label="Notificações" />
          <SidebarItem icon={<User size={18} />} label="Perfil" />
          <SidebarItem icon={<Settings size={18} />} label="Configurações" />
        </nav>
      </div>

      {/* USUÁRIO */}
      <div className="p-4 border-t flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
          EC
        </div>

        <div className="text-sm">
          <div className="font-semibold">Ellen Cristina</div>
          <div className="text-gray-500 text-xs">ADS</div>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active = false }: any) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
        ${active ? "bg-blue-600 text-white" : "hover:bg-gray-100"}
      `}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}