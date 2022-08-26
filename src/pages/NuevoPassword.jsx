import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/AlertaComponent";
import Carousel from "../components/CarouselComponent";

const NuevoPassword = () => {
  const { token } = useParams();
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [usu_password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const validarToken = async () => {
      try {
        await clienteAxios.get(`/usuarios/recuperar-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    };
    validarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([usu_password, password2].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios.",
        error: true,
      });
      return;
    }

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

    try {
      const { data } = await clienteAxios.post(`/usuarios/recuperar-password/${token}`,{ usu_password });
      setAlerta({ msg: data.msg, error: false });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <section className="flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg p-5 items-center">
        <div className="lg:block hidden w-1/2">
          <Carousel />
        </div>
        <div className="lg:w-1/2 px-8 lg:px-16">
          <h2 className="font-bold text-2xl text-gray-800">
            Recuperar contraseña
          </h2>

          <p className="text-xs mt-4 text-gray-800">
            Ingresa una nueva contraseña.
          </p>

          {msg && <Alerta alerta={alerta} />}

          {tokenValido ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                id="password"
                className="p-2 rounded-xl mt-8 border w-full"
                type="password"
                name="password"
                placeholder="Contraseña"
                value={usu_password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="relative">
                <input
                  id="password2"
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  name="password2"
                  placeholder="Confirmar Contraseña"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>

              <button className="bg-sky-700 transition-colors rounded-xl text-white py-2 hover:bg-sky-800 duration-300">
                Enviar
              </button>
            </form>
          ) : (
            <Alerta
              alerta={{ msg: "Permiso expirado o no valido.", error: true }}
            />
          )}

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

export default NuevoPassword;
