import { Box, Toolbar } from "@mui/material";
import { Header } from "../header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box className="layout-container">
      <Header />
      <Toolbar />
      <Box component="main" className={"main-content"}>
        {children}
      </Box>
    </Box>
  );
};
