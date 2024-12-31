import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import "./Header.scss";
import i18n from "../../translation/i18n";
import { useTranslation } from "react-i18next";
import { getUserName, handleLogout } from "../../utils/helperFunction";
import { useEffect, useState } from "react";

export const Header = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsLogin(Boolean(getUserName()));
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

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
            className="logoButton"
          >
            <img src="/images/logo.png" alt="logo" className="headerLogo" />
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
        {isLogin && (
          <Box className="headerBox">
            <Button
              className="logoutButton"
              size="large"
              onClick={() => {
                handleLogout();
              }}
            >
              {t("logout")}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
