"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

//  color palette:
// - Primary Background: #0A0F1F
// - Accent Color (primary): #00C472
// - Success Color: #00FF88
// - Error Color: #D32F2F
// - Font Color (text): #FFFFFF

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

/**
 * Extend the MUI Palette interface to include a custom "button" property.
 */
declare module "@mui/material/styles" {
  interface Palette {
    button: Palette["primary"];
  }
  interface PaletteOptions {
    button?: PaletteOptions["primary"];
  }
}

// TypeScript for custom themes/colors:
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    button: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0A0F1F", // Primary Background
      paper: "#0A0F1F",
    },
    primary: {
      main: "#00C472", // Accent Color
    },
    success: {
      main: "#00FF88", // Success Color
    },
    error: {
      main: "#D32F2F", // Error Color
    },
    text: {
      primary: "#FFFFFF", // Font Color
    },
    //
    // Custom Colors & Overrides:
    //
    button: {
      main: "#001f3f",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    allVariants: {
      color: "#FFFFFF",
    },
  },
});

export default theme;
