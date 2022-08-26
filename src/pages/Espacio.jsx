import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useEspacio from "../hooks/useEspacio";
import { dateFormat } from "../helpers/gestorFechas";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

import PreviewUsuario from "../components/PreviewUsuario";
import ModalBusquedaColab from "../components/ModalBusquedaColab";
import ModalAddColab from "../components/ModalAddColab";
import ModalBusquedaPeticion from "../components/ModalBusquedaPeticion";
import ModalBusquedaBaneados from "../components/ModalBusquedaBaneados";

import {
  AiOutlineEdit,
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineCalendar,
  AiFillHeart,
  AiOutlineDelete,
  AiOutlineSetting,
  AiOutlineFlag,
} from "react-icons/ai";
import ModalAddBaneados from "../components/ModalAddBaneados";

const Espacio = () => {
  const { id } = useParams();
  const admin = useAdmin();
  const {
    espacio,
    cargando,
    obtenerEspacio,
    eliminarEspacio,
    eliminarBaneado,
    handleModalAddColab,
    handleModalBuscarColab,
    handleModalBuscarPeticion,
    handleModalBuscarBaneado,
    handleModalAddBaneado,
    aceptarPeticiones,
    rechazarPeticion,
    aceptarPeticion
  } = useEspacio();
  const { auth } = useAuth();

  useEffect(() => {
    obtenerEspacio(id);
  }, [id]);


  if (cargando) return <p>Cargando...</p>;

  const handleEliminar = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        eliminarEspacio(id);
      }
    });
  };

  return (
    <>
      <h1 className="text-4xl font-black mb-4">Administrar Espacio</h1>

      {/* Informacion de espacio */}
      <div className="border shadow bg-white flex flex-col md:flex-row justify-between items-star gap-1 rounded-r-lg rounded-l-lg">
        <div className="basis-4/12">
          <img
            className="w-auto h-auto min-w-[200px] min-h-[200px]  rounded-l-lg"
            src={espacio.esp_img_portada}
            alt="Imagen del club"
          />
        </div>

        <div className="flex flex-col basis-6/12 ">
          {/* Titulo y Descripcion */}
          <div className="flex flex-col basis-11/12 ">
            <p className="font-bold text-xl">{espacio.esp_nombre}</p>
            <p className="text-ellipsis overflow-hidden">
              {espacio.esp_descripcion?.length > 300
                ? `${espacio.esp_descripcion.substring(0, 330)}...`
                : espacio.esp_descripcion}
            </p>
          </div>
          {/* Tags */}
          <div className="flex flex-col basis-1/12 justify-end mb-1 border-t">
            <div className="flex justify-between gap-2 w-full flex-wrap">
              <p className="inline-flex items-center gap-2 md:px-2 ">
                <AiFillHeart className="text-red-500" />{" "}
                {espacio.esp_seguidores?.length}
              </p>
              <p className="inline-flex items-center gap-2 md:px-2 ">
                <AiOutlineCalendar />
                {dateFormat(espacio.createdAt)}
              </p>
              <p className="inline-flex items-center gap-2 md:px-2 ">
                {espacio.esp_acceso ? (
                  <AiOutlineUnlock className="text-slate-900" />
                ) : (
                  <AiOutlineLock />
                )}
                {espacio.esp_acceso ? "Publico" : "Privado"}
              </p>
              <p className="inline-flex items-center gap-2 md:px-2 ">
                <AiOutlineFlag />
                {espacio.esp_region}
              </p>
            </div>
          </div>
        </div>
        {/* Botones */}
        
        <div className="flex flex-col items-center justify-center basis-2/12 border-l p-2 gap-2">
          <AiOutlineSetting />
          {!admin && (<p>Edición no disponible</p>)}
          <Link
            className={`${!admin && "hidden"} bg-amber-500 transition-colors rounded-xl text-white py-2 hover:bg-amber-600 duration-300 w-full inline-flex items-center justify-center gap-2`}
            to={`/espacios/editar/${id}`}
          >
            <AiOutlineEdit /> Editar
          </Link>
          <button
            className={`${!admin && "hidden"} bg-red-500 transition-colors rounded-xl text-white py-2 hover:bg-red-600 duration-300 w-full inline-flex items-center justify-center gap-2`}
            onClick={handleEliminar}
          >
            <AiOutlineDelete />
            Eliminar
          </button>
        </div>
      </div>
      {/* Listados */}
      <div className="flex justify-between flex-col lg:flex-row my-2 gap-2">
        {/* lista de Colaboradores */}
        <div className="bg-white rounded-md shadow p-2 basis-4/12 ">
          <div className="border-b text-center">
            <p>Colaboradores</p>
          </div>
          <div className="h-72 overflow-y-auto">
            {espacio.esp_colaboradores?.length ? (
              espacio.esp_colaboradores?.map((colaborador) => (
                <PreviewUsuario
                  key={colaborador._id}
                  usuario={colaborador}
                  op={"del"}
                  lista={"colaboradores"}
                  value={"Eliminar"}
                  color={"bg-red-500 hover:bg-red-600"}
                />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                No hay colaboradores en este espacio
              </p>
            )}
          </div>

          <div className="flex justify-center gap-4 items-center pt-2"></div>
          <div className="pt-2 flex justify-between items-center border-t-2 mt-2">
            <button
              className={`${!admin && "hidden"} bg-blue-500 transition-colors rounded-xl text-sm text-white p-2 hover:bg-blue-600 duration-300  inline-flex items-center justify-center gap-2`}
              onClick={handleModalBuscarColab}
            >
              
              Buscar
            </button>

            <button
              className={`${!admin && "hidden"} bg-green-500 transition-colors rounded-xl text-sm text-white p-2 hover:bg-green-600 duration-300  inline-flex items-center justify-center gap-2`}
              onClick={handleModalAddColab}
            >
              Agregar
            </button>
          </div>
        </div>
        {/* Listado */}
        <div className="bg-white rounded-md shadow p-2 basis-4/12 ">
          <div className="border-b text-center">
            <p> Peticiones </p>
          </div>
          <div className="h-72 overflow-y-auto">
            {espacio.esp_peticiones?.length ? (
              espacio.esp_peticiones?.map((peticion) => (
                <div key={peticion._id} className="h-14  flex justify-between border">
                  {/* Listado */}
                  <div className="flex justify-between items-center gap-4 px-2">
                    <img
                      className="rounded-full w-10 h-10"
                      src={peticion.usu_perfil_img}
                      alt="Perfil de usuario"
                    />
                    <p className="capitalize">{peticion.usu_nombre}</p>
                  </div>
                  <div className="flex justify-between items-center gap-1 px-2">
                    <button
                      className={`transition-colors text-white p-2 bg-green-500 hover:bg-green-600"`}
                      onClick={() => aceptarPeticion(peticion)}
                    >
                      Aceptar
                    </button>
                    <button
                      className={`transition-colors text-white p-2 bg-red-500 hover:bg-red-600"`}
                      onClick={() => rechazarPeticion(peticion)} 
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center my-5 p-10">
                No hay peticiones en este espacio
              </p>
            )}
          </div>

          <div className="flex justify-center gap-4 items-center pt-2"></div>
          <div className="pt-2 flex justify-between items-center border-t-2 mt-2">
            <button
              className="bg-blue-500 transition-colors rounded-xl text-sm text-white p-2 hover:bg-blue-600 duration-300  inline-flex items-center justify-center gap-2"
              onClick={handleModalBuscarPeticion}
            >
              
              Buscar
            </button>

            <button
              className="bg-green-500 transition-colors rounded-xl text-sm text-white p-2 hover:bg-green-600 duration-300  inline-flex items-center justify-center gap-2"
              onClick={aceptarPeticiones}
            >
              
              Agregar Todo
            </button>
          </div>
        </div>
        {/* Baneos */}
        <div className="bg-white rounded-md shadow p-2 basis-4/12 ">
          <div className="border-b text-center">
            <p> Baneados </p>
          </div>
          <div className="h-72 overflow-y-auto">
          {espacio.esp_baneados?.length ? (
              espacio.esp_baneados?.map((baneado) => (
                <div key={baneado._id} className="h-14  flex justify-between border">
                  {/* Listado */}
                  <div className="flex justify-between items-center gap-4 px-2">
                    <img
                      className="rounded-full w-10 h-10"
                      src={baneado.usu_perfil_img}
                      alt="Perfil de usuario"
                    />
                    <p className="capitalize">{baneado.usu_nombre}</p>
                  </div>
                  <div className="flex justify-between items-center gap-1 px-2">

                    <button
                      className={`transition-colors text-white p-2 bg-red-500 hover:bg-red-600"`}
                      onClick={() => eliminarBaneado(baneado)} 
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center my-5 p-10">
                No hay baneos en este espacio 
              </p>
            )}
          </div>

          <div className="flex justify-center gap-4 items-center pt-2"></div>
          <div className="pt-2 flex justify-between items-center border-t-2 mt-2">
            <button className="bg-blue-500 transition-colors rounded-xl text-sm text-white p-2 hover:bg-blue-600 duration-300  inline-flex items-center justify-center gap-2"
             onClick={handleModalBuscarBaneado}
            >
              Buscar
            </button>

            <button
              className="bg-green-500 transition-colors rounded-xl text-sm text-white p-2 hover:bg-green-600 duration-300  inline-flex items-center justify-center gap-2"
              onClick={handleModalAddBaneado}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>

      {/* Modales */}
      <ModalAddColab />
      <ModalBusquedaColab />
      <ModalBusquedaPeticion />
      <ModalBusquedaBaneados />
      <ModalAddBaneados />
    </>
  );
};

export default Espacio;

{
  /* <p>espacio nombre: {espacio.espacio.esp_nombre}</p>
      <p>espacio desc: {espacio.espacio.esp_descripcion}</p>
      <p>espacio admin: {espacio.espacio.esp_administrador}</p>
      <p>espacio img: {espacio.espacio.esp_img_portada}</p>
      <p>espacio seguidores: {espacio.espacio.esp_seguidores.length}</p>
      <p>espacio baneados: {espacio.espacio.esp_baneados.length}</p>
      <p>espacio colaboradores: {espacio.espacio.esp_colaboradores.length}</p>
      <p>espacio peticiones: {espacio.espacio.esp_colaboradores.length}</p>
      <p>espacio region: {espacio.espacio.esp_region}</p>
      <p>espacio acceso: {espacio.espacio.esp_acceso ? 'Publico' : 'Privado'}</p>
      <p>espacio createdAt: {espacio.createdAt}</p> */
}
