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
import {
  ResponsibleLending,
  ResponsibleLendingFields,
} from "../ResponsibleLending";
import { TailorLoan, TailorLoanFields } from "../TailorLoan";
import { ReviewLoan } from "../ReviewLoan";
import { PreviewContract } from "../PreviewContract";
import { Congratulations } from "../Congratulations";

export type HomeStep =
  | "welcome"
  | "otp"
  | "userEnrollment"
  | "product"
  | "responsibleLending"
  | "tailorLoan"
  | "reviewLoan"
  | "previewContract"
  | "congratulation";

export const Home = () => {
  const { t } = useTranslation();

  const formRef = useRef<FormikProps<IObject>>(null);

  const [step, setStep] = useState<HomeStep>("welcome");
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

  const responsibleLendingSchema = yup.object().shape(
    Object.keys(ResponsibleLendingFields).reduce((acc: IObject, key) => {
      if (
        (ResponsibleLendingFields as IObject)[key] !==
        ResponsibleLendingFields.btnContinue
      ) {
        acc[key] = yup.string().required(`${t(key)} ${t("isRequired")}`);
      }
      return acc;
    }, {})
  );

  const loanTailorSchema = yup.object().shape({
    [TailorLoanFields.loanTenor]: yup
      .string()
      .required(`${t(TailorLoanFields.loanTenor)} ${t("isRequired")}`),
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
          switch (step) {
            case "welcome":
              setStep("otp");
              break;
            case "otp":
              setStep("userEnrollment");
              break;
            case "userEnrollment":
              setStep("product");
              break;
            case "product":
              setStep("responsibleLending");
              break;
            case "responsibleLending":
              setStep("tailorLoan");
              break;
            case "tailorLoan":
              setStep("reviewLoan");
              break;
            case "reviewLoan":
              setStep("previewContract");
              break;
            case "previewContract":
              setStep("congratulation");
              break;
            default:
              setStep("welcome");
              break;
          }
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
        return <ResponsibleLending handleButtonClick={handleButtonClick} />;
      case "tailorLoan":
        return <TailorLoan handleButtonClick={handleButtonClick} />;
      case "reviewLoan":
        return <ReviewLoan handleButtonClick={handleButtonClick} />;
      case "previewContract":
        return <PreviewContract handleButtonClick={handleButtonClick} />;
      case "congratulation":
        return <Congratulations handleButtonClick={handleButtonClick} />;
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
            : step === "responsibleLending"
            ? responsibleLendingSchema
            : step === "tailorLoan"
            ? loanTailorSchema
            : null
        }
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

      {/* <NafathVerifyModal open={nafathModal} setOpen={setNafathModal} />
      <EligibilityCheckModal open={eligibilityCheckModal} /> */}
    </Box>
  );
};
