import { useContext } from "react";
import { appContext } from "./appContext";
const useAppContext = () => {
    const context = useContext(appContext);
    return context;
};

export default useAppContext;
