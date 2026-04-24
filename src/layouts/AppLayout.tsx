import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-[#f5f7fb]">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}