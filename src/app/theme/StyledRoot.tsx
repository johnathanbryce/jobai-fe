"use client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";

export function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* CSS reset + Global Theme Styles */}
      {children}
    </ThemeProvider>
  );
}
