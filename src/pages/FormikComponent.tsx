import { Box } from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useMemo, useRef, useState } from "react";
import { IObject } from "../service/commonModel";
import { Qualify } from "./Qualify";
import { NafathVerifyModal } from "../components/dialog/NafathVerifyModal";
import { SIMAHAuthorization } from "../components/dialog/SIMAHAuthorization";

export type Component = "SIMAH" | "nafath" | "qualify";

export const FormikComponent = () => {
  const formRef = useRef<FormikProps<IObject>>(null);
  const [step, setStep] = useState<Component>("nafath");
  const [initValues] = useState<IObject>({});

  const handleNextStep = () => {
    switch (step) {
      case "qualify":
        setStep("nafath");
        break;
      case "nafath":
        setStep("SIMAH");
        break;
      default:
        setStep("qualify");
        break;
    }
  };

  const renderStepContent = useMemo(() => {
    switch (step) {
      case "qualify":
      case "nafath":
      case "SIMAH":
        return (
          <>
            <Qualify handleButtonClick={handleNextStep} />
            {step === "nafath" && (
              <NafathVerifyModal
                open={true}
                handleClose={handleNextStep}
                handleVerifyCode={() => {}}
              />
            )}
            {step === "SIMAH" && (
              <SIMAHAuthorization
                open={true}
                handleClose={handleNextStep}
                handleContinue={() => {}}
              />
            )}
          </>
        );
      default:
        <></>;
        break;
    }
  }, [step]);

  return (
    <Box className="formikComponent">
      <Formik
        initialValues={initValues}
        onSubmit={() => {}}
        validationSchema={{}}
        enableReinitialize
        innerRef={formRef}
      >
        {({ handleSubmit }) => {
          return (
            <form className="qualifyForm" onSubmit={handleSubmit}>
              {renderStepContent}
            </form>
          );
        }}
      </Formik>

      {/* <NafathVerifyModal open={nafathModal} setOpen={setNafathModal} />
    <EligibilityCheckModal open={eligibilityCheckModal} /> */}
    </Box>
  );
};
