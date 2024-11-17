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
import { Formik } from "formik";
import InputTextField from "./components/common/InputTextField.tsx";
import { MailLock } from "@mui/icons-material";

function App() {
  const { i18n } = useTranslation();

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: i18n.language === "ar" ? [prefixer, rtlPlugin] : [prefixer],
  });
  return (
    <div className="p-20">
      <Loader />
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Formik initialValues={{}} onSubmit={() => {}}>
            {() => {
              return (
                <form className="workflowDetailWrapper">
                  <InputTextField
                    name="rajName"
                    placeholder="rajName"
                    startEndroment={<MailLock />}
                  />
                </form>
              );
            }}
          </Formik>
          <Router>
            {/* <Layout> */}
            <Routes>
              <Route path="/" element={<>Demo Page</>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* </Layout> */}
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
    </div>
  );
}

export default App;
