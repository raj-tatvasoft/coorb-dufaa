import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import "./Header.scss";
import i18n from "../../translation/i18n";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="fixed" component={"div"} className="headerAppBar">
      <Toolbar className="headerToolBar">
        <Box className="headerLogoBox">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              i18n.changeLanguage("en");
              document.body.dir = "ltr";
            }}
          >
            <img src="/images/logo.svg" alt="logo" />
            <Typography className="headerName" variant="body2">
              {t("duffa")}
            </Typography>
          </IconButton>
        </Box>
        {/* <Box className="headerBox">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className="menuIcon"
            onClick={() => {
              i18n.changeLanguage("ar");
              document.body.dir = "ar" === "ar" ? "rtl" : "ltr";
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};
