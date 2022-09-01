import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const [cargandocomp, setCargandocomp] = useState(false);
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
        navigate('/espacios');
      } catch (error) {
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const editarPerfil = async (usuario, img) => {
    setCargandocomp(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (img !== undefined) {
        console.log(img)
        let formData = new FormData();
        formData.append("file", img);
        formData.append("imgId", usuario.usu_img_id);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };

        const imageData = await clienteAxios.put("/files", formData, config);
        usuario.usu_perfil_img = imageData.data.url;
        usuario.usu_img_id = imageData.data.publicId;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/usuarios/perfil/${auth._id}`,
        usuario,
        config
      );

      setAuth(data.usuario);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate(`/espacios`);
      }, 3000);

    } catch (error) {
      setCargandocomp(false);
      console.log(error);
    }
    setCargandocomp(false);
  }

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        cargandocomp,
        alerta,
        setAuth,
        mostrarAlerta,
        editarPerfil,
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
