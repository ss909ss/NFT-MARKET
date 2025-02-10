import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContenxt";

interface AuthContextType {
    username: string;
    updateUsername: (newUsername: string) => void;
    token: string | null;
    email: string;
    updateEmail: (newEmail: string) => void;
    avatar: string
}

const AuthContext = createContext<AuthContextType | null>(null);

export const UserInfoProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("")
    console.log(avatar)
    console.log(username)
    const [email, setEmail] = useState("");
    const { token } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;

            try {
                const response = await axios.get("https://nft-market-as0q.onrender.com/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUsername(response.data.data.username || "");
                setEmail(response.data.data.email || "")
                setAvatar(response.data.data.profileImage || "")
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [token]);


    useEffect(() => {
        console.log('Username updated in context:', username);
    }, [username]);

    const updateUsername = async (newUsername: string) => {
        try {
            const response = await axios.put("https://nft-market-as0q.onrender.com/auth/profile",
                { username: newUsername },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });

            setUsername(response.data.data.username);
        } catch (error) {
            console.error("Ошибка при обновлении username:", error);
        }
    };

    const updateEmail = (newEmail: string) => {
        setEmail(newEmail)
    }

    return (
        <AuthContext.Provider value={{ username, updateUsername, token, email, updateEmail, avatar }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useInfo = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};