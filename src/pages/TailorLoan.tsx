import { Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FormikContextType, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonField from "../components/common/ButtonField";
import SliderField from "../components/common/SliderField";
import { IObject } from "../service/commonModel";
import {
  formatWithCommaAndFractionDigits,
  getUserName,
  handleGenericButtonClick,
  transferTaskObjectForFormValue,
  transferTaskObjectForPayload,
} from "../utils/helperFunction";
import LoanTailorTabForm from "./LoanTailorTabForm";
import SelectField from "../components/common/SelectField";
import { taskService } from "../service/task/TaskService";

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
  loadDataBtn: "load_data",
  employeeName: "employer's_name",
  gosi_salary: "gosi_salary",
  simulateLoanBtn: "simulate_loan_button",
  listOfLoanProducts: "list_of_loan_products",
  listOfLoanProductsComboListName: "business.loan_products",
};

export const TailorLoan = ({
  eligibleTitle,
  hideSalaryExpense = false,
  isCommit = false,
}: {
  eligibleTitle?: string;
  hideSalaryExpense?: boolean;
  isCommit?: boolean;
}) => {
  const { t } = useTranslation();
  const {
    values,
    setValues,
    setFieldTouched,
    setFieldValue,
  }: FormikContextType<IObject> = useFormikContext();
  const [groupedVariables, setGroupedVariables] = useState<IObject>({});
  const [showGroupedFields, setShowGroupedFields] = useState<boolean>(false);

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

  useEffect(() => {
    setSimulateLoan({ isLoading: false, details: {} });
  }, []);

  useEffect(() => {
    if (values?.[TailorLoanFields.loanPrincipalMin]) {
      setFieldValue(
        TailorLoanFields.loanPrincipal,
        values?.[TailorLoanFields.loanPrincipalMin]
      );
      setFieldValue(
        TailorLoanFields.loanTenure,
        values?.[TailorLoanFields.loanTenureMin]
      );
    }
  }, [values?.[TailorLoanFields.loanPrincipalMin]]);

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

  const handleSimulateLoanBtn = () => {
    setSimulateLoan({ isLoading: true, details: {} });
    handleGenericButtonClick(
      values,
      TailorLoanFields.simulateLoanBtn,
      (data: any) => {
        const newValues = transferTaskObjectForFormValue(
          {
            ...values,
            ...data,
          },
          setGroupedVariables
        );
        setValues(newValues);
        setTimeout(() => {
          setSimulateLoan({
            isLoading: false,
            details: {
              totalAmount: formatWithCommaAndFractionDigits(
                Number(newValues[TailorLoanFields.loanPrincipal])
              ),
              [TailorLoanFields.monthlyPayment]:
                formatWithCommaAndFractionDigits(
                  Number(newValues[TailorLoanFields.monthlyPayment])
                ),
              [TailorLoanFields.loanTenure]:
                newValues[TailorLoanFields.loanTenure],
              [TailorLoanFields.firstInstallmentDate]:
                newValues[TailorLoanFields.firstInstallmentDate],
              [TailorLoanFields.lastInstallmentDate]:
                newValues[TailorLoanFields.lastInstallmentDate],
            },
          });
        }, 0);
      },
      () => setSimulateLoan({ isLoading: false, details: {} })
    );
  };

  const handleCommitTask = () => {
    const payload = transferTaskObjectForPayload(values);
    taskService.commit(payload).then((res) => {
      if (res) {
        alert("committed");
      }
    });
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
      {!showGroupedFields ? (
        <>
          <div className="userCard">
            <p className="helloUser">
              {t("helloUser", { user: getUserName() })}
            </p>
            {!hideSalaryExpense && (
              <div className="salaryExpensesContainer">
                <div className="label">
                  <p>{t("yourSalaryIs")} </p>
                  <span>
                    {t("amountWithSAR", {
                      amount: values[TailorLoanFields.gosi_salary],
                    })}
                  </span>
                </div>

                <div className="label">
                  <p> {t("expenses")} </p>
                  <span> {t("amountWithSAR", { amount: "60,000" })} </span>
                </div>
              </div>
            )}

            <div className="tailorLoanEligibleLabel">
              <img src="/images/Celebration.svg" alt="" />
              <div>
                <p className="label">
                  {eligibleTitle
                    ? eligibleTitle
                    : t("You'reEligibleForPersonalLoanUpTo")}
                </p>
                <p className="maxLoanAmount">
                  {t("amountWithSAR", {
                    amount: formatWithCommaAndFractionDigits(
                      Number(values[TailorLoanFields.loanPrincipalMax] ?? 0)
                    ),
                  })}
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

              min={Number(values?.[TailorLoanFields.loanPrincipalMin] ?? 0)}
              max={Number(values?.[TailorLoanFields.loanPrincipalMax] ?? 0)}
              subLbl={t("fromToSAR", {
                from: formatWithCommaAndFractionDigits(
                  Number(values[TailorLoanFields.loanPrincipalMin] ?? 0)
                ),
                to: formatWithCommaAndFractionDigits(
                  Number(values[TailorLoanFields.loanPrincipalMax] ?? 0)
                ),
              })}
              step={1000}
            />

            <SliderField
              name={TailorLoanFields.loanTenure}
              lbl={TailorLoanFields.loanTenure}
              rightLbl={t("months", {
                months: values?.[TailorLoanFields.loanTenure],
              })}
              min={Number(values[TailorLoanFields.loanTenureMin] ?? 0)}
              max={Number(values[TailorLoanFields.loanTenureMax] ?? 0)}
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
                handleClick={handleSimulateLoanBtn}
                name={"simulateLoan"}
                variableStyle={{
                  bgColor: "var(--btnDarkGreyBg)",
                  size: "large",
                }}
                readOnly={simulateLoan.isLoading ? 1 : 0}
              />
            </Typography>
            {(simulateLoan.isLoading ||
              simulateLoan.details?.[
                TailorLoanFields.firstInstallmentDate
              ]) && (
              <>
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
                        months:
                          simulateLoan.details[TailorLoanFields.loanTenure],
                      })
                    )}
                  </div>

                  <div className="installmentContainer" ref={bottomRef}>
                    {renderLoanDetails(
                      TailorLoanFields.firstInstallmentDate,
                      simulateLoan.details[
                        TailorLoanFields.firstInstallmentDate
                      ]
                    )}
                    {renderLoanDetails(
                      TailorLoanFields.lastInstallmentDate,
                      simulateLoan.details[TailorLoanFields.lastInstallmentDate]
                    )}
                  </div>
                </>
                <hr className="divider" />
                <SelectField
                  name={TailorLoanFields.listOfLoanProducts}
                  lbl={TailorLoanFields.listOfLoanProducts}
                  comboListName={
                    TailorLoanFields.listOfLoanProductsComboListName
                  }
                  fetchOpt
                  hideClr
                />
              </>
            )}
          </div>

          {(simulateLoan.isLoading ||
            simulateLoan.details?.[TailorLoanFields.firstInstallmentDate]) && (
            <div className="stepperContainer">
              {/* <StepFrame stepCount={6} activeStep={3} /> */}
              <ButtonField
                lbl={"next"}
                handleClick={() => {
                  if (values[TailorLoanFields.listOfLoanProducts]) {
                    if (isCommit) handleCommitTask();
                    else setShowGroupedFields(true);
                  } else
                    setFieldTouched(
                      TailorLoanFields.listOfLoanProducts,
                      true,
                      true
                    );
                }}
                name={"next"}
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
      ) : (
        <LoanTailorTabForm
          groupedVariables={
            Object.keys(groupedVariables)
              .filter((x) => x !== "Welcome" && x !== "Loan Simulation")
              .map((x) => groupedVariables[x]) as any
          }
          handleBtnClick={() => {}}
          handleShowLoanSimulation={() => setShowGroupedFields(false)}
          belowBtn
        />
      )}
    </Grid>
  );
};
