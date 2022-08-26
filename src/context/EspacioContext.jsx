import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2/dist/sweetalert2.all";

const EspacioContext = createContext();

const EspacioProvider = ({ children }) => {
  const [espacios, setEspacios] = useState([]);
  const [espacio, setEspacio] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(true);
  const [cargandocomp, setCargandocomp] = useState(false);
  const [searcher, setSearcher] = useState(false);

  const [modaladdcolab, setModalAddColab] = useState(false);
  const [modalbuscarcolab, setModalBuscarColab] = useState(false);
  const [modalbuscarpeticion, setModalBuscarPeticion] = useState(false);
  const [modalbuscarbaneado, setModalBuscarBaneado] = useState(false);
  const [modaladdbaneado, setModalAddBaneado] = useState(false);

  const [colaborador, setColaborador] = useState({});
  const [peticion, setPeticion] = useState({});
  const [baneado, setBaneado] = useState({});

  const { auth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    obtenerEspacios();
  }, [auth]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const obtenerEspacios = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get("/espacios", config);
      setEspacios(data);
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearcher = () => {
    setSearcher(!searcher);
  };

  const submitEspacio = async (espacio, img) => {
    if (espacio.id) {
      return await editarEspacio(espacio, img);
    } else {
      return await nuevoEspacio(espacio, img);
    }
  };

  const editarEspacio = async (espacio, img) => {
    setCargandocomp(true);
    console.log(espacio)

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (img !== undefined) {
        let formData = new FormData();
        formData.append("file", img);
        formData.append("imgId", espacio.esp_img_id);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };

        const imageData = await clienteAxios.put("/files", formData, config);
        console.log(imageData);
        espacio.esp_img_portada = imageData.data.url;
        espacio.esp_img_id = imageData.data.publicId;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `espacios/${espacio.id}`,
        espacio,
        config
      );

      const espaciosActualizados = espacios.map((espacioState) =>
        espacioState._id === data.espacio._id ? data.espacio : espacioState
      );
      setEspacios(espaciosActualizados);
      setEspacio({});
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate(`/espacios/${data.espacio._id}`);
      }, 3000);
    } catch (error) {
      setCargandocomp(false);
      console.log(error);
    } finally {
      setCargandocomp(false);
    }
  };

  const eliminarEspacio = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`espacios/${id}`, config);

      const espaciosActualizados = espacios.filter(
        (espacioState) => espacioState._id !== id
      );
      setEspacios(espaciosActualizados);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Espacio eliminado correctamente",
        showConfirmButton: false,
        timer: 1500,
        color: "#595959",
        background: "#ffffff",
      }).then(() => {
        setAlerta({});
        navigate(`/espacios`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoEspacio = async (espacio, img) => {
    setCargandocomp(true);
    let formData = new FormData();
    formData.append("file", img);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const imageData = await clienteAxios.post("/files", formData, config);
      espacio.esp_img_portada = imageData.data.url;
      espacio.esp_img_id = imageData.data.publicId;

      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/espacios", espacio, config);
      setEspacios([...espacios, data.espacio]);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/espacios");
      }, 3000);
    } catch (error) {
      console.log(error);
      setCargandocomp(false);
    } finally {
      setCargandocomp(false);
    }
  };

  const obtenerEspacio = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(`/espacios/${id}`, config);
      setEspacio(data);
      setAlerta({});
    } catch (error) {
      navigate("/espacios");
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } finally {
      setCargando(false);
    }
  };

  const handleModalAddColab = () => {
    setModalAddColab(!modaladdcolab);
    setColaborador({});
  };

  const handleModalBuscarColab = () => {
    setModalBuscarColab(!modalbuscarcolab);
    setColaborador({});
  };

  const handleModalBuscarPeticion = () => {
    setModalBuscarPeticion(!modalbuscarpeticion);
    setPeticion({});
  };

  const handleModalBuscarBaneado = () => {
    setModalBuscarBaneado(!modalbuscarbaneado);
    setBaneado({});
  };

  const handleModalAddBaneado = () => {
    setModalAddBaneado(!modaladdbaneado);
    setColaborador({});
  };

  const submitModalBusqueda = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/espacios/busqueda-usuarios",
        { email },
        config
      );

      setColaborador(data);
      setAlerta({});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
    }
  };

  const submitListas = async (usuarioSelec, op, lista) => {
    switch (lista) {
      case "colaboradores":
        if (op === "add") {
          await agregarColaborador(usuarioSelec);
        }

        if (op === "del") {
          await eliminarColaborador(usuarioSelec);
        }
        break;
      case "peticiones":
        if (op === "all") {
          // await agregarPeticion(usuarioSelec);
        }

        if (op === "del") {
          await eliminarPeticion(usuarioSelec);
        }
        break;
      case "baneos":
        if (op === "add") {
          
        }

        if (op === "del") {
          
        }
        break;
      default:
        break;
    }
  };

  const agregarColaborador = async (usuarioSelec) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/espacios/colaboradores/${espacio._id}`,
        usuarioSelec,
        config
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      espacio.esp_colaboradores = [...espacio.esp_colaboradores, usuarioSelec];

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const eliminarColaborador = async (usuarioSelec) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/espacios/eliminar-colaboradores/${espacio._id}`,
        usuarioSelec,
        config
      );

      const espacioActualizado = { ...espacio };

      espacioActualizado.esp_colaboradores =
        espacioActualizado.esp_colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== usuarioSelec._id
        );

      setEspacio(espacioActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});

      setTimeout(() => {
        setAlerta({});
      
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const rechazarPeticion = async (usuarioSelec) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/espacios/rechazar-peticion/${espacio._id}`,
        usuarioSelec,
        config
      );

      const espacioActualizado = { ...espacio };

      espacioActualizado.esp_peticiones =
        espacioActualizado.esp_peticiones.filter(
          (peticionState) => peticionState._id !== usuarioSelec._id
        );

      setEspacio(espacioActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPeticion({});

      setTimeout(() => {
        setAlerta({});
      
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const aceptarPeticiones = async (usuarioSelec) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.get(
        `/espacios/aceptar-peticiones/${espacio._id}`,
        config
      );

      const espacioActualizado = { ...espacio };

      espacioActualizado.esp_peticiones = [];
      espacioActualizado.esp_seguidores = [...espacioActualizado.esp_seguidores, usuarioSelec];

      console.log('llego aqui')
      setEspacio(espacioActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPeticion({});

      setTimeout(() => {
        setAlerta({});
      
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const aceptarPeticion = async (usuarioSelec) => {

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/espacios/aceptar-peticion/${espacio._id}`,
        usuarioSelec,
        config
      );

      const espacioActualizado = { ...espacio };

      espacioActualizado.esp_peticiones =
        espacioActualizado.esp_peticiones.filter(
          (peticionState) => peticionState._id !== usuarioSelec._id
        );

      espacioActualizado.esp_seguidores = [...espacioActualizado.esp_seguidores, usuarioSelec];

      setEspacio(espacioActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPeticion({});
      setTimeout(() => {
        setAlerta({});
      
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const submitModalBusquedaColab = async (email) => {
    const usu = espacio.esp_colaboradores.find(
      (user) => user.usu_email === email
    );
    if (usu) {
      setColaborador(usu);
    } else {
      setColaborador({});
      setAlerta({
        msg: "No se encuentra el usuario en la lista de colaboradores.",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      
      }, 3000);
    }
  };

  const submitModalBusquedaPeticion = async (email) => {
    const usu = espacio.esp_peticiones.find((user) => user.usu_email === email);
    if (usu) {
      setPeticion(usu);
    } else {
      setPeticion({});
      setAlerta({
        msg: "No se encuentra el usuario en la lista de peticiones.",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      
      }, 3000);
    }
  };

  const submitModalBusquedaBaneado = async (email) => {
    const usu = espacio.esp_baneados.find((user) => user.usu_email === email);
    if (usu) {
      setBaneado(usu);
    } else {
      setBaneado({});
      setAlerta({
        msg: "No se encuentra el usuario en la lista de baneados.",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      
      }, 3000);
    }
  };

  const submitModalAddBaneado = async (email) => {
    
    const usu = espacio.esp_seguidores.find((user) => user.usu_email === email);
    if (usu) {
      setBaneado(usu);
    } else {
      setBaneado({});
      setAlerta({
        msg: "El usuario no es un seguidor del club.",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      
      }, 3000);
    }
  };

  const agregarBaneado = async (usuarioSelec) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/espacios/baneos/${espacio._id}`,
        usuarioSelec,
        config
      );

      const espacioActualizado = { ...espacio };

      espacioActualizado.esp_baneados = [...espacioActualizado.esp_baneados, usuarioSelec];
      espacioActualizado.esp_seguidores =
        espacioActualizado.esp_seguidores.filter(
          (baneadoState) => baneadoState._id !== usuarioSelec._id
        );
      

      setEspacio(espacioActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setBaneado({});

      setTimeout(() => {
        setAlerta({});
      
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarBaneado = async (usuarioSelec) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/espacios/eliminar-baneo/${espacio._id}`,
        usuarioSelec,
        config
      );

      const espacioActualizado = { ...espacio };

      espacioActualizado.esp_baneados =
        espacioActualizado.esp_baneados.filter(
          (baneadoState) => baneadoState._id !== usuarioSelec._id
        );

      setEspacio(espacioActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setBaneado({});

      setTimeout(() => {
        setAlerta({});
      
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <EspacioContext.Provider
      value={{
        espacios,
        espacio,
        alerta,
        cargando,
        cargandocomp,
        searcher,
        modaladdcolab,
        modalbuscarcolab,
        modalbuscarpeticion,
        modalbuscarbaneado,
        modaladdbaneado,
        colaborador,
        peticion,
        baneado,
        handleModalBuscarColab,
        handleModalAddColab,
        handleModalBuscarPeticion,
        handleModalBuscarBaneado,
        handleModalAddBaneado,
        handleSearcher,
        mostrarAlerta,
        obtenerEspacios,
        obtenerEspacio,
        submitEspacio,
        setCargandocomp,
        eliminarEspacio,
        submitModalBusqueda,
        submitModalBusquedaColab,
        submitModalBusquedaPeticion,
        submitModalBusquedaBaneado,
        submitModalAddBaneado,
        agregarColaborador,
        submitListas,
        aceptarPeticiones,
        aceptarPeticion,
        rechazarPeticion,
        agregarBaneado,
        eliminarBaneado
      }}
    >
      {children}
    </EspacioContext.Provider>
  );
};

export { EspacioProvider };

export default EspacioContext;
