export default function Header() {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      
      {/* BUSCA */}
      <input
        placeholder="Buscar..."
        className="bg-gray-100 px-4 py-2 rounded-lg w-96 outline-none"
      />

      {/* USUÁRIO */}
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
          <span className="font-medium">Ellen</span>
        </div>
      </div>
    </header>
  );
}