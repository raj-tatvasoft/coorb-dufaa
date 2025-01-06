import { useEffect, useMemo, useRef, useState } from "react";
import {
  getFirstPendingWorkflowDetail,
  getUserName,
  handleGenericButtonClick,
  transferTaskObjectForFormValue,
  transferTaskObjectForPayload,
} from "../../utils/helperFunction";
import { IObject, Variable } from "../../service/commonModel";
import { Formik, FormikProps } from "formik";
import { Box, Grid2 } from "@mui/material";
import { TailorLoan, TailorLoanFields } from "../TailorLoan";
import { taskService } from "../../service/task/TaskService";
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
import { CONST_WORDS, yup } from "../../utils/constant";
import InputTextField from "../../components/common/InputTextField";
import { ApplyLoanSuccess } from "./ApplyLoanSuccess";
import { regex } from "../../utils/regex";
import { errorToast } from "../../components/common/ToastMsg";

export type FinanceRequestSimulationStep =
  | "Tailor Loan"
  | "Product"
  | "Salary Review"
  | "Expenses"
  | "SimahAuthSuccess"
  | "Accept Loan"
  | "Commodity"
  | "Documents"
  | "financeCalculator"
  | "Update Salary"
  | "ApplyLoanSuccessFeedback";

export const FinanceRequestSimulationFields = {
  sendToQararBtn: "send_to_qarar_button",
  commodityType: "commodity_type",
  commodityPurchaseBtn: "commidity_purchase_button",
  validateDocSigningOtpBtn: "validate_doc_signing_otp",
  docSigningOtp: "doc_signing_otp",
  qararScore: "qarar_score",
  totalExpenses: "total_expenses",
  numberOfDependents: "number_of_dependents",
  userEnteredSalary: "user_entered_salary",
};

const FinanceRequestSimulation = () => {
  const [initValues, setInitValues] = useState<IObject>({});
  const [isCommodityPurchased, setIsCommodityPurchased] =
    useState<boolean>(false);
  const [step, setStep] = useState<FinanceRequestSimulationStep>("Product");
  const [groupedVariables, setGroupedVariables] = useState<IObject>({});
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
    const lastPage = localStorage.getItem(
      CONST_WORDS.lastActivePage + "_" + getUserName()
    ) as FinanceRequestSimulationStep;
    if (lastPage) setStep(lastPage);
  }, []);

  useEffect(() => {
    if (step) {
      updateLastActivePage();
    }
  }, [step]);

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

  const ExpensesValidationSchema = yup.object().shape(
    step === "Expenses" && groupedVariables?.["Expenses"]
      ? Object.values(groupedVariables["Expenses"]).reduce(
          (acc: IObject, obj: any) => {
            if (
              obj.i18nName !== FinanceRequestSimulationFields.totalExpenses &&
              obj.i18nName !== FinanceRequestSimulationFields.numberOfDependents
            )
              acc[obj.i18nName] = yup
                .string()
                .required(`${t(obj.i18nName)} ${t("isRequired")}`)
                .matches(
                  regex.Expenses,
                  `${t(obj.i18nName)} ${t("containPositiveValue")}`
                );
            if (
              obj.i18nName === FinanceRequestSimulationFields.numberOfDependents
            )
              acc[obj.i18nName] = yup
                .string()
                .required(`${t(obj.i18nName)} ${t("isRequired")}`)
                .test(
                  "max-allowed",
                  t("maxNumberAllowed", { allowedNo: 10 }),
                  (value: string) => {
                    return Number(value) < 11;
                  }
                )
                .matches(
                  regex.Expenses,
                  `${t(obj.i18nName)} ${t("containPositiveValue")}`
                );

            return acc;
          },
          {}
        )
      : {}
  );

  const UpdateSalaryValidationSchema = yup.object().shape({
    [FinanceRequestSimulationFields.userEnteredSalary]: yup
      .mixed()
      .test(
        "max-allowed",
        t("minSalary", { salaryAmt: 4000 }),
        (value: any) => {
          return Number(value) >= 4000 || !Number(value);
        }
      ),
  });

  const saveWorkflowTaskDetail = () => {
    if (formRef.current?.values?.initialDetails)
      taskService.save(transferTaskObjectForPayload(formRef.current?.values));
  };

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
          // successToast(t("financeSimulationCommitSuccess"));
          setStep("ApplyLoanSuccessFeedback");
        }
      }
    });
  };

  const handleNextStep = async () => {
    setIsCommodityPurchased(false);
    if (step && step !== "Update Salary") saveWorkflowTaskDetail();
    switch (step) {
      case "Product":
        setStep("Tailor Loan");
        break;
      case "Tailor Loan":
        setModalDetail({ isFor: "nafath" });
        break;
      case "Accept Loan":
        setStep("Commodity");
        break;
      case "Salary Review":
        setStep("Expenses");
        break;
      case "Update Salary":
        if (formRef.current) {
          const { validateForm, setTouched } = formRef.current;
          validateForm().then((res) => {
            if (Object.keys(res)?.length) {
              const touchedFields: IObject = {};
              Object.keys(res).forEach((field) => {
                touchedFields[field] = true;
              });
              setTouched(touchedFields);
            } else {
              setStep("Expenses");
              saveWorkflowTaskDetail();
            }
          });
        }
        break;
      case "Expenses":
        handleCloseModal();
        setStep("SimahAuthSuccess");
        break;
      case "SimahAuthSuccess":
        setStep("Accept Loan");
        break;
      case "Commodity":
        setStep("Documents");
        break;
      default:
        break;
    }
  };

  const handleBackStep = () => {
    switch (step) {
      case "financeCalculator":
      case "Tailor Loan":
        setStep("Product");
        break;
      case "Salary Review":
        setStep("Tailor Loan");
        break;
      case "Update Salary":
        setStep("Salary Review");
        break;
      case "Expenses":
        setStep("Salary Review");
        break;
      case "SimahAuthSuccess":
        setStep("Expenses");
        break;
      case "Accept Loan":
        setStep("SimahAuthSuccess");
        break;
      case "Commodity":
        setStep("Accept Loan");
        break;
      case "Documents":
        setStep("Commodity");
        break;
      default:
        break;
    }
  };

  const updateLastActivePage = () => {
    localStorage.setItem(
      CONST_WORDS.lastActivePage + "_" + getUserName(),
      step
    );
  };

  const handleBtnClick = (
    btnName: string,
    isPreventValidation = false,
    isPreventStepChange = false,
    callback?: any, //callback function call
    defaultSetValues?: IObject // values which you need to set to default formik values
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
            let newValues = {
              ...transferTaskObjectForFormValue(data),
              selectedTaskStatus: data.selectedTaskStatus,
              initialDetails: data,
            };
            if (defaultSetValues)
              newValues = { ...newValues, ...defaultSetValues };
            setInitValues(newValues);
            if (step === "Expenses") {
              setModalDetail({ isFor: "simah" });
            }
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
      case "Accept Loan":
        return (
          <TailorLoan
            eligibleTitle={
              step !== "Accept Loan"
                ? t("tryLoanSimulationUpTo")
                : t("eligibleLoanMessage")
            }
            hideSalaryExpense={step !== "Accept Loan"}
            isDefaultTenureToMaxLoan={step === "Accept Loan"}
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
        return (
          <>
            {renderGroupedDetails()}
            <div className="mt-4">
              <ButtonField
                lbl={"iAmOkWithSalary"}
                handleClick={() => {
                  handleNextStep();
                }}
                name={"iAmOkWithSalary"}
                endIcon="RightBtnArrow.svg"
                variableStyle={{
                  size: "large",
                  bgColor: "var(--btnDarkGreyBg)",
                }}
              />
            </div>
            <div className="mt-2">
              <ButtonField
                lbl={"iAmNotOkWithSalary"}
                handleClick={() => {
                  setStep("Update Salary");
                }}
                name={"iAmNotOkWithSalary"}
                endIcon="RightBtnArrow.svg"
                variableStyle={{
                  size: "large",
                  bgColor: "var(--btnDarkGreyBg)",
                }}
              />
            </div>
          </>
        );
      case "Expenses":
      case "Update Salary":
        return (
          <>
            {renderGroupedDetails()}
            <div className="mt-4">
              <ButtonField
                lbl={"next"}
                handleClick={() => {
                  if (step === "Expenses") {
                    handleBtnClick(
                      FinanceRequestSimulationFields.sendToQararBtn,
                      false,
                      true,
                      null,
                      {
                        [SimahAuthModalFields.SIMAHCheckbox]: true,
                      }
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
                    true,
                    () => {
                      setIsCommodityPurchased(true);
                    }
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
                  if (isCommodityPurchased) handleNextStep();
                  else errorToast(t("plsPurchaseCommodityFirst"));
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
      case "ApplyLoanSuccessFeedback":
        return (
          <ApplyLoanSuccess
            handleGoHome={() => {
              formRef.current?.setValues({});
              setStep("Product");
            }}
          />
        );
      default:
        return <></>;
    }
  }, [step, initValues]);

  const handleCloseModal = () => {
    setModalDetail({ isFor: "" });
  };

  const renderPageTitle = () => {
    let pageTitle = "";
    switch (step) {
      case "Salary Review":
      case "Update Salary":
      case "Expenses":
      case "Commodity":
      case "Documents":
        pageTitle = step;
        break;

      default:
        break;
    }
    return pageTitle ? (
      <Grid2 size={{ xs: 12 }} className="stepLabel">
        <p className="stepTitle">{pageTitle}</p>
      </Grid2>
    ) : (
      <></>
    );
  };

  return (
    <Box className="wrapper">
      {renderPageTitle()}
      <Formik
        initialValues={initValues}
        validationSchema={
          modalDetail.isFor === "simah"
            ? simahLoanSchema
            : step === "Tailor Loan"
            ? loanTailorSchema
            : step === "Commodity"
            ? commodityValidationSchema
            : step === "Expenses"
            ? ExpensesValidationSchema
            : step === "Update Salary"
            ? UpdateSalaryValidationSchema
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
              {!["Product", "ApplyLoanSuccessFeedback"].find(
                (x) => x === step
              ) && (
                <div className="mt-2">
                  <ButtonField
                    lbl={"back"}
                    handleClick={() => {
                      handleBackStep();
                    }}
                    name={"Back"}
                    variableStyle={{
                      size: "large",
                      bgColor: "var(--btnDarkGreyBg)",
                    }}
                  />
                </div>
              )}
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
