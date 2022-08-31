import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/AlertaComponent";
import clienteAxios from "../config/clienteAxios";
import Carousel from "../components/CarouselComponent";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const [usu_email, setEmail] = useState("");
  const [usu_password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const { setAuth } = useAuth();

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([usu_email, usu_password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios.", error: true });
      return;
    }

    setEmail(usu_email.toLowerCase());

    try {
      const { data } = await clienteAxios.post(`/usuarios/login`, { usu_email, usu_password });
      localStorage.setItem("token", data.usu_token);
      setAuth(data);
      navigate("/espacios");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
      
  }
  
  const { msg } = alerta;

  return (
    <section className="flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg p-5 items-center">
        <div className="lg:block hidden w-1/2">
          <Carousel />
        </div>
        <div className="lg:w-1/2 px-8 lg:px-16">
          <h2 className="font-bold text-2xl text-gray-800">Iniciar Sesión</h2>
          <p className="text-xs mt-4 text-gray-800">
            Si ya estas registrado, ingresa tus datos para iniciar sesión.
          </p>
          { msg && <Alerta alerta={alerta} /> }
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              id="email"
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={usu_email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                id="password"
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Contraseña"
                value={usu_password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="bg-sky-700 transition-colors rounded-xl text-white py-2 hover:bg-sky-800 duration-300">
              Iniciar Sesión
            </button>
          </form>

          <Link to={"olvide-password"}>
            <p className="mt-2 text-xs py-2 text-gray-800 text-right">
              ¿Olvidaste la contraseña?
            </p>
          </Link>

          <div className="mt-3 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">Ó</p>
            <hr className="border-gray-400" />
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-gray-800">
            <p>¿No tienes una cuenta?</p>
            <Link
              className="py-2 px-5 bg-white border rounded-xl hover:bg-sky-800 transition-colors hover:text-white duration-300"
              to={"registrar"}
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
