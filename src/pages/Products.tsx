import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  camelToPascal,
  formatWithCommaAndFractionDigits,
  getUserName,
  handleGenericButtonClick,
} from "../utils/helperFunction";
import ButtonField from "../components/common/ButtonField";
import { TailorLoanFields } from "./TailorLoan";
import { FormikContextType, useFormikContext } from "formik";
import { IObject } from "../service/commonModel";
import { errorToast } from "../components/common/ToastMsg";

const ProductBtnName = {
  personalLoan: "personalLoan",
  reFinancing: "reFinancing",
  autoLoan: "autoLoan",
  retailFinance: "retailFinance",
  checkIfRegistered: "check_if_registered",
};
export const Products = ({
  handleNextStep,
  eligibleTitle = "",
  hideSalary = false,
  onClickFinanceCalc,
}: {
  handleNextStep: (btnName: string) => void;
  eligibleTitle?: string;
  hideSalary?: boolean;
  onClickFinanceCalc: () => void;
}) => {
  const { values }: FormikContextType<IObject> = useFormikContext();
  const [selectedProduct, setSelectedProduct] = useState<
    keyof typeof ProductBtnName | ""
  >("");
  const { t } = useTranslation();

  const handleProductSelect = (val: keyof typeof ProductBtnName) => {
    setSelectedProduct((prev) => (prev === val ? "" : val));
  };

  const handleCheckIfAlreadyAppliedLoan = (callback: any) => {
    handleGenericButtonClick(
      values,
      ProductBtnName.checkIfRegistered,
      callback
    );
  };

  return (
    <div className="groupContainer whiteHeader">
      <div className="userCard">
        <p className="helloUser">
          {t("hello")} {getUserName()},
        </p>
        {!hideSalary && (
          <div className="salaryLabel">
            <p>{t("yourSalaryIs")}:</p>
            <p className="salary">
              {t("amountWithSAR", {
                amount: formatWithCommaAndFractionDigits(
                  Number(values[TailorLoanFields.gosi_salary])
                ),
              })}
            </p>
          </div>
        )}
        <div className="eligibleLabel">
          <img src="/images/Check.svg" alt="" />
          <p>{eligibleTitle ? eligibleTitle : t("You'reEligibleForLoan")}</p>
        </div>
      </div>
      <div className="groupLabelContainer">
        <p className="groupLabel">{t("chooseYourProduct")}</p>
        <div className="loanCalculator" onClick={onClickFinanceCalc}>
          <img src="/images/Calculator.svg" alt="" />
          <p>{t("loanCalculator")}</p>
        </div>
      </div>

      <Grid container spacing={2}>
        {Object.values(ProductBtnName).map((btnName, i: number) => {
          return (
            btnName !== ProductBtnName.checkIfRegistered && (
              <Grid size={{ xs: 12, sm: 6 }} key={`product-btn-${i}`}>
                <ButtonField
                  lbl={btnName}
                  handleClick={() => {
                    if (values?.initialDetails?.taskInstanceId)
                      handleCheckIfAlreadyAppliedLoan(() => {
                        handleProductSelect(btnName as any);
                        handleNextStep(btnName);
                      });
                    else errorToast(t("apkIsInProcess"));
                  }}
                  readOnly={i > 0 ? 1 : 0}
                  name={btnName}
                  startIcon={
                    selectedProduct === btnName
                      ? `${camelToPascal(btnName)}Active.svg`
                      : `${camelToPascal(btnName)}.svg`
                  }
                  className={`productButton p-0 justify-center ${
                    selectedProduct === btnName ? "active" : ""
                  }`}
                  variableStyle={{
                    size: "large",
                    bgColor: "var(--white)",
                  }}
                />
              </Grid>
            )
          );
        })}
      </Grid>

      {/* <div className="stepperContainer">
        <ButtonField
          lbl={"continue"}
          handleClick={() => {
            handleButtonClick("continue");
          }}
          name={"continue"}
          endIcon="ForwardArrow.svg"
          variableStyle={{
            bgColor: "var(--btnDarkGreyBg)",
            size: "large",
          }}
        />
      </div> */}
    </div>
  );
};
