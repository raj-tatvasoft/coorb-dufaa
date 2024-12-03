import Grid from "@mui/material/Grid2";
import { FormikContextType, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonField from "../components/common/ButtonField";
import DecimalField from "../components/common/DecimalField";
import { IObject } from "../service/commonModel";

export const ResponsibleLendingFields = {
  numberOfDependents: "numberOfDependents",
  foodExpenses: "foodExpenses",
  educationExpenses: "educationExpenses",
  healthcareExpenses: "healthcareExpenses",
  insuranceExpenses: "insuranceExpenses",
  housingAndServices: "housingAndServices",
  domesticWorkerWages: "domesticWorkerWages",
  transportationAndCommunication: "transportationAndCommunication",
  otherExpenses: "otherExpenses",
  btnContinue: "continue",
};

export const ResponsibleLending = ({
  handleButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
}) => {
  const { t } = useTranslation();
  const { values }: FormikContextType<IObject> = useFormikContext();

  const [expenses, setExpenses] = useState("0.00");

  useEffect(() => {
    if (values) {
      let sum = 0;
      Object.values(ResponsibleLendingFields).forEach((val) => {
        if (val !== ResponsibleLendingFields.numberOfDependents)
          sum = sum + (isNaN(Number(values[val])) ? 0 : Number(values[val]));
      });
      setExpenses(sum.toFixed(2));
    }
  }, [values]);

  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      className={"groupContainer whiteHeader"}
    >
      <div className="userCard">
        <p className="helloUser">{t("helloUser", { user: "Mansour" })}</p>
        <div className="eligibleLabel">
          <img src="/images/Check.svg" alt="" />
          <p>{t("You'reEligibleForLoan")}</p>
        </div>
      </div>
      <div className="groupLabelContainer">
        <p className="groupLabel">{t("responsibleLending")}</p>
        <p className="loanCalculator">
          {t("expenses")} {t("amountWithSAR", { amount: expenses })}
        </p>
      </div>

      <DecimalField
        name={ResponsibleLendingFields.numberOfDependents}
        placeholder={t("numberOfDependents")}
        startIcon={"NumberOfDependents.svg"}
        fractionDigits={0}
      />
      <DecimalField
        name={ResponsibleLendingFields.foodExpenses}
        placeholder={t("foodExpenses")}
        startIcon={"FoodExpenses.svg"}
        endIcon={"SAR.svg"}
      />
      <DecimalField
        name={ResponsibleLendingFields.educationExpenses}
        placeholder={t("educationExpenses")}
        startIcon={"EducationExpenses.svg"}
        endIcon={"SAR.svg"}
      />
      <DecimalField
        name={ResponsibleLendingFields.healthcareExpenses}
        placeholder={t("healthcareExpenses")}
        startIcon={"HealthcareExpenses.svg"}
        endIcon={"SAR.svg"}
      />
      <DecimalField
        name={ResponsibleLendingFields.insuranceExpenses}
        placeholder={t("insuranceExpenses")}
        startIcon={"InsuranceExpenses.svg"}
        endIcon={"SAR.svg"}
      />
      <DecimalField
        name={ResponsibleLendingFields.housingAndServices}
        placeholder={t("housingAndServices")}
        startIcon={"HousingAndServices.svg"}
        endIcon={"SAR.svg"}
      />
      <DecimalField
        name={ResponsibleLendingFields.domesticWorkerWages}
        placeholder={t("domesticWorkerWages")}
        startIcon={"DomesticWorkerWages.svg"}
        endIcon={"SAR.svg"}
      />
      <DecimalField
        name={ResponsibleLendingFields.transportationAndCommunication}
        placeholder={t("transportationAndCommunication")}
        startIcon={"Transportation.svg"}
        endIcon={"SAR.svg"}
      />
      <DecimalField
        name={ResponsibleLendingFields.otherExpenses}
        placeholder={t("otherExpenses")}
        startIcon={"OtherExpenses.svg"}
        endIcon={"SAR.svg"}
      />

      <div className="stepperContainer">
        <ButtonField
          lbl={"continue"}
          handleClick={() =>
            handleButtonClick(ResponsibleLendingFields.btnContinue)
          }
          name={ResponsibleLendingFields.btnContinue}
          endIcon="ForwardArrow.svg"
          variableStyle={{
            bgColor: "var(--btnDarkGreyBg)",
            size: "large",
          }}
        />
      </div>
    </Grid>
  );
};
