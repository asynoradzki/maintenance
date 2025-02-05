import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { MainContainer } from "./Login.styles";

const Login = () => {
    const { currentTheme, toggleTheme } = useContext(ThemeContext);
    return <MainContainer>Login {currentTheme}</MainContainer>;
};

export default Login;
