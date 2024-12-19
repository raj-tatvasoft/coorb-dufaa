import { Box } from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IObject } from "../../service/commonModel";
import { yup } from "../../utils/constant";
import { getFirstPendingWorkflowDetailAndBtnLoadClick } from "../../utils/helperFunction";
import { Products } from "../Products";
import { TailorLoan, TailorLoanFields } from "../TailorLoan";

export type HomeStep = "product" | "tailorLoan";

export const FinanceSimulation = () => {
  const { t } = useTranslation();

  const formRef = useRef<FormikProps<IObject>>(null);

  const [step, setStep] = useState<HomeStep>("product");
  const [initValues, setInitValues] = useState<IObject>({});

  const loanTailorSchema = yup.object().shape({
    [TailorLoanFields.loanPrincipal]: yup
      .string()
      .required(`${t("amountToBorrow")} ${t("isRequired")}`),
    [TailorLoanFields.loanTenure]: yup
      .string()
      .required(`${t(TailorLoanFields.loanTenure)} ${t("isRequired")}`),
    [TailorLoanFields.listOfLoanProducts]: yup
      .mixed()
      .required(`${t(TailorLoanFields.listOfLoanProducts)} ${t("isRequired")}`),
  });

  const handleNextStep = async () => {
    switch (step) {
      case "product":
        getFirstPendingWorkflowDetailAndBtnLoadClick(
          "load_loan_std_min_max",
          (val) => {
            setInitValues(val);
          }
        );
        setStep("tailorLoan");
        break;
      case "tailorLoan":
        setStep("product");
        break;

      default:
        setStep("product");
        break;
    }
  };

  const renderStepContent = useMemo(() => {
    switch (step) {
      case "product":
        return (
          <Products
            handleNextStep={handleNextStep}
            eligibleTitle={t("tryLoanSimulation")}
            hideSalary
          />
        );
      case "tailorLoan":
        return (
          <TailorLoan
            eligibleTitle={t("tryLoanSimulationUpTo")}
            hideSalaryExpense
            isCommit
          />
        );
      default:
        <></>;
        break;
    }
  }, [step]);

  return (
    <Box className="wrapper">
      <Formik
        initialValues={initValues}
        onSubmit={() => {}}
        validationSchema={step === "tailorLoan" ? loanTailorSchema : null}
        enableReinitialize
        innerRef={formRef}
      >
        {({ handleSubmit }) => {
          return (
            <form className="workflowDetailWrapper" onSubmit={handleSubmit}>
              {renderStepContent}
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};
