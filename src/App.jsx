import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Espacios from "./pages/Espacios";
import NuevoEspacio from "./pages/NuevoEspacio";
import Espacio from "./pages/Espacio";
import EditarEspacio from "./pages/EditarEspacio";

import { AuthProvider } from "./context/AuthContext";
import { EspacioProvider } from "./context/EspacioContext";
import EditarPerfil from "./pages/EditarPerfil";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EspacioProvider>
        <Routes>
          
          <Route path="*" element={<p> Error 404, Pagina no encontrada </p>} />
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>

          <Route path="/espacios" element={<RutaProtegida />}>
            <Route index element={<Espacios />} />
            <Route path="crear-espacio" element={<NuevoEspacio />} />
            <Route path="editar-perfil" element={<EditarPerfil />} />
            <Route path=":id" element={<Espacio />} />
            <Route path="editar/:id" element={<EditarEspacio />} />

          </Route>

        </Routes>
        </EspacioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
