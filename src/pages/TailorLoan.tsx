import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import ButtonField from "../components/common/ButtonField";
import { formatWithCommaAndFractionDigits } from "../utils/helperFunction";
import SliderField from "../components/common/SliderField";
import { useEffect, useRef, useState } from "react";
import { IObject } from "../service/commonModel";
import { Skeleton, Typography } from "@mui/material";
import { FormikContextType, useFormikContext } from "formik";

export const TailorLoanFields = {
  loanPrincipalMin: "loan_principal_min",
  loanPrincipalMax: "loan_principal_max",
  loanPrincipal: "loan_principal",
  loanTenureMin: "loan_tenure_min",
  loanTenureMax: "loan_tenure_max",
  loanTenure: "loan_tenure",
  monthlyPayment: "monthly_payment",
  firstInstallmentDate: "first_installment_date",
  lastInstallmentDate: "last_installment_date",
  applyForLoanBtn: "apply_for_loan_button",
  simulateLoanBtn: "simulate_button",
};

export const TailorLoan = ({
  handleButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
}) => {
  const { t } = useTranslation();
  const { values }: FormikContextType<IObject> = useFormikContext();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [simulateLoan, setSimulateLoan] = useState<{
    isLoading: boolean;
    details: IObject;
  }>({
    isLoading: false,
    details: {},
  });

  useEffect(() => {
    if (simulateLoan.isLoading && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [simulateLoan.isLoading]);

  const handleSimulateLoan = () => {
    setSimulateLoan({ isLoading: true, details: {} });
    setTimeout(() => {
      setSimulateLoan({
        isLoading: false,
        details: {
          totalAmount: 20000,
          [TailorLoanFields.monthlyPayment]: 20000,
          [TailorLoanFields.loanTenure]: 12,
          [TailorLoanFields.firstInstallmentDate]: "09/12/2024",
          [TailorLoanFields.lastInstallmentDate]: "09/12/2034",
        },
      });
    }, 5000);
    // handleButtonClick(TailorLoanFields.simulateLoanBtn);
  };

  const renderLoanDetails = (fieldName: string, renderVal?: string) => {
    return (
      <div>
        <p className="detailLabel">{t(fieldName)}</p>
        <p className="detailValue">
          {simulateLoan.isLoading ? (
            <Skeleton
              variant="text"
              sx={{
                fontSize: "10rem",
                width: "100px",
              }}
            />
          ) : renderVal ? (
            renderVal
          ) : (
            simulateLoan.details[fieldName]
          )}
        </p>
      </div>
    );
  };

  return (
    <Grid
      container
      spacing={2}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      className={"groupContainer whiteHeader TailorLoan"}
    >
      <>
        <div className="userCard">
          <p className="helloUser">{t("helloUser", { user: "Mansour" })}</p>
          <div className="salaryExpensesContainer">
            <div className="label">
              <p>{t("yourSalaryIs")} </p>
              <span>{t("amountWithSAR", { amount: "20,000" })}</span>
            </div>

            <div className="label">
              <p> {t("expenses")} </p>
              <span> {t("amountWithSAR", { amount: "60,000" })} </span>
            </div>
          </div>

          <div className="tailorLoanEligibleLabel">
            <img src="/images/Celebration.svg" alt="" />
            <div>
              <p className="label">{t("You'reEligibleForPersonalLoanUpTo")}</p>
              <p className="maxLoanAmount">
                {t("amountWithSAR", { amount: "40,000" })}
              </p>
            </div>
          </div>
        </div>
        <p className="groupLabel">{t("tailorYourPersonalLoan")}</p>

        <div className="tailorLoanCard">
          <SliderField
            name={TailorLoanFields.loanPrincipal}
            lbl={"amountToBorrow"}
            rightLbl={t("amountWithSAR", {
              amount: formatWithCommaAndFractionDigits(
                Number(values?.[TailorLoanFields.loanPrincipal] ?? 0)
              ),
            })}
            formatValue={formatWithCommaAndFractionDigits}
            // min={TailorLoanFields.lanPrinicipalMin}
            // max={TailorLoanFields.laonPrinicipalMax}

            min={0}
            max={40000}
            subLbl={t("fromToSAR", {
              from: "1000",
              to: formatWithCommaAndFractionDigits(40000),
            })}
            step={1000}
          />

          <SliderField
            name={TailorLoanFields.loanTenure}
            lbl={TailorLoanFields.loanTenure}
            // min={TailorLoanFields.loanTenureMin}
            // max={TailorLoanFields.loanTenureMax}

            rightLbl={t("months", {
              months: values?.[TailorLoanFields.loanTenure],
            })}
            min={12}
            max={24}
            subLbl={"inMonths"}
            step={1}
          />

          {/* <ToggleButtonGroupField
            name={TailorLoanFields.loanTenure}
            lbl={TailorLoanFields.loanTenure}
            subLbl={"inMonths"}
            options={[
              { value: "12", label: "12" },
              { value: "24", label: "24" },
              { value: "36", label: "36" },
              { value: "48", label: "48" },
              { value: "60", label: "60" },
            ]}
          /> */}

          <hr className="divider" />
          <Typography
            component={"div"}
            sx={{ marginTop: -2, marginBottom: 1.5 }}
          >
            <ButtonField
              lbl={"simulateLoan"}
              handleClick={handleSimulateLoan}
              name={"simulateLoan"}
              variableStyle={{
                bgColor: "var(--btnDarkGreyBg)",
                size: "large",
              }}
              readOnly={simulateLoan.isLoading ? 1 : 0}
            />
          </Typography>
          {(simulateLoan.isLoading ||
            simulateLoan.details?.[TailorLoanFields.firstInstallmentDate]) && (
            <>
              <div className="loanDetailContainer">
                {renderLoanDetails(
                  "totalAmount",
                  t("amountWithSAR", {
                    amount: formatWithCommaAndFractionDigits(
                      simulateLoan.details["totalAmount"]
                    ),
                  })
                )}
                {renderLoanDetails(
                  TailorLoanFields.monthlyPayment,
                  t("amountWithSAR", {
                    amount: formatWithCommaAndFractionDigits(
                      simulateLoan.details[TailorLoanFields.monthlyPayment]
                    ),
                  })
                )}
                {renderLoanDetails(
                  TailorLoanFields.loanTenure,
                  t("months", {
                    months: simulateLoan.details[TailorLoanFields.loanTenure],
                  })
                )}
              </div>

              <div className="installmentContainer" ref={bottomRef}>
                {renderLoanDetails(
                  TailorLoanFields.firstInstallmentDate,
                  simulateLoan.details[TailorLoanFields.firstInstallmentDate]
                )}
                {renderLoanDetails(
                  TailorLoanFields.lastInstallmentDate,
                  simulateLoan.details[TailorLoanFields.lastInstallmentDate]
                )}
              </div>
            </>
          )}
        </div>

        {(simulateLoan.isLoading ||
          simulateLoan.details?.[TailorLoanFields.firstInstallmentDate]) && (
          <div className="stepperContainer">
            {/* <StepFrame stepCount={6} activeStep={3} /> */}
            <ButtonField
              lbl={"review"}
              handleClick={() => handleButtonClick("review")}
              name={"review"}
              endIcon="RightBtnArrow.svg"
              variableStyle={{
                bgColor: "var(--btnDarkGreyBg)",
                size: "large",
              }}
              readOnly={
                simulateLoan.details?.[TailorLoanFields.firstInstallmentDate]
                  ? 0
                  : 1
              }
            />
          </div>
        )}
      </>
    </Grid>
  );
};
