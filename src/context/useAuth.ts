import { useContext } from "react";
import AuthContext from "./authcontext";

const useAuth = () => {
    const data = useContext(AuthContext);
    return data;
}
export default useAuth;