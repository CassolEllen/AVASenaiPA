import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

import Home from "./pages/Home";
import Aulas from "./pages/Aulas";
import Cursos from "./pages/Cursos";
import CursoDetalhe from "./pages/CursoDetalhe";
import Atividades from "./pages/Atividades";
import AtividadeDetalhe from "./pages/AtividadeDetalhe";
import Mensagens from "./pages/Mensagens";
import Calendario from "./pages/Calendario";
import Notificacoes from "./pages/Notificacoes";
import Perfil from "./pages/Perfil";
import Configuracoes from "./pages/Configuracoes";
import Cadastro from "./pages/Cadastro";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/:id" element={<CursoDetalhe />} />
          <Route path="/atividades" element={<Atividades />} />
          <Route path="/atividades/:id" element={<AtividadeDetalhe />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Route>
      </Route>
    </Routes>
  );
}