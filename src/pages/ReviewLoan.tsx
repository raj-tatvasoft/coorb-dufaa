import { Formik } from "formik";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export const ReviewLoan = () => {
  const { t } = useTranslation();

  return (
    <Grid
      spacing={2}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      className={"groupContainer whiteHeader"}
    >
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            <>
              <div className="userCard">
                <p className="helloUser">
                  {t("congratsUser", { user: "Mansour" })}
                </p>
                <div className="salaryExpensesContainer">
                  <div className="label">
                    <p>{t("yourSalaryIs")}:</p>
                    <span>{t("amountWithSAR", { amount: "20,000" })}</span>
                  </div>

                  <div className="label">
                    <p>{t("expenses")}</p>
                    <span>{t("amountWithSAR", { amount: "6,000" })}</span>
                  </div>

                  <div className="label">
                    <p>{t("maxLoanAmount")}</p>
                    <span>{t("amountWithSAR", { amount: "40,000" })}</span>
                  </div>
                </div>
              </div>

              <div className="groupLabelContainer">
                <p className="groupLabel">{t("reviewYourFinalDecision")}</p>
              </div>

              <div className="reviewFinalDecisionCard">
                <div className="loanAmountWrapper">
                  <img src="/images/FinalDecisionThumb.svg" alt="" />
                  <p className="loanAmountLabel">
                    {t("youHaveSettledPersonalLoanAmountOf")}
                  </p>
                  <p className="loanAmount">
                    {t("amountWithSAR", { amount: "28,000" })}
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
                </div>
                <div className="tailorLoanButton">
                  <Button>
                    <img src="/images/Pen.svg" alt="" />
                    <span>{t("tailorLoan")}</span>
                  </Button>
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
                  {t("reviewContract")}
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </Grid>
  );
};
