import { useContext } from "react";
import "./App.css";
import GlobalStyle from "./globalStyle";
import AppRouter from "./router/App.router";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeContext } from "./context/ThemeContext";
import { Button, createTheme, ThemeProvider as MUIThemePrivider } from "@mui/material";
import { darkThemeStyledComponents, lightThemeStyledComponents } from "./Themes";

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
            <StyledThemeProvider
                theme={currentTheme === "light" ? lightThemeStyledComponents : darkThemeStyledComponents}
            >
                <MUIThemePrivider theme={currentTheme === "light" ? lightTheme : darkTheme}>
                    <AppRouter />
                    <GlobalStyle />
                    <div>App {currentTheme}</div>
                    <Button variant="contained">MUI BUTTON</Button>
                </MUIThemePrivider>
            </StyledThemeProvider>
        </>
    );
}

export default App;
