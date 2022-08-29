import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/AlertaComponent'

const ConfirmarCuenta = () => {

  const { id } = useParams();
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios.get(`/usuarios/confirmar/${id}`);
        setAlerta({ msg: data.msg, error: false });
        // setTimeout(() => {
        //   navigate('/');
        // }, 3000);
      } catch (error) {
        // setAlerta({ msg: error.response.data.msg, error: true });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    }
    confirmarCuenta();
  }, [])
  

  return (
    <div>
      <h1>Confirmar Cuenta</h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      <p>Vuelve a la app o a la pagina web para iniciar sesión</p>
    </div>
  )
}

export default ConfirmarCuenta