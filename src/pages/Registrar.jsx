import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/CarouselComponent";
import Alerta from "../components/AlertaComponent";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {

  const [usu_nombre, setNombre] = useState("");
  const [usu_email, setEmail] = useState("");
  const [usu_password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([usu_nombre, usu_email, usu_password, password2].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios.",
        error: true,
      });
      return;
    }

    if (usu_nombre.length > 20 || usu_nombre.length < 3) {
      setAlerta({
        msg: "El nombre debe tener entre 3 y 20 caracteres.",
        error: true,
      });
      return;
    }

    setEmail(usu_email.toLowerCase());

    if (usu_password !== password2) {
      setAlerta({
        msg: "Las contraseñas no coinciden.",
        error: true,
      });
      return;
    }

    if (usu_password.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres.",
        error: true,
      });
      return;
    }

    setAlerta({});
    
    try {
      const { data } = await clienteAxios.post('/usuarios', {
        usu_nombre,
        usu_email,
        usu_password,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <section className="flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg p-5 items-center">
        <div className="lg:block hidden w-1/2">
          <Carousel />
        </div>
        <div className="lg:w-1/2 px-8 lg:px-16">
          <h2 className="font-bold text-2xl text-gray-800">Registro</h2>
          <p className="text-xs mt-4 text-gray-800">
            Rellena todos los campos del siguiente formulario para crear una
            cuenta.
          </p>

          {alerta.msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              id="nombre"
              className="p-2 mt-4 rounded-xl border"
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={usu_nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <div className="relative">
              <input
                id="email"
                className="p-2 rounded-xl border w-full"
                type="email"
                name="email"
                placeholder="Email"
                value={usu_email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              id="password"
              className="p-2 rounded-xl border w-full"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={usu_password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              id="password2"
              className="p-2 rounded-xl border w-full"
              type="password"
              name="password2"
              placeholder="Confirmar Contraseña"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />

            <button className="bg-sky-700 transition-colors rounded-xl text-white py-2 hover:bg-sky-800 duration-300">
              Regístrate
            </button>
          </form>

          <div className="mt-3 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">Ó</p>
            <hr className="border-gray-400" />
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-gray-800">
            <p>¿Ya tienes una cuenta?</p>
            <Link
              className="py-2 px-5 bg-white border rounded-xl hover:bg-sky-800 transition-colors hover:text-white duration-300"
              to={"/"}
            >
              Inicia Sesión
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registrar;
