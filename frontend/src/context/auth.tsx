import { createContext, useContext, useState } from "react";


export interface IProps {
    children: React.ReactNode;
}

interface AuthContextType{
    auth:boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;

}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: IProps) => {
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuthContext = ( ) => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }

    return context
}