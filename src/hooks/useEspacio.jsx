import { useContext } from "react";
import EspacioContext from "../context/EspacioContext";

const useEspacio = () => {
  return useContext(EspacioContext);
}

export default useEspacio;