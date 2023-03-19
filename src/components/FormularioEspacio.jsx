import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { regiones } from "../helpers/regiones";
import { Switch } from "@headlessui/react";
import useEspacio from "../hooks/useEspacio";
import Alerta from "../components/AlertaComponent";

const FormularioEspacio = () => {
  const [esp_nombre, setNombre] = useState("");
  const [esp_descripcion, setDesc] = useState("");
  const [esp_region, setRegion] = useState("Global");
  const [esp_acceso, setAcceso] = useState(true);
  const [esp_img, setImg] = useState(undefined);
  const [esp_img_id, setImgId] = useState("");
  const [imgPreview, setImgPreview] = useState(
    "https://res.cloudinary.com/dbuwevjad/image/upload/v1661285616/default-espacio_gwhseh.jpg"
  );
  const [id, setId] = useState(null);

  const { espacio, alerta, cargandocomp, mostrarAlerta, submitEspacio, setCargandocomp } =
    useEspacio();
  const params = useParams();

  useEffect(() => {
    setCargandocomp(false);
    if (params.id) {
      setId(espacio._id);
      setImgId(espacio.esp_img_id);
      setNombre(espacio.esp_nombre);
      setDesc(espacio.esp_descripcion);
      setRegion(espacio.esp_region);
      setAcceso(espacio.esp_acceso);
      setImgPreview(espacio.esp_img_portada);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([esp_nombre, esp_descripcion, esp_region].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    if (esp_nombre.length > 30 || esp_nombre.length < 3) {
      mostrarAlerta({
        msg: "El nombre del espacio debe tener entre 3 y 30 caracteres.",
        error: true,
      });
      return;
    }

    if (esp_descripcion.length > 500 || esp_descripcion.length < 100) {
      mostrarAlerta({
        msg: "La descripción del espacio debe tener entre 100 y 500 caracteres.",
        error: true,
      });
      return;
    }

    if (esp_img === undefined && !params.id) { 
      mostrarAlerta({
        msg: "Seleccione una imagen",
        error: true,
      });
      return;
    }

    if ( esp_img !== undefined ) {

      if (esp_img.size > 5000000) {
        mostrarAlerta({
          msg: "La imagen es muy pesada",
          error: true,
        });
        return;
      }
    }

    await submitEspacio(
      { id, esp_nombre, esp_descripcion, esp_img_id, esp_region, esp_acceso }, esp_img );

    setId(null);
    setNombre("");
    setDesc("");
    setRegion("Global");
    setAcceso(true);
  };

  const handleImage = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
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
          Imagen de portada
        </label>
        <div className="flex flex-col justify-between items-center gap-2 ">
          <img
            className="w-[300px] h-[150px] min-w-[200px] min-h-[100px]"
            src={imgPreview}
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
          Nombre del espacio
        </label>
        <input
          className="border w-full p-2 placeholder-gray-400 rounded-md shadow"
          id="nombre"
          type="text"
          value={esp_nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="desc"
        >
          Descripción
        </label>
        <textarea
          id="desc"
          className="border w-full h-36 p-2 rounded-md shadow"
          value={esp_descripcion}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-between items-center">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="region"
          >
            Región
          </label>
          <select
            className="border w-4/5 p-2 rounded-md shadow"
            id="region"
            value={esp_region}
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="region"
          >
            Privacidad
          </label>
          <Switch.Group>
            <div className="flex items-center">
              <Switch
                checked={esp_acceso}
                onChange={() => setAcceso(!esp_acceso)}
                value={esp_acceso}
                className={`
                ${
                  esp_acceso
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } 
                relative inline-flex h-10 w-28 items-center rounded-3xl transition-colors shadow font-bold
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                `}
              >
                <span
                  className={`${
                    esp_acceso ? "translate-x-20 -mr-3" : "translate-x-1 mr-3"
                  } inline-block h-4 w-7 transform rounded-full bg-white transition-transform`}
                />
                {`${esp_acceso ? "Público" : "Privado"}`}
              </Switch>
            </div>
          </Switch.Group>
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
          value={id ? "Actualizar Espacio" : "Crear Espacio"}
          className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
      )}
    </form>
  );
};

export default FormularioEspacio;
