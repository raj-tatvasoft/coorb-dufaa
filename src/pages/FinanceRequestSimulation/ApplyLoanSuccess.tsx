import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import { formatWithCommaAndFractionDigits } from "../../utils/helperFunction";
import ButtonField from "../../components/common/ButtonField";
import { FormikContextType, useFormikContext } from "formik";
import { TailorLoanFields } from "../TailorLoan";
import { IObject } from "../../service/commonModel";

export const ApplyLoanSuccess = ({
  handleButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
}) => {
  const { t } = useTranslation();

  const { values }: FormikContextType<IObject> = useFormikContext();

  return (
    <Grid
      container
      spacing={4}
      margin={"auto"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={4}
      height={"inherit"}
      className={"groupContainer congratsStep"}
    >
      <div className="labelWrapper">
        <p className="congratsMessage">
          {t("congratsMessage", { user: "Mansour" })}
        </p>
        <p className="lockedFinanceMessage">
          {t("lockedPersonalFinanceMessage")}
        </p>
        <p className="eligibleAmount">
          {t("amountWithSAR", {
            amount: formatWithCommaAndFractionDigits(
              isNaN(Number(values[TailorLoanFields.loanPrincipalMax]))
                ? 0
                : Number(values[TailorLoanFields.loanPrincipalMax])
            ),
          })}
        </p>
      </div>
      <div className="activateInfoCard">
        <img src="images/24Hours.svg" alt="24Hours" />
        <p className="activateInfo">
          {t("amountCreditMessage")} <span>{t("amountCreditTimeMessage")}</span>
          {t("contactCallCenterMessage")}
        </p>
      </div>
      <div className="goHomeBtnWrapper">
        <ButtonField
          name="goHome"
          lbl="goHome"
          variant="contained"
          variableStyle={{ bgColor: "var(--black)", size: "large" }}
          handleClick={() => handleButtonClick("")}
          className="tailorYourFinanceButton"
        />
      </div>
    </Grid>
  );
};
