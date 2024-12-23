import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import ButtonField from "../components/common/ButtonField";

export const PreviewContract = ({
  handleButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Grid
      spacing={2}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      container
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
            <span className="previewContractLabel">{t("previewContract")}</span>
          </div>
        </div>
      </div>

      <div className="stepperContainer">
        <ButtonField
          lbl={"next"}
          handleClick={() => handleButtonClick("signAndComplete")}
          name={"signAndComplete"}
          endIcon="RightBtnArrow.svg"
          variableStyle={{
            size: "large",
            bgColor: "var(--btnDarkGreyBg)",
          }}
        />
      </div>
    </Grid>
  );
};
