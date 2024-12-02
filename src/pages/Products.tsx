import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { camelToPascal } from "../utils/helperFunction";
import ButtonField from "../components/common/ButtonField";

const ProductBtnName = {
  personalLoan: "personalLoan",
  reFinancing: "reFinancing",
  autoLoan: "autoLoan",
  retailFinance: "retailFinance",
};
export const Products = ({
  handleButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
}) => {
  const [selectedProduct, setSelectedProduct] = useState<
    keyof typeof ProductBtnName | ""
  >("");
  const { t } = useTranslation();

  const handleProductSelect = (val: keyof typeof ProductBtnName) => {
    setSelectedProduct((prev) => (prev === val ? "" : val));
  };
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => {
        return (
          <>
            <div className="groupContainer whiteHeader">
              <div className="userCard">
                <p className="helloUser">
                  {t("hello")} {t("Mansour")},
                </p>
                <div className="salaryLabel">
                  <p>{t("yourSalaryIs")}:</p>
                  <p className="salary">20,000 SAR</p>
                </div>
                <div className="eligibleLabel">
                  <img src="/images/Check.svg" alt="" />
                  <p>{t("You'reEligibleForLoan")}</p>
                </div>
              </div>
              <div className="groupLabelContainer">
                <p className="groupLabel">{t("chooseYourProduct")}</p>
                <div className="loanCalculator">
                  <img src="/images/Calculator.svg" alt="" />
                  <p>{t("loanCalculator")}</p>
                </div>
              </div>

              <Grid container spacing={2}>
                {Object.values(ProductBtnName).map((btnName, i: number) => {
                  return (
                    <Grid size={{ xs: 12, sm: 6 }} key={`product-btn-${i}`}>
                      <ButtonField
                        lbl={btnName}
                        handleClick={() => {
                          handleProductSelect(btnName as any);
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
                  );
                })}
              </Grid>

              <div className="stepperContainer">
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
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};