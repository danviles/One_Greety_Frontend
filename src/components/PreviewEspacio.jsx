import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  AiOutlineHeart,
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineCalendar,
  AiFillHeart
} from "react-icons/ai";
import { dateFormat } from "../helpers/gestorFechas";

const PreviewEspacio = ({ espacio }) => {

  const {
    _id,
    esp_nombre,
    esp_descripcion,
    esp_administrador,
    esp_img_portada,
    esp_seguidores,
    esp_acceso,
    createdAt,
  } = espacio;
  const { auth } = useAuth();

  return (
    <div className="border shadow bg-white p-5 flex flex-col md:flex-row md:justify-between items-center gap-3">
      <div className="basis-1/3">
        <img className="w-[300px] h-[150px] min-w-[200px] min-h-[100px]" src={esp_img_portada} alt="Imagen del club" />
      </div>
      <div className="flex flex-col items-start basis-2/3">
        <p className="font-bold text-xl">{esp_nombre}</p>
        <p className="h-20 text-ellipsis overflow-hidden">
          {esp_descripcion?.length > 200
            ? `${esp_descripcion.substring(0, 200)}...`
            : esp_descripcion}
        </p> 

        <div className="flex justify-between gap-2 w-full flex-wrap border-t">
          <p className="inline-flex items-center gap-2 md:px-2">
            <AiFillHeart className="text-red-500" /> {esp_seguidores?.length}
          </p>
          <p className="inline-flex items-center gap-2 md:px-2">
            <AiOutlineCalendar />
            {dateFormat(createdAt)}
          </p>
          <p className="inline-flex items-center gap-2 md:px-2">
            {esp_acceso ? <AiOutlineUnlock className="text-slate-900"/> : <AiOutlineLock />}
            {esp_acceso ? 'Publico' : 'Privado'}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Link
          to={`${_id}`}
          className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold "
        >
          Administrar
        </Link>
        {auth._id !== esp_administrador && (
          <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
            Colaborador
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviewEspacio;
