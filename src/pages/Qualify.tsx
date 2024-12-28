import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import { formatWithCommaAndFractionDigits } from "../utils/helperFunction";
import ButtonField from "../components/common/ButtonField";
import { FormikContextType, useFormikContext } from "formik";
import { TailorLoanFields } from "./TailorLoan";
import { IObject } from "../service/commonModel";

export const Qualify = ({
  handleButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
}) => {
  const { t } = useTranslation();

  const { values }: FormikContextType<IObject> = useFormikContext();

  return (
    <Grid
      container
      spacing={2}
      margin={"auto"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={2}
      height={"inherit"}
      className={"groupContainer qualifyStep"}
    >
      <div></div>
      <div className="labelWrapper">
        <p className="qualifyLabel">{t("youQualify")}</p>
        <p className="eligibleMessage">{t("eligibleMessage")}</p>
        <p className="eligibleAmount">
          {t("amountWithSAR", {
            amount: formatWithCommaAndFractionDigits(
              Number(values[TailorLoanFields.loanPrincipalMax])
            ),
          })}
        </p>
      </div>
      <div className="tailorYourFinanceContainer">
        <img src="/images/logo.png" alt="logo" className="Logo" />
        <ButtonField
          name="tailorYourFinance"
          lbl="tailorYourFinance"
          variant="contained"
          variableStyle={{ bgColor: "var(--darkWood)", size: "large" }}
          handleClick={() => handleButtonClick("")}
          className="tailorYourFinanceButton"
        />
      </div>
    </Grid>
  );
};
