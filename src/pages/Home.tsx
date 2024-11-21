import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputTextField from "../components/common/InputTextField";
import { Formik } from "formik";
import CheckboxField from "../components/common/CheckboxField";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { NafathVerifyModal } from "../components/dialog/NafathVerifyModal";
import { OTPModal } from "../components/dialog/OTPModal";
import { EligibilityCheckModal } from "../components/dialog/EligibilityCheckModal";

export const Home = () => {
  const { t } = useTranslation();

  const [otpModal, setOtpModal] = useState(true);
  const [nafathModal, setNafathModal] = useState(false);
  const [eligibilityCheckModal, setEligibilityCheckModal] = useState(false);

  return (
    <Box className="wrapper">
      <p className="more-fund-title">
        {t("need")} <span> {t("moreFunds")} </span>{" "}
        {t("overYourCurrentFinancing?")}
      </p>
      <p className="more-fund-description">
        {t("getAnInstantMicrofinance")} <span> {t("2000SAR")} </span>{" "}
        {t("noPaperWorkFastApprovalsAndFlexibleTerms")}
      </p>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => {
          return (
            // <form className="workflowDetailWrapper">
            <Grid container spacing={{ xs: 1, lg: 2 }}>
              <Grid
                container
                spacing={{ xs: 1.5, lg: 2 }}
                size={{ xs: 12 }}
                alignItems={"center"}
              >
                <Grid size={{ xs: 12, md: 6 }}>
                  <InputTextField
                    name="nationalID"
                    placeholder={t("NationalIDorIqama")}
                    startIcon={"ID.svg"}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <InputTextField
                    name="saudiMobileNumber"
                    placeholder={t("saudiMobileNumber")}
                    startIcon={"SmartPhone.svg"}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <InputTextField
                    name="dateOfBirth"
                    placeholder={t("dateOfBirth")}
                    startIcon={"Calendar.svg"}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CheckboxField
                    name="dataShareWithDuffa"
                    lbl={t("agreeToShareDataWithDuffa")}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CheckboxField name="t&c" lbl={t("readT&C")} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CheckboxField
                    name="receiveMails"
                    lbl={t("wantToReceiveMarketingMails")}
                  />
                </Grid>
              </Grid>
            </Grid>
            // </form>
          );
        }}
      </Formik>

      <OTPModal open={otpModal} setOpen={setOtpModal} />
      <NafathVerifyModal open={nafathModal} setOpen={setNafathModal} />
      <EligibilityCheckModal open={eligibilityCheckModal} />
    </Box>
  );
};
