import { Formik } from "formik";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Congratulations = () => {
  const { t } = useTranslation();

  return (
    <Grid
      spacing={2}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      className={"groupContainer congratulationGroup"}
    >
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            <>
              <div className="congratulationContainer">
                <div className="congratsMessageContainer">
                  <img src="/images/Thumb.svg" alt="Thumb" />
                  <p className="congratsMessage">
                    {t("congratulationsAndLockedPersonalLoan", {
                      user: "Mansur",
                    })}
                  </p>
                  <p className="loanAmount">
                    {t("amountWithSAR", { amount: "28,000" })}
                  </p>
                </div>

                <div className="activateInfoCard">
                  <img src="images/Mobile.svg" alt="" />
                  <p className="activateInfo">
                    {t("callYouIn24HourForLoanActivation")}
                  </p>
                </div>

                <div className="loanDetailWrapper">
                  <div>
                    <p className="label">{t("monthlyPayment")}</p>
                    <p className="value">
                      {t("amountWithSAR", { amount: "1,667" })}
                    </p>
                  </div>
                  <div>
                    <p className="label">{t("loanTenor")}</p>
                    <p className="value">{t("months", { months: "24" })}</p>
                  </div>
                  <div>
                    <p className="label">{t("firstInstallment")}</p>
                    <p className="value">01/08/2024</p>
                  </div>
                  <div>
                    <p className="label">{t("lastInstallment")}</p>
                    <p className="value">01/80/2026</p>
                  </div>
                  <div>
                    <p className="label">{t("contract")}</p>
                    <p className="download">
                      <img src="/images/Download.svg" alt="" />
                      <span>{t("download")}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="stepperContainer">
                {/* <StepFrame stepCount={6} activeStep={3} /> */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  endIcon={<img src="/images/ForwardArrow.svg" />}
                  className="nextButton"
                >
                  {t("backToHome")}
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </Grid>
  );
};
