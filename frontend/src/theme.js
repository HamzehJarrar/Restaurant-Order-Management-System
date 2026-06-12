import { createTheme } from "@mui/material/styles";

const INTER   = ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"].join(",");
const JAKARTA = ["Plus Jakarta Sans", "Inter", "sans-serif"].join(",");

export const theme = createTheme({
  /* ── Typography ──────────────────────────────────────── */
  typography: {
    fontFamily: INTER,
    h1: { fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-0.03em" },
    h2: { fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-0.025em" },
    h3: { fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.018em" },
    h5: { fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.01em" },
    h6: { fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.01em" },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: "none", letterSpacing: "0" },
    caption: { fontWeight: 500, letterSpacing: "0.01em" },
  },

  /* ── Palette ─────────────────────────────────────────── */
  palette: {
    mode: "light",
    primary: {
      main:  "#0f172a",
      light: "#1e293b",
      dark:  "#020617",
      contrastText: "#ffffff",
    },
    secondary: {
      main:  "#f97316",
      light: "#fb923c",
      dark:  "#ea6c0a",
      contrastText: "#ffffff",
    },
    success: {
      main:  "#16a34a",
      light: "#22c55e",
      dark:  "#15803d",
    },
    error: {
      main:  "#dc2626",
      light: "#f87171",
      dark:  "#b91c1c",
    },
    info: {
      main:  "#0ea5e9",
      light: "#38bdf8",
      dark:  "#0284c7",
    },
    warning: {
      main:  "#f59e0b",
      light: "#fbbf24",
      dark:  "#d97706",
    },
    background: {
      default: "#f4f5f7",
      paper:   "#ffffff",
    },
    text: {
      primary:   "#0d1117",
      secondary: "#6b7280",
      disabled:  "#9ca3af",
    },
    divider: "rgba(0,0,0,0.07)",
  },

  /* ── Shape ───────────────────────────────────────────── */
  shape: { borderRadius: 12 },

  /* ── Shadows ─────────────────────────────────────────── */
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    "0 2px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
    "0 4px 16px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)",
    "0 8px 24px rgba(0,0,0,0.08), 0 3px 8px rgba(0,0,0,0.04)",
    "0 12px 32px rgba(0,0,0,0.09), 0 4px 10px rgba(0,0,0,0.04)",
    "0 16px 40px rgba(0,0,0,0.1),  0 6px 14px rgba(0,0,0,0.05)",
    "0 20px 48px rgba(0,0,0,0.11), 0 8px 18px rgba(0,0,0,0.05)",
    "0 24px 56px rgba(0,0,0,0.12), 0 10px 22px rgba(0,0,0,0.06)",
    ...Array(17).fill("0 24px 56px rgba(0,0,0,0.12)"),
  ],

  /* ── Components ──────────────────────────────────────── */
  components: {
    /* AppBar */
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          color: "#0d1117",
        },
      },
    },

    /* Button */
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
          paddingInline: 16,
          paddingBlock: 8,
          fontSize: 14,
          transition: "all 0.15s ease",
        },
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: "0 4px 14px rgba(0,0,0,0.15)" },
        },
        outlined: {
          borderColor: "rgba(0,0,0,0.12)",
          "&:hover": { borderColor: "rgba(0,0,0,0.24)", backgroundColor: "rgba(0,0,0,0.02)" },
        },
      },
    },

    /* Card */
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          backgroundImage: "none",
        },
      },
    },

    /* Paper */
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: "none",
        },
        elevation1: { boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
        elevation2: { boxShadow: "0 4px 16px rgba(0,0,0,0.07)" },
        elevation3: { boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
      },
    },

    /* TextField */
    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "#ffffff",
            fontSize: 14,
            "& fieldset": { borderColor: "rgba(0,0,0,0.1)" },
            "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" },
            "&.Mui-focused fieldset": { borderColor: "#f97316", borderWidth: "1.5px" },
          },
          "& .MuiInputLabel-root": { fontSize: 14 },
        },
      },
    },

    /* Chip */
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
          fontSize: 12,
        },
        filled: {
          "&.MuiChip-colorSecondary": { color: "#ffffff" },
          "&.MuiChip-colorSuccess":   { color: "#ffffff" },
          "&.MuiChip-colorPrimary":   { color: "#ffffff" },
          "&.MuiChip-colorWarning":   { color: "#ffffff" },
          "&.MuiChip-colorError":     { color: "#ffffff" },
        },
      },
    },

    /* Dialog */
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          boxShadow: "0 24px 64px rgba(0,0,0,0.14)",
        },
      },
    },

    /* Tooltip */
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 500,
          backgroundColor: "#0f172a",
          padding: "6px 10px",
        },
        arrow: { color: "#0f172a" },
      },
    },

    /* Divider */
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "rgba(0,0,0,0.06)" },
      },
    },

    /* IconButton */
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "all 0.15s ease",
        },
      },
    },

    /* ListItemButton */
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
  },
});
