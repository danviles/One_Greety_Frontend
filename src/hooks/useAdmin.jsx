import useEspacio from "./useEspacio";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { espacio } = useEspacio()
    const { auth } = useAuth()
    return espacio.esp_administrador === auth._id
}

export default useAdmin