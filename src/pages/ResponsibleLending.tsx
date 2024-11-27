import { Formik, FormikProps } from "formik";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { yup } from "../utils/constant";
import { useEffect, useRef, useState } from "react";
import { IObject } from "../service/commonModel";
import DecimalField from "../components/common/DecimalField";

export const ResponsibleLendingFields = {
  numberOfDependents: "numberOfDependents",
  foodExpenses: "foodExpenses",
  educationExpenses: "educationExpenses",
  healthcareExpenses: "healthcareExpenses",
  insuranceExpenses: "insuranceExpenses",
  housingAndServices: "housingAndServices",
  domesticWorkerWages: "domesticWorkerWages",
  transportationAndCommunication: "transportationAndCommunication",
  otherExpenses: "otherExpenses",
};

export const ResponsibleLending = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formRef = useRef<FormikProps<IObject>>(null);
  const [expenses, setExpenses] = useState("0.00");

  const responsibleLendingSchema = yup.object().shape(
    Object.keys(ResponsibleLendingFields).reduce((acc: IObject, key) => {
      acc[key] = yup.string().required(`${t(key)} ${t("isRequired")}`);
      return acc;
    }, {})
  );

  const handleButtonClick = () => {
    if (formRef.current) {
      const { validateForm, setTouched, isValid, touched } = formRef.current;
      validateForm().then((res) => {
        if (Object.keys(res)?.length) {
          const touchedFields: IObject = {};
          Object.keys(res).forEach((field) => {
            touchedFields[field] = true;
          });
          setTouched(touchedFields);
        }

        if (isValid) {
          navigate("/tailor-loan");
        }
      });
    }
  };

  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      className={"groupContainer whiteHeader"}
    >
      <Formik
        initialValues={{}}
        validationSchema={responsibleLendingSchema}
        onSubmit={() => {}}
        innerRef={formRef}
      >
        {(form) => {
          useEffect(() => {
            if (formRef.current) {
              const { values } = formRef.current;
              let sum = 0;
              Object.values(ResponsibleLendingFields).forEach((val) => {
                if (val !== ResponsibleLendingFields.numberOfDependents)
                  sum =
                    sum +
                    (isNaN(Number(values[val])) ? 0 : Number(values[val]));
              });
              setExpenses(sum.toFixed(2));
            }
          }, [form.values]);

          return (
            <>
              <div className="userCard">
                <p className="helloUser">
                  {t("helloUser", { user: "Mansour" })}
                </p>
                <div className="eligibleLabel">
                  <img src="/images/Check.svg" alt="" />
                  <p>{t("You'reEligibleForLoan")}</p>
                </div>
              </div>
              <div className="groupLabelContainer">
                <p className="groupLabel">{t("responsibleLending")}</p>
                <p className="loanCalculator">
                  {t("expenses")} {t("amountWithSAR", { amount: expenses })}
                </p>
              </div>

              {/* {Object.values(ResponsibleLendingFields).map((name, i) => (
                <InputTextField
                  name={name}
                  placeholder={t(name)}
                  startIcon={"NumberOfDependents.svg"}
                />
              ))} */}

              <DecimalField
                name={ResponsibleLendingFields.numberOfDependents}
                placeholder={t("numberOfDependents")}
                startIcon={"NumberOfDependents.svg"}
                fractionDigits={0}
              />
              <DecimalField
                name={ResponsibleLendingFields.foodExpenses}
                placeholder={t("foodExpenses")}
                startIcon={"FoodExpenses.svg"}
                endIcon={"SAR.svg"}
              />
              <DecimalField
                name={ResponsibleLendingFields.educationExpenses}
                placeholder={t("educationExpenses")}
                startIcon={"EducationExpenses.svg"}
                endIcon={"SAR.svg"}
              />
              <DecimalField
                name={ResponsibleLendingFields.healthcareExpenses}
                placeholder={t("healthcareExpenses")}
                startIcon={"HealthcareExpenses.svg"}
                endIcon={"SAR.svg"}
              />
              <DecimalField
                name={ResponsibleLendingFields.insuranceExpenses}
                placeholder={t("insuranceExpenses")}
                startIcon={"InsuranceExpenses.svg"}
                endIcon={"SAR.svg"}
              />
              <DecimalField
                name={ResponsibleLendingFields.housingAndServices}
                placeholder={t("housingAndServices")}
                startIcon={"HousingAndServices.svg"}
                endIcon={"SAR.svg"}
              />
              <DecimalField
                name={ResponsibleLendingFields.domesticWorkerWages}
                placeholder={t("domesticWorkerWages")}
                startIcon={"DomesticWorkerWages.svg"}
                endIcon={"SAR.svg"}
              />
              <DecimalField
                name={ResponsibleLendingFields.transportationAndCommunication}
                placeholder={t("transportationAndCommunication")}
                startIcon={"Transportation.svg"}
                endIcon={"SAR.svg"}
              />
              <DecimalField
                name={ResponsibleLendingFields.otherExpenses}
                placeholder={t("otherExpenses")}
                startIcon={"OtherExpenses.svg"}
                endIcon={"SAR.svg"}
              />

              <div className="stepperContainer">
                {/* <StepFrame stepCount={6} activeStep={2} /> */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  endIcon={<img src="/images/ForwardArrow.svg" />}
                  classes={{ disabled: "disableNext" }}
                  className="nextButton"
                  onClick={handleButtonClick}
                >
                  {t("continue")}
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </Grid>
  );
};
