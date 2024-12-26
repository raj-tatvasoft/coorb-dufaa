import { useEffect, useRef, useState } from "react";
import { IObject, Variable } from "../../service/commonModel";
import {
  getFirstPendingWorkflowDetail,
  handleGenericButtonClick,
  transferTaskObjectForFormValue,
  transferTaskObjectForPayload,
} from "../../utils/helperFunction";
import WorkflowFormField from "../../components/common/WorkflowFormField";
import { Formik, FormikProps } from "formik";
import { Box, Grid2 } from "@mui/material";
import ButtonField from "../../components/common/ButtonField";
import { TailorLoan } from "../TailorLoan";
import { yup } from "../../utils/constant";
import { t } from "i18next";
import { taskService } from "../../service/task/TaskService";
import InputTextField from "../../components/common/InputTextField";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../components/common/ToastMsg";

export type FinanceRequestStep = "Work Information" | "Simulation" | "Loan Request";

export const FinanceRequestFields = {
  sendToQararBtn: "send_to_qarar_button",
  commodityType: "commodity_type",
  commodityPurchaseBtn: "commidity_purchase_button",
  validateDocSigningOtpBtn: "validate_doc_signing_otp",
  docSigningOtp: "doc_signing_otp",
  qararScore: "qarar_score",
  totalExpenses: "total_expenses",
};
const FinanceRequest = () => {
  const navigate = useNavigate();

  const [groupedVariables, setGroupedVariables] = useState<IObject>({});
  const [step, setStep] = useState<FinanceRequestStep>("Work Information");
  const [initValues, setInitValues] = useState<IObject>({});

  const formRef = useRef<FormikProps<IObject>>(null);
  const isApiFetch = useRef<any>(null);

  useEffect(() => {
    if (!isApiFetch.current) getWorkflowDetail();
  }, []);

  const getWorkflowDetail = () => {
    isApiFetch.current = true;
    getFirstPendingWorkflowDetail().then((res) => {
      if (res?.data) {
        setInitValues(transferTaskObjectForFormValue(res.data, setGroupedVariables));
      }
    });
  };

  const validationSchema = yup.object().shape({
    [FinanceRequestFields.commodityType]: yup
      .mixed()
      .required(t(FinanceRequestFields.commodityType) + " " + t("isRequired")),
  });

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

  const handleNextStep = () => {
    switch (step) {
      case "Work Information":
        setStep("Simulation");
        break;
      case "Simulation":
        setStep("Loan Request");
        break;
      case "Loan Request":
        navigate("/login");
        break;
      default:
        setStep("Work Information");
        break;
    }
  };

  const handleCommitTask = (val: any) => {
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
          const payload = transferTaskObjectForPayload(val);
          taskService.commit(payload).then((res) => {
            if (res) {
              successToast(t("financeRequestCommitSuccess"));
              handleNextStep();
            }
          });
        }
      });
    }

    // handleNextStep();
  };
  return (
    <Box className="wrapper">
      {step !== "Simulation" && (
        <Grid2 size={{ xs: 12 }} className="stepLabel">
          <p className="stepTitle">
            {step === "Loan Request" ? t("loanRequest") : t("salaryAndExpenses")}
          </p>
        </Grid2>
      )}

      <Formik
        validationSchema={validationSchema}
        initialValues={initValues}
        onSubmit={() => {}}
        enableReinitialize
        innerRef={formRef}
      >
        {({ handleSubmit, values }) => {
          return (
            <form className="workflowDetailWrapper" onSubmit={handleSubmit}>
              {step !== "Simulation" ? (
                <>
                  {groupedVariables[step]?.map((variable: Variable, i: number) => {
                    return (
                      <div className="mt-4" key={`finance-request-field-${i}`}>
                        <WorkflowFormField
                          {...variable}
                          groupedVariables={groupedVariables}
                          handleBtnClick={() => {}}
                          currentStepIndex={0}
                          hideFieldNames={[
                            FinanceRequestFields.sendToQararBtn,
                            FinanceRequestFields.commodityPurchaseBtn,
                            FinanceRequestFields.validateDocSigningOtpBtn,
                            FinanceRequestFields.docSigningOtp,
                            FinanceRequestFields.qararScore,
                            FinanceRequestFields.totalExpenses,
                          ]}
                          renamedLbl={{
                            [FinanceRequestFields.commodityType]: "chooseCommodity",
                          }}
                          showLbl
                        />
                      </div>
                    );
                  })}
                  <div className="mt-4">
                    {step === "Work Information" ? (
                      <ButtonField
                        lbl={"next"}
                        handleClick={() => {
                          handleBtnClick(FinanceRequestFields.sendToQararBtn, true);
                        }}
                        name={FinanceRequestFields.sendToQararBtn}
                        endIcon="RightBtnArrow.svg"
                        variableStyle={{
                          size: "large",
                          bgColor: "var(--btnDarkGreyBg)",
                        }}
                      />
                    ) : (
                      <div className="flex flex-col gap-2">
                        <InputTextField
                          // {...transferredProps}
                          name={FinanceRequestFields.docSigningOtp}
                          placeholder={FinanceRequestFields.docSigningOtp}
                          showLbl={true}
                          lbl={FinanceRequestFields.docSigningOtp}
                        />
                        <ButtonField
                          lbl={FinanceRequestFields.commodityPurchaseBtn}
                          handleClick={() => {
                            handleBtnClick(FinanceRequestFields.commodityPurchaseBtn, false, true);
                          }}
                          name={FinanceRequestFields.commodityPurchaseBtn}
                          variableStyle={{
                            size: "large",
                            bgColor: "var(--btnDarkGreyBg)",
                          }}
                        />{" "}
                        <ButtonField
                          lbl={FinanceRequestFields.validateDocSigningOtpBtn}
                          handleClick={() => {
                            handleBtnClick(
                              FinanceRequestFields.validateDocSigningOtpBtn,
                              false,
                              true
                            );
                          }}
                          name={FinanceRequestFields.validateDocSigningOtpBtn}
                          variableStyle={{
                            size: "large",
                            bgColor: "var(--btnDarkGreyBg)",
                          }}
                        />
                        <ButtonField
                          lbl={"Submit"}
                          handleClick={() => {
                            handleCommitTask(values);
                          }}
                          name={"Submit"}
                          variableStyle={{
                            size: "large",
                            bgColor: "var(--btnDarkGreyBg)",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <TailorLoan
                    handleBtnClick={() => {
                      setStep("Loan Request");
                    }}
                  />
                </>
              )}
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default FinanceRequest;
