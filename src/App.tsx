import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./translation/i18n";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme.tsx";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

import "react-datepicker/dist/react-datepicker.css";
import { NotFound } from "./pages/NotFound.tsx";

import { useTranslation } from "react-i18next";
import Loader from "./components/common/Loader.tsx";
import { Home } from "./pages/Home.tsx";
import { Layout } from "./components/layout/Layout.tsx";
import { DynamicForm } from "./pages/DynamicHome.tsx";

function App() {
  const { i18n } = useTranslation();

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: i18n.language === "ar" ? [prefixer, rtlPlugin] : [prefixer],
  });
  return (
    <>
      <Loader />
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<DynamicForm />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className="toast"
          />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default App;
