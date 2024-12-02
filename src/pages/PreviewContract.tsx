import { Formik } from "formik";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export const PreviewContract = () => {
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

                  <div className="label">
                    <p>{t("personalLoanAmountRequested")}</p>
                    <span>{t("amountWithSAR", { amount: "28,000" })}</span>
                  </div>
                </div>
              </div>

              <div className="groupLabelContainer">
                <p className="groupLabel">{t("reviewSignContract")}</p>
              </div>

              <div className="previewContractContainer">
                <div className="previewContractCard">
                  <img src="/images/Contract.svg" alt="" />
                  <div className="previewContractLabelContainer">
                    <img src="/images/DownloadBrown.svg" alt="" />
                    <span className="previewContractLabel">
                      {t("previewContract")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="stepperContainer">
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  className="nextButton"
                >
                  {t("signAndComplete")}
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </Grid>
  );
};
