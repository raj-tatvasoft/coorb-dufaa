import { useEffect, useMemo, useRef, useState } from "react";
import {
  getFirstPendingWorkflowDetail,
  handleGenericButtonClick,
  transferTaskObjectForFormValue,
  transferTaskObjectForPayload,
} from "../../utils/helperFunction";
import { IObject, Variable } from "../../service/commonModel";
import { Formik, FormikProps } from "formik";
import { Box } from "@mui/material";
import { TailorLoan, TailorLoanFields } from "../TailorLoan";
import { taskService } from "../../service/task/TaskService";
import { successToast } from "../../components/common/ToastMsg";
import { t } from "i18next";
import { Products } from "../Products";
import { NafathVerifyModal } from "../../components/dialog/NafathVerifyModal";
import WorkflowFormField from "../../components/common/WorkflowFormField";
import ButtonField from "../../components/common/ButtonField";
import {
  SimahAuthModalFields,
  SIMAHAuthorization,
} from "../../components/dialog/SIMAHAuthorization";
import { Qualify } from "../Qualify";
import { yup } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import InputTextField from "../../components/common/InputTextField";

export type FinanceRequestSimulationStep =
  | "Tailor Loan"
  | "Product"
  | "Salary Review"
  | "Expenses"
  | "SimahAuthSuccess"
  | "Commodity"
  | "Documents"
  | "financeCalculator";

export const FinanceRequestSimulationFields = {
  sendToQararBtn: "send_to_qarar_button",
  commodityType: "commodity_type",
  commodityPurchaseBtn: "commidity_purchase_button",
  validateDocSigningOtpBtn: "validate_doc_signing_otp",
  docSigningOtp: "doc_signing_otp",
  qararScore: "qarar_score",
  totalExpenses: "total_expenses",
};

const FinanceRequestSimulation = () => {
  const navigate = useNavigate();

  const [initValues, setInitValues] = useState<IObject>({});
  const [step, setStep] = useState<FinanceRequestSimulationStep>("Product");
  const [groupedVariables, setGroupedVariables] = useState<IObject>({});
  const [loanSimulatorCount, setLoanSimulatorCount] = useState(0);
  const [currentFlow, setCurrentFlow] = useState<
    "simulateOnly" | "simulateAndRequest" | ""
  >("");
  const [modalDetail, setModalDetail] = useState<{
    isFor: "nafath" | "simah" | "";
  }>({
    isFor: "",
  });

  const formRef = useRef<FormikProps<IObject>>(null);

  useEffect(() => {
    setWorkflowDetail();
  }, []);

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

  const simahLoanSchema = yup.object().shape({
    [SimahAuthModalFields.SIMAHCheckbox]: yup
      .mixed()
      .oneOf([true], `${t("pleaseTickThis")}`)
      .required(t("pleaseTickThis")),
  });

  const commodityValidationSchema = yup.object().shape({
    [FinanceRequestSimulationFields.commodityType]: yup
      .mixed()
      .required(
        t(FinanceRequestSimulationFields.commodityType) + " " + t("isRequired")
      ),
  });

  const setWorkflowDetail = () => {
    getFirstPendingWorkflowDetail().then((res) => {
      if (res) {
        const data = res.data;
        const val: IObject = Object.values(data.statuses)[0];
        const selectedTaskStatus = {
          ...val,
          value: val.id,
          label: t(val.i18nName),
        };
        let newValues: IObject = {
          ...transferTaskObjectForFormValue(data, setGroupedVariables),
          selectedTaskStatus,
          initialDetails: data,
        };
        const btnName = "load_loan_std_min_max";
        let btnVariableId = "";
        Object.values(newValues?.initialDetails?.variables).forEach(
          (variable: any) => {
            if (variable.i18nName === btnName && !btnVariableId) {
              btnVariableId = variable.id;
            }
          }
        );
        if (btnVariableId) {
          taskService
            .buttonClick({
              buttonVarialeId: btnVariableId,
              task: transferTaskObjectForPayload(newValues),
            })
            .then((btnRes) => {
              if (btnRes?.data) {
                newValues = {
                  ...transferTaskObjectForFormValue(
                    btnRes.data,
                    setGroupedVariables
                  ),
                  selectedTaskStatus,
                  initialDetails: data,
                };

                setInitValues(newValues);
                setCurrentFlow("simulateOnly");
              }
            });
        } else {
          setInitValues(newValues);
          setCurrentFlow("simulateAndRequest");
        }
      }
    });
  };

  const handleCommitTask = () => {
    const payload = transferTaskObjectForPayload(
      formRef.current?.values as IObject
    );
    taskService.commit(payload).then((res) => {
      if (res) {
        if (currentFlow === "simulateOnly") {
          setWorkflowDetail();
          setModalDetail({ isFor: "nafath" });
        } else {
          successToast(t("financeSimulationCommitSuccess"));
          navigate("/login");
        }
      }
    });
  };

  const handleNextStep = async () => {
    switch (step) {
      case "Product":
        setLoanSimulatorCount(1);
        setStep("Tailor Loan");
        break;
      case "Tailor Loan":
        if (loanSimulatorCount === 1) setModalDetail({ isFor: "nafath" });
        else setStep("Commodity");
        break;
      case "Salary Review":
        setStep("Expenses");
        break;
      case "Expenses":
        handleCloseModal();
        setStep("SimahAuthSuccess");
        break;
      case "SimahAuthSuccess":
        setLoanSimulatorCount(2);
        setStep("Tailor Loan");
        break;
      case "Commodity":
        setStep("Documents");
        break;
      default:
        break;
    }
  };

  const handleBtnClick = (
    btnName: string,
    isPreventValidation = false,
    isPreventStepChange = false,
    callback?: any //callback function call
  ) => {
    if (formRef.current) {
      const { validateForm, setTouched, values } = formRef.current;
      validateForm().then((res) => {
        if (Object.keys(res)?.length && !isPreventValidation) {
          const touchedFields: IObject = {};
          Object.keys(res).forEach((field) => {
            touchedFields[field] = true;
          });
          setTouched(touchedFields);
        } else {
          handleGenericButtonClick(values, btnName, (data: any) => {
            const newValues = {
              ...transferTaskObjectForFormValue(data),
              selectedTaskStatus: data.selectedTaskStatus,
              initialDetails: data,
            };
            setInitValues(newValues);
            if (!isPreventStepChange)
              setTimeout(() => {
                handleNextStep();
              }, 0);

            if (callback) {
              callback(newValues);
            }
          });
        }
      });
    }
  };

  const renderGroupedDetails = () => {
    return groupedVariables[step]?.map((variable: Variable, i: number) => {
      return (
        <div className="mt-4" key={`finance-request-field-${i}`}>
          <WorkflowFormField
            {...variable}
            groupedVariables={groupedVariables}
            handleBtnClick={() => {}}
            currentStepIndex={0}
            hideFieldNames={[
              FinanceRequestSimulationFields.sendToQararBtn,
              FinanceRequestSimulationFields.commodityPurchaseBtn,
              FinanceRequestSimulationFields.validateDocSigningOtpBtn,
              FinanceRequestSimulationFields.qararScore,
              FinanceRequestSimulationFields.totalExpenses,
              FinanceRequestSimulationFields.docSigningOtp,
            ]}
            renamedLbl={{
              [FinanceRequestSimulationFields.commodityType]: "chooseCommodity",
            }}
            showLbl
          />
        </div>
      );
    });
  };

  const renderStepContent = useMemo(() => {
    switch (step) {
      case "Tailor Loan":
      case "financeCalculator":
        return (
          <TailorLoan
            eligibleTitle={t("tryLoanSimulationUpTo")}
            hideSalaryExpense={loanSimulatorCount !== 2}
            handleBtnClick={() => {
              if (step === "financeCalculator") {
                setStep("Product");
              } else {
                if (currentFlow === "simulateOnly") handleCommitTask();
                else handleNextStep();
              }
            }}
            hideApplyBtn={step === "financeCalculator"}
          />
        );
      case "Product":
        return (
          <Products
            handleNextStep={handleNextStep}
            eligibleTitle={t("tryLoanSimulation")}
            hideSalary
            onClickFinanceCalc={() => setStep("financeCalculator")}
          />
        );
      case "Salary Review":
      case "Expenses":
        return (
          <>
            {renderGroupedDetails()}
            <div className="mt-4">
              <ButtonField
                lbl={"next"}
                handleClick={() => {
                  if (step === "Expenses") {
                    setModalDetail({ isFor: "simah" });
                    handleBtnClick(
                      FinanceRequestSimulationFields.sendToQararBtn,
                      true,
                      true
                    );
                  } else {
                    handleNextStep();
                  }
                }}
                name={FinanceRequestSimulationFields.sendToQararBtn}
                endIcon="RightBtnArrow.svg"
                variableStyle={{
                  size: "large",
                  bgColor: "var(--btnDarkGreyBg)",
                }}
              />
            </div>
          </>
        );
      case "Commodity":
        return (
          <>
            {renderGroupedDetails()}
            <div className="mt-4">
              <ButtonField
                lbl={FinanceRequestSimulationFields.commodityPurchaseBtn}
                handleClick={() => {
                  handleBtnClick(
                    FinanceRequestSimulationFields.commodityPurchaseBtn,
                    false,
                    true
                  );
                }}
                name={FinanceRequestSimulationFields.commodityPurchaseBtn}
                variableStyle={{
                  size: "large",
                  bgColor: "var(--btnDarkGreyBg)",
                }}
              />
            </div>
            <div className="mt-2">
              <ButtonField
                lbl={"next"}
                handleClick={() => {
                  handleNextStep();
                }}
                name={FinanceRequestSimulationFields.commodityPurchaseBtn}
                endIcon="RightBtnArrow.svg"
                variableStyle={{
                  size: "large",
                  bgColor: "var(--btnDarkGreyBg)",
                }}
              />
            </div>
          </>
        );
      case "Documents":
        return (
          <>
            {renderGroupedDetails()}
            <div className="flex flex-col gap-2">
              <InputTextField
                name={FinanceRequestSimulationFields.docSigningOtp}
                placeholder={FinanceRequestSimulationFields.docSigningOtp}
                showLbl={true}
                lbl={FinanceRequestSimulationFields.docSigningOtp}
              />

              <div className="mt-4 flex flex-col gap-2">
                <ButtonField
                  lbl={FinanceRequestSimulationFields.validateDocSigningOtpBtn}
                  handleClick={() => {
                    handleBtnClick(
                      FinanceRequestSimulationFields.validateDocSigningOtpBtn,
                      false,
                      true
                    );
                  }}
                  name={FinanceRequestSimulationFields.validateDocSigningOtpBtn}
                  variableStyle={{
                    size: "large",
                    bgColor: "var(--btnDarkGreyBg)",
                  }}
                />
                <ButtonField
                  lbl={"Submit"}
                  handleClick={() => {
                    handleCommitTask();
                  }}
                  name={"Submit"}
                  variableStyle={{
                    size: "large",
                    bgColor: "var(--btnDarkGreyBg)",
                  }}
                />
              </div>
            </div>
          </>
        );
      case "SimahAuthSuccess":
        return <Qualify handleButtonClick={handleNextStep} />;
      default:
        <></>;
        break;
    }
  }, [step]);

  const handleCloseModal = () => {
    setModalDetail({ isFor: "" });
  };

  // const renderPageTitle = () => {
  //   let pageTitle = "";
  //   switch (step) {
  //     case "Salary Review":
  //       pageTitle = "Salary Review";
  //       break;

  //     default:
  //       break;
  //   }
  //   return (
  //     <Grid2 size={{ xs: 12 }} className="stepLabel">
  //       <p className="stepTitle">{step}</p>
  //     </Grid2>
  //   );
  // };

  return (
    <Box className="wrapper">
      {/* {renderPageTitle()} */}
      <Formik
        initialValues={initValues}
        validationSchema={
          // eslint-disable-next-line no-constant-condition
          false
            ? modalDetail.isFor === "simah"
              ? simahLoanSchema
              : step === "Tailor Loan"
              ? loanTailorSchema
              : step === "Commodity"
              ? commodityValidationSchema
              : null
            : null
        }
        onSubmit={() => {}}
        enableReinitialize
        innerRef={formRef}
      >
        {({ handleSubmit }) => {
          return (
            <form className="workflowDetailWrapper" onSubmit={handleSubmit}>
              {renderStepContent}
              {modalDetail.isFor === "nafath" ? (
                <NafathVerifyModal
                  handleClose={handleCloseModal}
                  open={true}
                  handleVerifyCode={() => {
                    setStep("Salary Review");
                    handleCloseModal();
                  }}
                />
              ) : modalDetail.isFor === "simah" ? (
                <SIMAHAuthorization
                  handleClose={handleCloseModal}
                  open={true}
                  handleContinue={handleNextStep}
                />
              ) : (
                <></>
              )}
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default FinanceRequestSimulation;
