import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import Grid from "@mui/material/Grid2";
import {
  Button,
  Slider,
  SliderThumb,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ToggleButtonGroupField } from "../components/common/ToggleButtonGroupField";

interface ThumbComponentProps extends React.HTMLAttributes<unknown> {}

const Thumb = (props: ThumbComponentProps) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span>
        <img src="/images/SliderThumb.svg" alt="" />
      </span>
    </SliderThumb>
  );
};

export const TailorLoan = () => {
  const { t } = useTranslation();
  const [alignment, setAlignment] = useState<number | null>(null);

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: number | null
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Grid
      spacing={2}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      className={"groupContainer whiteHeader TailorLoan"}
    >
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            <>
              <div className="userCard">
                <p className="helloUser">
                  {t("helloUser", { user: "Mansour" })}
                </p>
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
                    <p className="label">
                      {t("You'reEligibleForPersonalLoanUpTo")}
                    </p>
                    <p className="maxLoanAmount">
                      {t("amountWithSAR", { amount: "40,000" })}
                    </p>
                  </div>
                </div>
              </div>
              <p className="groupLabel">{t("tailorYourPersonalLoan")}</p>

              <div className="tailorLoanCard">
                <div className="sliderContainer">
                  <div className="sliderLabel">
                    <p className="label">{t("amountToBorrow")}</p>
                    <p className="value">
                      {t("amountWithSAR", { amount: "40,000" })}
                    </p>
                  </div>
                  <p className="minMax">
                    {t("fromToSAR", { from: "1000", to: "40,000" })}
                  </p>

                  <div className="sliderWrapper">
                    <Slider
                      className="slider"
                      defaultValue={50}
                      min={1000}
                      max={40000}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      slots={{ thumb: Thumb }}
                      classes={{
                        rail: "sliderRail",
                        thumb: "sliderThumb",
                        track: "sliderTrack",
                      }}
                    />
                  </div>
                </div>

                <div className="loanTenorContainer">
                  <p className="loanTenorLabel">{t("loanTenor")}</p>
                  <p className="monthLabel">{t("inMonths")}</p>

                  <ToggleButtonGroup
                    value={alignment}
                    fullWidth
                    exclusive
                    onChange={handleAlignment}
                    classes={{
                      grouped: "buttons",
                      root: "toggleButtonGroup",
                      firstButton: "firstButton",
                      lastButton: "lastButton",
                      selected: "selected",
                    }}
                  >
                    <ToggleButton classes={{ selected: "selected" }} value={12}>
                      12
                    </ToggleButton>
                    <ToggleButton classes={{ selected: "selected" }} value={24}>
                      24
                    </ToggleButton>
                    <ToggleButton classes={{ selected: "selected" }} value={36}>
                      36
                    </ToggleButton>
                    <ToggleButton classes={{ selected: "selected" }} value={48}>
                      48
                    </ToggleButton>
                    <ToggleButton classes={{ selected: "selected" }} value={60}>
                      60
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>

                <ToggleButtonGroupField
                  name={"loanTenor"}
                  lbl={"loanTenor"}
                  options={[
                    { value: "12", label: "12" },
                    { value: "24", label: "24" },
                    { value: "36", label: "36" },
                    { value: "48", label: "48" },
                    { value: "60", label: "60" },
                  ]}
                />

                <hr className="divider" />

                <div className="loanDetailContainer">
                  <div>
                    <p className="detailLabel">{t("totalAmount")}</p>
                    <p className="detailValue">
                      {t("amountWithSAR", { amount: "40,000" })}
                    </p>
                  </div>
                  <div>
                    <p className="detailLabel">{t("monthlyPayment")}</p>
                    <p className="detailValue">
                      {t("amountWithSAR", { amount: "1,667" })}
                    </p>
                  </div>
                  <div>
                    <p className="detailLabel">{t("loanTenor")}</p>
                    <p className="detailValue">
                      {t("months", { months: "24" })}
                    </p>
                  </div>
                </div>

                <div className="installmentContainer">
                  <div>
                    <p className="detailLabel">{t("firstInstallment")}</p>
                    <p className="detailValue">01/08/2024</p>
                  </div>
                  <div>
                    <p className="detailLabel">{t("lastInstallment")}</p>
                    <p className="detailValue">01/80/2026</p>
                  </div>
                </div>
              </div>

              <div className="stepperContainer">
                {/* <StepFrame stepCount={6} activeStep={3} /> */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  endIcon={<img src="/images/ForwardArrow.svg" />}
                  className="nextButton"
                >
                  {t("review")}
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </Grid>
  );
};
