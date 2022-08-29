import { useEffect, useState } from "react";
import PreviewEspacio from "../components/PreviewEspacio";
import useEspacio from "../hooks/useEspacio";

const Espacios = () => {
  const { espacios } = useEspacio();

  return (
    <>
      <h1 className="text-4xl font-black">Espacios</h1>
      <div className=" mt-10 rounded-lg ">
        <div className="mt-10 rounded-lg flex flex-col justify-between gap-2">
          {espacios.length ? (
            espacios.map((espacio) => (
              <PreviewEspacio key={espacio._id} espacio={espacio} />
            ))
          ) : (
            <p className=" text-center text-gray-600 uppercase  p-5">
              No hay espacios aún
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Espacios;
