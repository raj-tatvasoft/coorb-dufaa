import { createTheme } from "@mui/material/styles";
import i18n from "../translation/i18n";

const theme = createTheme({
  direction: i18n.dir() === "rtl" ? "rtl" : "ltr",
  palette: {
    primary: {
      main: "#cf8702",
    },
    secondary: {
      main: "#f1a100",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: "2.5rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          "--white": "#fff",
          "--textColor": "#1f1f1f",
          "--black": "#000",
          "--primaryColor": "#cf8702",
          "--secondaryColor": "#f1a100",
          "--linearBg": "linear-gradient(90deg, #FFCE72 0%, #F6B333 100%)",
          "--endromentBgColor": "#ffebc7",
          "--endromentColor": "#b67600",
          "--highlightFontColor": "#bd0000",
          "--checkboxText": "#6B5121",
          "--darkRed": "#bd0000",
          "--btnDarkGreyBg": "#1F1F1F",
          "--error": "#d32f2f",
          "--radialBg":
            "radial-gradient(100.63% 100.63% at 50% -0.63%,#f1a100 0%,#cf8702 100%)",
          "--linearWhiteGoldBg":
            "linear-gradient(180deg, #FFFFFF 0%, #FFFAF1 81.63%, #FFF6E5 98.35%)",
          "--disabledNext": "#5a5858",
          "--goldenYellow": "#f6b333",
          "--darkBrown": "#342a26",
          "--goldenBrown": "#905e00",
          "--blackBrown": "#261900",
          "--darkWood": "#3d2800",
          "--mediumGray": "#808080",
          "--lightSand": "#ffe3b0",
          "--warmOrange": "#c65600",
          "--fadedWarmOrange": "#c6560099",
          "--violinBrown": "#6e4c00",
          "--pitchBrown": "#3d2000",
          "--goldenOrange": "#f19d00",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "var(--white)",
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
