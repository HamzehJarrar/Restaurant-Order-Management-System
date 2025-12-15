import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },

  palette: {
    primary: { main: "#111827" },
    background: { default: "#f3f4f6" },
  },

  shape: {
    borderRadius: 12,
  },
});
