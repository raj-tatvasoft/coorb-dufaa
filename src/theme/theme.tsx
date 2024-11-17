import { createTheme } from "@mui/material/styles";
import i18n from "../translation/i18n";

const theme = createTheme({
  direction: i18n.dir() === "rtl" ? "rtl" : "ltr",
  palette: {
    primary: {
      main: "#244b62",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "rgb(247, 247, 247)",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "14px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "14px",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          backgroundColor: "#e3f2fd",
          padding: "5px",
          height: "100%",
          width: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "-webkit-fill-available",
          borderRadius: "14px 0 0 14px",
          marginLeft: "-14px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "16px",
        },
      },
    },
  },
});

export default theme;
