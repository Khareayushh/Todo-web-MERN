import { createContext } from "react";
const AuthContext = createContext({});
export const MyAuthContext = AuthContext.Provider;
export default AuthContext;