import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { Button, createTheme, ThemeProvider as MUIThemePrivider } from "@mui/material";
import "./App.css";
import GlobalStyle from "./globalStyle";
import AppRouter from "./router/App.router";
import { ThemeContext } from "./context/ThemeContext";
import { darkThemeStyledComponents, lightThemeStyledComponents } from "./Themes";
import { UserContextProvider } from "./context/UserContext";

function App() {
    const { currentTheme } = useContext(ThemeContext);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: "light",
        },
    });

    return (
        <>
            <UserContextProvider>
                <StyledThemeProvider
                    theme={currentTheme === "light" ? lightThemeStyledComponents : darkThemeStyledComponents}
                >
                    <MUIThemePrivider theme={currentTheme === "light" ? lightTheme : darkTheme}>
                        <AppRouter />
                        <GlobalStyle />
                        <ToastContainer />
                        <div>App {currentTheme}</div>
                        <Button variant="contained">MUI BUTTON</Button>
                    </MUIThemePrivider>
                </StyledThemeProvider>
            </UserContextProvider>
        </>
    );
}

export default App;
