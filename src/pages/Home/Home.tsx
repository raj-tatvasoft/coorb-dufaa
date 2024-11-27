import { Box } from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IObject } from "../../service/commonModel";
import { WORKFLOW_DETAIL, yup } from "../../utils/constant";
import { regex } from "../../utils/regex";
import Welcome, { WelcomeFields } from "./Welcome";
import { OTPFields, OTPModal } from "../../components/dialog/OTPModal";
import UserEnrollment, { UserEnrollmentFields } from "./UserEnrollment";
import { Products } from "../Products";
import { ResponsibleLending } from "../ResponsibleLending";

export type HomeStep =
  | "welcome"
  | "otp"
  | "userEnrollment"
  | "product"
  | "responsibleLending";

export const Home = () => {
  const { t } = useTranslation();

  const formRef = useRef<FormikProps<IObject>>(null);

  const [step, setStep] = useState<HomeStep>("responsibleLending");
  const [initValues, setInitValues] = useState<IObject>({});

  const welcomeValidationSchema = yup.object().shape({
    [WelcomeFields.nationalId]: yup
      .string()
      .required(`${t(WelcomeFields.nationalId)} ${t("isRequired")}`),
    [WelcomeFields.saudiMobNo]: yup
      .string()
      .matches(regex.SaudiMobNo, t("invalidSaudiMobileNumber"))
      .required(`${t(WelcomeFields.saudiMobNo)} ${t("isRequired")}`),
    [WelcomeFields.agreeToShare]: yup
      .mixed()
      .oneOf([true], `${t("pleaseTickThis")}`)
      .required(t("pleaseTickThis")),
    [WelcomeFields.readTAndC]: yup
      .mixed()
      .oneOf([true], `${t("pleaseTickThis")}`)
      .required(t("pleaseTickThis")),
  });

  const otpValidationSchema = yup.object().shape({
    [OTPFields.otp]: yup
      .string()
      .required(`${t(OTPFields.otp)} ${t("isRequired")}`)
      .length(4, t("lengthShouldBe", { length: 4 })),
  });

  const userEnrollmentValidationSchema = yup.object().shape({
    [UserEnrollmentFields.userName]: yup
      .string()
      .required(`${t(UserEnrollmentFields.userName)} ${t("isRequired")}`),
    [UserEnrollmentFields.name]: yup
      .string()
      .required(`${t(UserEnrollmentFields.name)} ${t("isRequired")}`),
    [UserEnrollmentFields.email]: yup
      .string()
      .required(`${t(UserEnrollmentFields.email)} ${t("isRequired")}`)
      .matches(regex.Email, t("validEmail")),
    [UserEnrollmentFields.password]: yup
      .string()
      .required(`${t(UserEnrollmentFields.password)} ${t("isRequired")}`)
      .matches(regex.Password, t("passwordValid")),
    [UserEnrollmentFields.confirmPassword]: yup
      .string()
      .oneOf(
        [yup.ref(UserEnrollmentFields.password), undefined],
        t("passwordConfirmPasswordMustMatch")
      )
      .required(
        `${t(UserEnrollmentFields.confirmPassword)} ${t("isRequired")}`
      ),
  });

  useEffect(() => {
    // setStep("welcome");
    getTaskDetail();
  }, []);

  const getTaskDetail = () => {
    setInitValues({
      initialDetails: WORKFLOW_DETAIL,
      ...Object.values(WelcomeFields).reduce((acc: IObject, key) => {
        acc[key] = "";
        return acc;
      }, {}),
    });
    // workflowService.getStartableWorkflows().then((res) => {
    //   if (res?.data) {
    //     workflowService
    //       .instantiate(res.data[1].id, res.data[1].tokenId)
    //       .then((subRes) => {
    //         if (subRes?.data) {
    //           taskService
    //             .load(
    //               subRes.data?.taskInstanceId,
    //               subRes.data?.taskInstanceTokenId
    //             )
    //             .then((subChildRes) => {
    //               if (subChildRes?.data) {
    //                 setInitValues({
    //                   initialDetails: subChildRes.data,
    //                   ...Object.values(WelcomeFields).reduce(
    //                     (acc: IObject, key) => {
    //                       acc[key] = "";
    //                       return acc;
    //                     },
    //                     {}
    //                   ),
    //                 });
    //               }
    //             });
    //         }
    //       });
    //   }
    // });
  };

  const handleButtonClick = (btnName: string) => {
    if (formRef.current) {
      const { validateForm, setTouched, values } = formRef.current;
      validateForm().then((res) => {
        if (Object.keys(res)?.length) {
          const touchedFields: IObject = {};
          Object.keys(res).forEach((field) => {
            touchedFields[field] = true;
          });
          setTouched(touchedFields);
        } else {
          console.log(btnName, values);
          // handleGenericButtonClick(values, btnName, () => {
          //   if (step === "welcome") {
          //     setStep("otp");
          //     setInitValues({
          //       initialDetails: WORKFLOW_DETAIL,
          //       ...Object.values(WelcomeFields).reduce((acc: IObject, key) => {
          //         acc[key] = "";
          //         return acc;
          //       }, {}),
          //     });
          //   }
          // });

          if (step === "welcome") setStep("otp");
          else if (step === "otp") setStep("userEnrollment");
          else if (step === "userEnrollment") setStep("product");
          else if (step === "product") setStep("responsibleLending");
        }
      });
    }
  };

  const renderStepContent = useMemo(() => {
    switch (step) {
      case "welcome":
      case "otp":
        return (
          <>
            <Welcome handleButtonClick={handleButtonClick} />
            {step === "otp" && (
              <OTPModal
                open={true}
                handleClose={() => setStep("welcome")}
                handleButtonClick={handleButtonClick}
              />
            )}
          </>
        );
      case "userEnrollment":
        return <UserEnrollment handleButtonClick={handleButtonClick} />;
      case "product":
        return <Products handleButtonClick={handleButtonClick} />;
      case "responsibleLending":
        return <ResponsibleLending />;
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
        validationSchema={
          step === "welcome"
            ? welcomeValidationSchema
            : step === "otp"
            ? otpValidationSchema
            : step === "userEnrollment"
            ? userEnrollmentValidationSchema
            : {}
        }
        enableReinitialize
        innerRef={formRef}
      >
        {() => {
          return (
            <form className="workflowDetailWrapper">{renderStepContent}</form>
          );
        }}
      </Formik>

      {/* <NafathVerifyModal open={nafathModal} setOpen={setNafathModal} />
      <EligibilityCheckModal open={eligibilityCheckModal} /> */}
    </Box>
  );
};
