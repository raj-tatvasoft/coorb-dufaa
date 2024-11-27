import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import StepFrame from "../components/common/StepFrame/StepFrame";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleProductSelect = (val: string) => {
    setSelectedProduct((prev) => (prev === val ? "" : val));
  };
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => {
        return (
          <>
            <div className="products white-header">
              <div className="user-card">
                <p className="hello-user">
                  {t("hello")} {"Mansour,"}
                </p>
                <div className="salary-label">
                  <p>Your salary is:</p>
                  <p className="salary">20,000 SAR</p>
                </div>
                <div className="eligible-label">
                  <img src="/images/Check.svg" alt="" />
                  <p>{t("You'reEligibleForLoan")}</p>
                </div>
              </div>
              <div className="group-label-container">
                <p className="group-label">{t("chooseYourProduct")}</p>
                <div className="loan-calculator">
                  <img src="/images/Calculator.svg" alt="" />
                  <p>{t("loanCalculator")}</p>
                </div>
              </div>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    startIcon={
                      <img
                        src={`${
                          selectedProduct === "Personal Loan"
                            ? "/images/PersonalLoanActive.svg"
                            : "/images/PersonalLoan.svg"
                        }`}
                        alt=""
                      />
                    }
                    fullWidth
                    size="large"
                    variant="contained"
                    className={`product-button ${
                      selectedProduct === "Personal Loan" ? "active" : ""
                    }`}
                    onClick={() => handleProductSelect("Personal Loan")}
                  >
                    {t("personalLoan")}
                  </Button>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    startIcon={
                      <img
                        src={`${
                          selectedProduct === "Re-Financing"
                            ? "/images/ReFinancingActive.svg"
                            : "/images/ReFinancing.svg"
                        }`}
                        alt=""
                      />
                    }
                    fullWidth
                    size="large"
                    variant="contained"
                    className={`product-button ${
                      selectedProduct === "Re-Financing" ? "active" : ""
                    }`}
                    onClick={() => handleProductSelect("Re-Financing")}
                  >
                    {t("reFinancing")}
                  </Button>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    startIcon={
                      <img
                        src={`${
                          selectedProduct === "Auto-Loan"
                            ? "/images/AutoLoanActive.svg"
                            : "/images/AutoLoan.svg"
                        }`}
                        alt=""
                      />
                    }
                    fullWidth
                    size="large"
                    variant="contained"
                    className={`product-button ${
                      selectedProduct === "Auto-Loan" ? "active" : ""
                    }`}
                    onClick={() => handleProductSelect("Auto-Loan")}
                  >
                    {t("Auto-Loan")}
                  </Button>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    startIcon={
                      <img
                        src={`${
                          selectedProduct === "Retail Finance"
                            ? "/images/RetailFinanceActive.svg"
                            : "/images/RetailFinance.svg"
                        }`}
                        alt=""
                      />
                    }
                    fullWidth
                    size="large"
                    variant="contained"
                    className={`product-button ${
                      selectedProduct === "Retail Finance" ? "active" : ""
                    }`}
                    onClick={() => handleProductSelect("Retail Finance")}
                  >
                    {t("Retail Finance")}
                  </Button>
                </Grid>
              </Grid>

              <div className="stepper-container">
                <StepFrame stepCount={6} activeStep={1} />
                <Button
                  variant="contained"
                  fullWidth={false}
                  size="large"
                  endIcon={<img src="/images/ForwardArrow.svg" />}
                  className="next-button"
                  classes={{ disabled: "disable-next" }}
                  disabled={!!!selectedProduct}
                  onClick={() => navigate("/responsible-lending")}
                >
                  {t("continue")}
                </Button>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};
