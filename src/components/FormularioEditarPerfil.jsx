import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { regiones } from "../helpers/regiones";
import { Switch } from "@headlessui/react";
import useEspacio from "../hooks/useEspacio";
import Alerta from "./AlertaComponent";
import useAuth from "../hooks/useAuth";

const FormularioEditarPerfil = () => {
  const [usu_nombre, setNombre] = useState("");
  const [usu_password, setPassword] = useState("");
  const [repetirpassword, setRepetirPassword] = useState("");
  const [usu_region, setRegion] = useState("");
  const [usu_perfil_img, setImgPerfil] = useState(undefined);
  const [usu_img_id, setImgId] = useState("");
  const [imgpreview, setImgPreview] = useState(
    "https://res.cloudinary.com/dbuwevjad/image/upload/v1661278251/swo2vuybriyddfnuiyst.png"
  );

  const { auth, alerta, cargandocomp, mostrarAlerta, editarPerfil } = useAuth();

  useEffect(() => {
    setNombre(auth.usu_nombre);
    setRegion(auth.usu_region);
    setImgId(auth.usu_img_id);
    setImgPreview(auth.usu_perfil_img);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([usu_nombre].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    if (usu_perfil_img) {
      if (usu_perfil_img.size > 5000000) {
        mostrarAlerta({
          msg: "La imagen es muy pesada",
          error: true,
        });
        return;
      }
    }

    if (![usu_password, repetirpassword].includes("")) {
      if (usu_password.length < 6) {
        mostrarAlerta({
          msg: "La contraseña debe tener al menos 6 caracteres",
          error: true,
        });
        return;
      }

      if (usu_password !== repetirpassword) {
        mostrarAlerta({
          msg: "Las contraseñas no coinciden",
          error: true,
        });
        return;
      }
    }

    await editarPerfil(
      { usu_nombre, usu_password, usu_region, usu_img_id },
      usu_perfil_img
    );

    setNombre("");
    setPassword("");
    setRepetirPassword("");
    setRegion("Global");
  };

  const handleImage = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setImgPerfil(e.target.files[0]);
  };

  const { msg } = alerta;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow basis-full"
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-center text-sm font-bold mb-2"
          htmlFor="nombre"
        >
          Imagen de perfil
        </label>
        <div className="flex flex-col justify-between items-center gap-2 ">
          <img
            className="w-20 h-20 min-w-15 min-h-15 rounded-full"
            src={imgpreview}
            alt=""
          />

          <input
            type="file"
            name="file"
            id="file"
            accept="image/png, image/jpeg"
            className="border p-2 placeholder-gray-400 rounded-md shadow "
            onChange={handleImage}
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="nombre"
        >
          Nombre
        </label>
        <input
          className="border w-full p-2 placeholder-gray-400 rounded-md shadow"
          id="nombre"
          type="text"
          value={usu_nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Cambiar contraseña (opcional)
        </label>
        <input
          className="border w-full p-2 placeholder-gray-400 rounded-md shadow"
          id="password"
          type="password"
          value={usu_password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Repetir contraseña
        </label>
        <input
          className="border w-full p-2 placeholder-gray-400 rounded-md shadow"
          id="password2"
          type="password"
          value={repetirpassword}
          onChange={(e) => setRepetirPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="region"
          >
            Region de busqueda
          </label>
          <select
            className="border w-4/5 p-2 rounded-md shadow"
            id="region"
            value={usu_region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="Global">Global</option>
            {regiones.map((region, index) => {
              return (
                <option key={index} value={region}>
                  {region}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {cargandocomp ? (
        <button
          type="submit"
          className="inline-flex items-center leading-6  w-full p-3 uppercase font-bold rounded text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
          disabled=""
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Cargando...
        </button>
      ) : (
        <input
          type="submit"
          value={"Editar perfil"}
          className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
      )}
    </form>
  );
};

export default FormularioEditarPerfil;
