import React from 'react'
import useAuth from '../hooks/useAuth';
import FormularioEditarPerfil from '../components/FormularioEditarPerfil';

const EditarPerfil = () => {

  const { auth, cargando } = useAuth();

  return (
    <>
      <h1 className="text-4xl font-black">Editar perfil de usuario</h1>

      <div className="mt-10 flex justify-center">
        <FormularioEditarPerfil />
      </div>
    </>
  )
}

export default EditarPerfil