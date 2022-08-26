import React from "react";
import useEspacio from "../hooks/useEspacio";
import useAdmin from "../hooks/useAdmin";

const PreviewUsuario = ({ usuario, op, lista, value, color }) => {
  const { usu_nombre, usu_perfil_img } = usuario;
  const { submitListas } = useEspacio();
  const admin = useAdmin();

  const handleSelect = (e) => {
    e.preventDefault();
    submitListas(usuario, op, lista);
  };

  return (
    <div className="h-14  flex justify-between border">
      {/* Listado */}
      <div className="flex justify-between items-center gap-4 px-2">
        <img
          className="rounded-full w-10 h-10"
          src={usu_perfil_img}
          alt="Perfil de usuario"
        />
        <p className="capitalize">{usu_nombre}</p>
      </div>
      <div className="flex justify-between items-center gap-4 px-2">
        {admin && (
          <button
            className={`transition-colors rounded-xl text-white p-2 ${
              color ? color : "bg-blue-500 hover:bg-blue-600"
            } `}
            onClick={handleSelect}
          >
            {value ? value : "Seleccionar"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PreviewUsuario;
