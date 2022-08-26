import React from "react";
import FormularioEspacio from "../components/FormularioEspacio";

const NuevoEspacio = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Espacio</h1>

      <div className="mt-10 flex justify-center">
        <FormularioEspacio />
      </div>
    </>
  );
};

export default NuevoEspacio;
