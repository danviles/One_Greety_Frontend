import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SidebarComponent = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-5 border-r-2 bg-white">
      <div className="flex flex-wrap justify-center border-b-2">
        <img
          className="rounded-full w-16 h-16"
          src={auth.usu_perfil_img}
          alt="imagen de perfil"
        />
        <p className="text-md font-bold capitalize w-full text-center">
          Bienvenido {auth.usu_nombre}
        </p>
        <Link
          to="editar-perfil"
          className="block text-sm text-sky-700 hover:text-sky-800 text-center"
        >
          Editar perfil
        </Link>
      </div>

      <Link
        to="crear-espacio"
        className="bg-sky-700 hover:bg-sky-800 w-full p-1 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Crear espacio
      </Link>
    </aside>
  );
};

export default SidebarComponent;
