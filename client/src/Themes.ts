import { white, black } from "./color-definitions";

export interface Theme {
    background: string;
    color: string;
}

export const lightThemeStyledComponents = {
    background: white,
    color: black,
};

export const darkThemeStyledComponents = {
    background: black,
    color: white,
};
