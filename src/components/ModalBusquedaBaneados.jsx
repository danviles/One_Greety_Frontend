import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useEspacio from "../hooks/useEspacio";
import Alerta from "./AlertaComponent";

const ModalBusquedaBaneados = () => {
  const {
    modalbuscarbaneado,
    handleModalBuscarBaneado,
    submitModalBusquedaBaneado,
    baneado,
    alerta,
    mostrarAlerta,
    eliminarBaneado
  } = useEspacio();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      mostrarAlerta({
        msg: "Ingrese un email valido.",
        error: true,
      });
      return;
    }

    submitModalBusquedaBaneado(email);
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalbuscarbaneado} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalBuscarBaneado}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalBuscarBaneado}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    Buscar usuario
                  </Dialog.Title>

                  <form onSubmit={handleSubmit}>
                    <div className="my-4">
                      <input
                        className="border w-full p-2 placeholder-gray-400 rounded-md shadow"
                        id="email"
                        type="email"
                        placeholder="Email del usuario, ej: usuario@onegreety.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {msg && <Alerta alerta={alerta} />}
                    <input
                      type="submit"
                      value="Buscar"
                      className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
                    />
                  </form>

                  {/* Resultado de la busqueda */}
                  {baneado._id && (
                    <div className="bg-white rounded-md shadow p-2 ">
                      <div className="border-b text-center">
                        <p> Usuario encontrado </p>
                      </div>
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root> 
  );
};

export default ModalBusquedaBaneados;
