import { createContext } from "react";
import SearchForm from "../Components/Form";


export const UserContext = createContext();

const UserProvider = ({ children }) => {
    return <UserContext.Provider value={SearchForm.querystring}>{children}</UserContext.Provider>;
}

export default UserProvider;