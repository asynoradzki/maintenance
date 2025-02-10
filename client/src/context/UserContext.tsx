import { createContext, useCallback, useEffect, useState } from "react";
import { UserContextType } from "../model/UserContextType";
import { UserFromToken } from "../model/UserFromToken";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constants";

const defaultSettings: UserContextType = {
    currentUser: null,
    login: () => {},
    logout: () => {},
};

export const UserContext = createContext<UserContextType>(defaultSettings);

export function UserContextProvider({ children }: React.PropsWithChildren) {
    const [currentUser, setCurrentUser] = useState<UserFromToken | null>(null);

    const decodeToken = (token: string): UserFromToken | null => {
        try {
            const decoded: UserFromToken = jwtDecode(token);
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                console.warn("Token has expired");
                return null;
            }
            return decoded;
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    };

    // Login function (store token & set user)
    const login = useCallback((token: string) => {
        localStorage.setItem(ACCESS_TOKEN, token);
        const user = decodeToken(token);
        setCurrentUser(user);
    }, []);

    // Logout function (remove token & reset user)
    const logout = useCallback(() => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setCurrentUser(null);
    }, []);

    // Effect to check for a stored token on mount
    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const user = decodeToken(token);
            if (user) {
                setCurrentUser(user);
            } else {
                logout(); // Remove invalid/expired token
            }
        }
    }, [logout]);

    return <UserContext.Provider value={{ currentUser, login, logout }}>{children}</UserContext.Provider>;
}
