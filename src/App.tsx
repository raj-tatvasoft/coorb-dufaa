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
import { Home } from "./pages/Home/Home.tsx";
import { Layout } from "./components/layout/Layout.tsx";
import { DynamicForm } from "./pages/DynamicHome.tsx";
// import { ResponsibleLending } from "./pages/ResponsibleLending.tsx";
// import { TailorLoan } from "./pages/TailorLoan.tsx";
// import { ReviewLoan } from "./pages/ReviewLoan.tsx";
// import { Congratulations } from "./pages/Congratulations.tsx";
// import { PreviewContract } from "./pages/PreviewContract.tsx";
// import { Products } from "./pages/Products.tsx";

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
                {/* <Route path="/tailor-loan" element={<TailorLoan />} />
                <Route path="/review-loan" element={<ReviewLoan />} />
                <Route path="/preview-contract" element={<PreviewContract />} />
                <Route path="/congratulation" element={<Congratulations />} />
                <Route
                  path="/responsible-lending"
                  element={<ResponsibleLending />}
                /> */}
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
