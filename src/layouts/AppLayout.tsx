import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-[#f5f7fb] dark:bg-slate-950 transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-[#f5f7fb] dark:bg-slate-950 transition-colors duration-300">
        <Header />

        <main className="flex-1 p-6 overflow-auto bg-[#f5f7fb] dark:bg-slate-950 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}