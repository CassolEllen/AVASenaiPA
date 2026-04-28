import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Aulas from "./pages/Aulas";
import Cursos from "./pages/Cursos";
import CursoDetalhe from "./pages/CursoDetalhe";
import Atividades from "./pages/Atividades";
import AtividadeDetalhe from "./pages/AtividadeDetalhe";
import Mensagens from "./pages/Mensagens";
import Calendario from "./pages/Calendario";
import Perfil from "./pages/Perfil";
import Configuracoes from "./pages/Configuracoes";
import Notificacoes from "./pages/Notificacoes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="aulas" element={<Aulas />} />
          <Route path="atividades" element={<Atividades />} />
          <Route path="atividades/:id" element={<AtividadeDetalhe />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="cursos/:id" element={<CursoDetalhe />} />
          <Route path="mensagens" element={<Mensagens />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="notificacoes" element={<Notificacoes />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;