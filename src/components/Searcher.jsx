import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import useEspacio from "../hooks/useEspacio";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Searcher = () => {
  const [search, setSearch] = useState("");
  const { searcher, handleSearcher, espacios } = useEspacio();

  const navigate = useNavigate()

  const filter = search === '' ? [] : espacios.filter(espacio => espacio.esp_nombre.toLowerCase().includes(search.toLowerCase()))

  return (
    <Transition.Root
      show={searcher}
      as={Fragment}
      afterLeave={() => setSearch("")}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto p-4 xs:mt-56 md:mt-7 lg:mt-10 xl:mt-16 "
        onClose={handleSearcher}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(espacio) => (handleSearcher(), navigate(`/espacios/${espacio._id}`))}
          >
            <div className="relative">
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-4 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Buscar..."
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {filter.length > 0 && (
              <Combobox.Options
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                  {filter.map(espacio => (
                      <Combobox.Option
                        key={espacio._id}
                        value={espacio}
                        className={({active}) => classNames('cursor-default select-none px-4 py-2', active && 'bg-sky-600 text-white')}
                      >
                          {espacio.esp_nombre}
                      </Combobox.Option>
                  ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Searcher;