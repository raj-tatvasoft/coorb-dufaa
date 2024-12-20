import { useEffect, useRef, useState } from "react";
import { IObject, Variable } from "../../service/commonModel";
import {
  getFirstPendingWorkflowDetail,
  handleGenericButtonClick,
  transferTaskObjectForFormValue,
} from "../../utils/helperFunction";
import WorkflowFormField from "../../components/common/WorkflowFormField";
import { Formik, FormikProps } from "formik";
import { Box } from "@mui/material";
import ButtonField from "../../components/common/ButtonField";
import { TailorLoan } from "../TailorLoan";

export type FinanceRequestStep =
  | "Work Information"
  | "Simulation"
  | "Loan Request";

export const FinanceRequestFields = {
  sendToQararBtn: "send_to_qarar_button",
};
const FinanceRequest = () => {
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
        setInitValues(
          transferTaskObjectForFormValue(res.data, setGroupedVariables)
        );
      }
    });
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
            if (!isPreventStepChange) handleNextStep();

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
      default:
        setStep("Work Information");
        break;
    }
  };

  return (
    <Box className="wrapper">
      <Formik
        initialValues={initValues}
        onSubmit={() => {}}
        enableReinitialize
        innerRef={formRef}
      >
        {({ handleSubmit }) => {
          return (
            <form className="workflowDetailWrapper" onSubmit={handleSubmit}>
              {step !== "Simulation" ? (
                <>
                  {groupedVariables[step]?.map(
                    (variable: Variable, i: number) => {
                      return (
                        <div
                          className="mt-4"
                          key={`finance-request-field-${i}`}
                        >
                          <WorkflowFormField
                            {...variable}
                            groupedVariables={groupedVariables}
                            handleBtnClick={() => {}}
                            currentStepIndex={0}
                            hideFieldNames={[
                              FinanceRequestFields.sendToQararBtn,
                            ]}
                          />
                        </div>
                      );
                    }
                  )}
                  <div className="mt-4">
                    <ButtonField
                      lbl={"next"}
                      handleClick={() => {
                        if (step === "Work Information")
                          handleBtnClick(FinanceRequestFields.sendToQararBtn);
                      }}
                      name={FinanceRequestFields.sendToQararBtn}
                      endIcon="RightBtnArrow.svg"
                      variableStyle={{
                        size: "large",
                        bgColor: "var(--btnDarkGreyBg)",
                      }}
                    />
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
