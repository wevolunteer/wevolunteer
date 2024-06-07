import { createTheme } from "@shopify/restyle";
import { palette } from "./colors";

const theme = createTheme({
  colors: {
    mainText: palette.black,
    secondaryText: palette.gray500,
    accentText: palette.pink500,
    errorText: palette.red500,
    whiteText: palette.white,
    mainBackground: palette.white,
    invertedBackground: palette.black,
    primaryBackground: palette.pink500,
    primaryLightBackground: palette.pink100,
    darkBackground: palette.gray900,
    shadow: palette.gray700,
    lightBorder: palette.gray50,
    mainBorder: palette.gray100,
    disabledBackground: palette.gray100,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    "2xl": 60,
    "3xl": 80,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 16,
    xl: 32,
    full: 9999,
  },
  buttonSizes: {
    s: {
      fontSize: 12,
    },
    m: {
      fontSize: 16,
    },
    l: {
      fontSize: 18,
    },
  },
  buttonVariants: {
    primary: {
      backgroundColor: "primaryBackground",
      borderRadius: "m",
      color: "whiteText",
    },
    secondary: {
      backgroundColor: "primaryLightBackground",
      borderRadius: "m",
      color: "accentText",
    },
    outline: {
      backgroundColor: "mainBackground",
      borderWidth: 1,
      borderColor: "mainBorder",
      color: "mainText",
    },
    ghost: {
      backgroundColor: "mainBackground",
      borderWidth: 1,
      color: "mainText",
    },
    disabled: {
      backgroundColor: "disabledBackground",
      color: "whiteText",
    },
    link: {
      borderWidth: 0,
      backgroundColor: "mainBackground",
      color: "mainText",
      textDecorationLine: "underline",
    },
    default: {
      color: "mainText",
      backgroundColor: "darkBackground",
    },
  },
  textVariants: {
    buttonLabel: {
      fontSize: 16,
      color: "mainBackground",
      fontFamily: "DMSansMedium",
    },
    inputLabel: {
      fontSize: 16,
      fontFamily: "DMSansMedium",
      lineHeight: 17.6,
    },
    header: {
      fontSize: 20,
      fontFamily: "DMSansMedium",
      lineHeight: 24,
    },
    title: {
      fontSize: 16,
      lineHeight: 17.6,
      fontFamily: "DMSansBold",
    },
    body: {
      fontSize: 15,
      lineHeight: 18.8,
      fontFamily: "DMSansRegular",
    },
    link: {
      fontSize: 15,
      lineHeight: 18.8,
      fontFamily: "DMSansMedium",
      fontWeight: "700",
      textDecorationLine: "underline",
    },
    secondary: {
      fontSize: 13,
      lineHeight: 16.9,
      color: "secondaryText",
      fontFamily: "DMSansRegular",
    },
    error: {
      fontSize: 14,
      lineHeight: 16.8,
      fontFamily: "DMSansRegular",
      color: "errorText",
    },
    defaults: {
      fontFamily: "DMSansRegular",
      color: "mainText",
    },
  },
});

export type Theme = typeof theme;
export default theme;
