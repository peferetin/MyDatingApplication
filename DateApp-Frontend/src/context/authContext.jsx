import { createContext, useState } from "react";

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false)

    const login = () => setIsLoggedIn(true)
    const logout = () => setIsLoggedIn(false)

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }} >
            {children}
        </AuthContext.Provider>
    )

}