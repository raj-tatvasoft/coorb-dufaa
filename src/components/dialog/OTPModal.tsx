import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OTPInput from "../common/OTPField";
import { useTranslation } from "react-i18next";
import { FormikContextType, useFormikContext } from "formik";
import { IObject } from "../../service/commonModel";
import ButtonField from "../common/ButtonField";

export const OTPFields = {
  otp: "otp",
  resendBtn: "resend_button",
  validateBtn: "validate_button",
};
interface OTPModalProps {
  open: boolean;
  handleClose: () => void;
  handleButtonClick: (
    btnName: string,
    isPreventValidation?: boolean,
    isPreventStepChange?: boolean
  ) => void;
}

export const OTPModal = ({
  open,
  handleClose,
  handleButtonClick,
}: OTPModalProps) => {
  const { t } = useTranslation();

  const {
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    validateField,
  }: FormikContextType<IObject> = useFormikContext();

  return (
    <Dialog
      open={open}
      fullScreen
      sx={{ background: "transparent" }}
      classes={{ paper: "transparentDialog" }}
      autoFocus={false}
    >
      <DialogContent classes={{ root: "transparentContent" }}>
        <Typography
          color="white"
          fontWeight={700}
          fontSize={24}
          paddingBlock={"5px"}
        >
          {t("codeSentToYourMobileNumber")}
        </Typography>
        <Typography
          color="white"
          fontWeight={400}
          fontSize={16}
          paddingBlock={"5px"}
        >
          {t("enterReceiveNumber")}
        </Typography>
        <OTPInput
          fields={4}
          handleChange={(val) => {
            setFieldValue(OTPFields.otp, val?.join(""));
            setTimeout(() => {
              validateField(OTPFields.otp);
            }, 0);
          }}
          onBlur={() => setFieldTouched(OTPFields.otp, true, true)}
          error={
            touched[OTPFields.otp] && errors[OTPFields.otp]
              ? errors[OTPFields.otp]?.toString()
              : ""
          }
        ></OTPInput>
        {/* <Typography
          color="white"
          fontWeight={400}
          fontSize={12}
          paddingTop={"10px"}
        >
          If you don't receive the number in 1:21 minutes, resend code
        </Typography> */}

        <div className="mt-4 flex gap-2">
          <ButtonField
            lbl={OTPFields.validateBtn}
            handleClick={() => handleButtonClick(OTPFields.resendBtn)}
            name={OTPFields.validateBtn}
            variableStyle={{
              bgColor: "var(--btnDarkGreyBg)",
            }}
          />
          <ButtonField
            lbl={OTPFields.resendBtn}
            handleClick={() =>
              handleButtonClick(OTPFields.resendBtn, true, true)
            }
            name={OTPFields.resendBtn}
            variableStyle={{
              bgColor: "var(--btnDarkGreyBg)",
            }}
          />
        </div>
      </DialogContent>
      <DialogActions classes={{ root: "transparentActionButton" }}>
        <Button
          type="button"
          variant="text"
          sx={{ fontSize: 18, fontWeight: 500 }}
          onClick={() => handleClose()}
        >
          <CloseIcon sx={{ height: "30px", width: "30px" }} />
          <span style={{ lineHeight: "30px" }}>{t("close")}</span>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
