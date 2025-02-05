import React, { useContext } from "react";
import { Button, MainContainer } from "./Navbar.styles";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
    const { currentTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <Button onClick={() => toggleTheme()}>Toggle Theme</Button>
            <MainContainer>Navbar {currentTheme}</MainContainer>
        </>
    );
};

export default Navbar;
