import React, { createContext, useState, useCallback } from "react";
import { ThemeContextType } from "../model/ThemeContextType";
import { THEME } from "../constants/constants";

function getThemeFromLocalStorage() {
    const themeFromLocalStorage = localStorage.getItem(THEME) as "light" | "dark" | null;
    return themeFromLocalStorage === "dark" ? "dark" : "light";
}

const defaultSettings: ThemeContextType = {
    currentTheme: getThemeFromLocalStorage(),
    toggleTheme: () => {
        throw new Error("toggleTheme must be used within a ThemeContextProvider");
    },
};

export const ThemeContext = createContext<ThemeContextType>(defaultSettings);

export function ThemeContextProvider({ children }: React.PropsWithChildren) {
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(() => getThemeFromLocalStorage());

    const toggleTheme = useCallback(() => {
        const newTheme: "light" | "dark" = currentTheme === "light" ? "dark" : "light";
        setCurrentTheme(newTheme);
        localStorage.setItem("THEME", newTheme);
    }, [currentTheme]);

    return <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
