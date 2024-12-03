import { Slider, SliderThumb } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import { ToggleButtonGroupField } from "../components/common/ToggleButtonGroupField";
import ButtonField from "../components/common/ButtonField";
import { formatWithCommaAndFractionDigits } from "../utils/helperFunction";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
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

export const TailorLoanFields = {
  loanTenor: "loanTenor",
};

export const TailorLoan = ({
  handleButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
}) => {
  const { t } = useTranslation();
  {
    console.log(
      " formatWithCommaAndFractionDigits(val)",
      formatWithCommaAndFractionDigits(200)
    );
  }
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
          <div className="sliderContainer">
            <div className="sliderLabel">
              <p className="label">{t("amountToBorrow")}</p>
              <p className="value">
                {t("amountWithSAR", {
                  amount: formatWithCommaAndFractionDigits(40000),
                })}
              </p>
            </div>
            <p className="minMax">
              {t("fromToSAR", {
                from: "1000",
                to: formatWithCommaAndFractionDigits(40000),
              })}
            </p>

            <div className="sliderWrapper">
              <Slider
                aria-label="Default"
                defaultValue={2000}
                valueLabelDisplay="auto"
                step={1000}
                marks
                min={1000}
                max={40000}
                valueLabelFormat={(val) => {
                  return formatWithCommaAndFractionDigits(val);
                }}
                className="slider"
                slots={{ thumb: Thumb }}
                classes={{
                  rail: "sliderRail",
                  thumb: "sliderThumb",
                  track: "sliderTrack",
                }}
              />
            </div>
          </div>

          <ToggleButtonGroupField
            name={TailorLoanFields.loanTenor}
            lbl={TailorLoanFields.loanTenor}
            subLbl={"inMonths"}
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
              <p className="detailValue">{t("months", { months: "24" })}</p>
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
          <ButtonField
            lbl={"review"}
            handleClick={() => handleButtonClick("review")}
            name={"review"}
            endIcon="RightBtnArrow.svg"
            variableStyle={{
              bgColor: "var(--btnDarkGreyBg)",
              size: "large",
            }}
          />
        </div>
      </>
    </Grid>
  );
};
