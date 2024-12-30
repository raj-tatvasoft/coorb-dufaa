import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import {
  formatWithCommaAndFractionDigits,
  getUserName,
} from "../../utils/helperFunction";
import ButtonField from "../../components/common/ButtonField";
import { FormikContextType, useFormikContext } from "formik";
import { TailorLoanFields } from "../TailorLoan";
import { IObject } from "../../service/commonModel";

export const ApplyLoanSuccess = ({
  handleGoHome,
}: {
  handleGoHome: () => void;
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
          {t("congratsMessage", { user: getUserName() })}
        </p>
        <p className="lockedFinanceMessage">
          {t("lockedPersonalFinanceMessage")}
        </p>
        <p className="eligibleAmount">
          {t("amountWithSAR", {
            amount: formatWithCommaAndFractionDigits(
              Number(values[TailorLoanFields.loanPrincipalMax])
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
          handleClick={() => handleGoHome()}
          className="tailorYourFinanceButton"
        />
      </div>
    </Grid>
  );
};
