import { DefaultTheme } from "styled-components/native";

declare module "styled-components/native" {
    export interface DefaultTheme {
        primary: string;
        mainBackground: string;
        primaryLight: string;
        warning: string;
        success: string;
        white: string;

        text: string;
        textLight: string;
        background: string;
        backgroundLight: string;
        neutral: string;
        neutralLight: string;
        header: string;
        headerText: string;
    }
}

export const themeCommon = {
    primary: "#ee4037",
    mainBackground: "#fff",
    primaryLight: "#73c3f5",
    warning: "#FF503D",
    success: "#76BA99",
    white: "#fff",
};

export const darkTheme: DefaultTheme = {
    ...themeCommon,
    headerText: "#fff",
    text: "#eee",
    textLight: "#fff",
    background: "#121212",
    backgroundLight: "#413F42",
    neutral: "#403d3a",
    neutralLight: "#1c1c1c",
    header: '#ee4037'
};

export const lightTheme: DefaultTheme = {
    ...themeCommon,
    headerText: "#fff",
    text: "#000",
    textLight: "#413F42",
    background: "#EEEEEE",
    backgroundLight: "#fff",
    neutral: "#D0C9C0",
    neutralLight: "#e3e3e3",
    header: '#ee4037'
};
