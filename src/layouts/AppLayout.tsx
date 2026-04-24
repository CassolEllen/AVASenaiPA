import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-[#f5f7fb]">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}