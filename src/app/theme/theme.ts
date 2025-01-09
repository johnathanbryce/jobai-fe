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

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0A0F1F",
      paper: "#0A0F1F",
    },
    primary: {
      main: "#00C472",
    },
    success: {
      main: "#00FF88",
    },
    error: {
      main: "#D32F2F",
    },
    text: {
      primary: "#FFFFFF",
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
