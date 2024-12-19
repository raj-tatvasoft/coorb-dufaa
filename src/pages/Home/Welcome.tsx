import { Grid2 as Grid } from "@mui/material";
import { t } from "i18next";
import ButtonField from "../../components/common/ButtonField";
import CheckboxField from "../../components/common/CheckboxField";
import InputTextField from "../../components/common/InputTextField";
import { useEffect } from "react";
import { CONST_WORDS } from "../../utils/constant";

export const WelcomeFields = {
  nationalId: "national_id_iqama_text",
  saudiMobNo: "saudi_mobile_number_text",
  agreeToShare: "are_you_a_bab_customer_tick",
  readTAndC: "t_an_c_tick",
  marketingTick: "marketing_tick",
  buttonNext: "button_go_next",
};

const Welcome = ({
  handleButtonClick,
  handleLoginButtonClick,
}: {
  handleButtonClick: (btnName: string) => void;
  handleLoginButtonClick: () => void;
}) => {
  useEffect(() => {
    localStorage.removeItem(CONST_WORDS.token);
  }, []);

  return (
    <>
      <p className="more-fund-title">
        {t("need")} <span> {t("moreFunds")} </span>{" "}
        {t("overYourCurrentFinancing?")}
      </p>
      <p className="more-fund-description">
        {t("getAnInstantMicrofinance")} <span> {t("5,000 SAR")} </span>{" "}
        {t("noPaperWorkFastApprovalsAndFlexibleTerms")}
      </p>
      <Grid container spacing={{ xs: 1, lg: 2 }}>
        <Grid
          container
          spacing={{ xs: 1.5, lg: 2 }}
          size={{ xs: 12 }}
          alignItems={"start"}
        >
          <Grid size={{ xs: 12 }}>
            <InputTextField
              name={WelcomeFields.nationalId}
              placeholder={t("NationalIDorIqama")}
              startIcon={"ID.svg"}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InputTextField
              name={WelcomeFields.saudiMobNo}
              placeholder={"saudi_mobile_number_text"}
              startIcon={"SmartPhone.svg"}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CheckboxField
              name={WelcomeFields.agreeToShare}
              lbl={WelcomeFields.agreeToShare}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CheckboxField
              name={WelcomeFields.readTAndC}
              variableStyle={{ htmlLabel: t("readT&C") }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CheckboxField
              name={WelcomeFields.marketingTick}
              lbl={"wantToReceiveMarketingMails"}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ButtonField
              lbl={"next"}
              handleClick={() => handleButtonClick(WelcomeFields.buttonNext)}
              name={WelcomeFields.buttonNext}
              endIcon="RightBtnArrow.svg"
              variableStyle={{
                size: "large",
                bgColor: "var(--btnDarkGreyBg)",
              }}
            />
          </Grid>
          <Grid size={"auto"} className="loginButton">
            <ButtonField
              lbl={"login"}
              handleClick={handleLoginButtonClick}
              name={WelcomeFields.buttonNext}
              variableStyle={{
                size: "large",
                bgColor: "var(--btnDarkGreyBg)",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Welcome;
