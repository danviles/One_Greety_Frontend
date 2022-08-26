import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormularioEspacio from '../components/FormularioEspacio'
import useEspacio from '../hooks/useEspacio'


const EditarEspacio = () => {

  const { id } = useParams();
  const { espacio, cargando, obtenerEspacio } = useEspacio();

  useEffect(() => {
    obtenerEspacio(id);
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <>
      <h1 className="text-4xl font-black">Editar Espacio: {espacio.esp_nombre}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioEspacio />
      </div>
    </>
  )
}

export default EditarEspacio