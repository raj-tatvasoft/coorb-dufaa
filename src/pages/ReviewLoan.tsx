import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonField from "../components/common/ButtonField";

export const ReviewLoan = ({
  handleButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      spacing={2}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      className={"groupContainer whiteHeader"}
    >
      <div className="userCard">
        <p className="helloUser">{t("congratsUser", { user: "Mansour" })}</p>
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
            <p className="value">{t("amountWithSAR", { amount: "1,667" })}</p>
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
        <ButtonField
          lbl={"reviewContract"}
          handleClick={() => handleButtonClick("reviewContract")}
          name={"reviewContract"}
          endIcon="RightBtnArrow.svg"
          variableStyle={{
            bgColor: "var(--btnDarkGreyBg)",
            size: "large",
          }}
        />
      </div>
    </Grid>
  );
};
