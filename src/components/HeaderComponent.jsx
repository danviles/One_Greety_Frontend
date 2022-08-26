import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Searcher from "../components/Searcher";
import useEspacio from "../hooks/useEspacio";
import useAuth from "../hooks/useAuth";

const HeaderComponent = () => {

  const { handleSearcher } = useEspacio();
  const { cerrarSesion } = useAuth();

  return (
    <header className="px-4 py-5 bg-white border-b-2">
      <div className="md:flex md:justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <img
            className=" w-10 h-10 p-1 rounded-md border bg-[#ffffff] border-zinc-900"
            src={logo}
            alt="logo"
          />
          <h2 className="text-4xl w-full text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-700 to-rose-500 font-black text-center py-1">
            One Greety
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            // SEARCH
            type="button"
            className="font-bold uppercase border-b border-sky-700 inline-flex gap-2"
            onClick={handleSearcher}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="font-bold">Buscar</p>
          </button>
          <Link
            to={"/espacios"}
            className="font-bold uppercase border-b border-sky-700"
          >
            Espacios
          </Link>
          <button
            type="button"
            className="text-white bg-sky-700 hover:bg-sky-800 p-2 rounded-md uppercase font-bold"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      <Searcher />
    </header>
  );
};

export default HeaderComponent;
