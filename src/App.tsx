import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Aulas from "./pages/Aulas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="aulas" element={<Aulas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;