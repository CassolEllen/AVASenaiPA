import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4 font-bold">SENAI AVA</div>

      <nav className="flex flex-col gap-2 p-2">
        <Link
          to="/"
          className={`p-3 rounded-lg ${
            isActive("/") ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          Início
        </Link>

        <Link
          to="/aulas"
          className={`p-3 rounded-lg ${
            isActive("/aulas") ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          Aulas
        </Link>
      </nav>
    </div>
  );
}