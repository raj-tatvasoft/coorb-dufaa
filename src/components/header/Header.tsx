import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.scss";

export const Header = () => {
  return (
    <AppBar position="fixed" component={"div"} className="headerAppBar">
      <Toolbar className="headerToolBar">
        <Box className="headerLogoBox">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src="/src/assets/logo.svg" alt="logo" />
            <Typography className="headerName" variant="body2">
              Duffa
            </Typography>
          </IconButton>
        </Box>
        <Box className="headerBox">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className="menuIcon"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
