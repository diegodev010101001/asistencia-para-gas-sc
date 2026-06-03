import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import SeguroResponsivo from "./pages/SeguroResponsivo";
import SeguroAmbiental from "./pages/SeguroAmbiental";
import GastosMedicos from "./pages/GastosMedicos";

function App() {

  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/seguro-responsivo"
        element={<SeguroResponsivo />}
      />

      <Route
        path="/seguro-ambiental"
        element={<SeguroAmbiental />}
      />

      <Route
        path="/gastos-medicos"
        element={<GastosMedicos />}
      />

    </Routes>
  );
}

export default App;