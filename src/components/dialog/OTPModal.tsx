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
import { Dispatch, SetStateAction } from "react";

interface OTPModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const OTPModal = ({ open, setOpen }: OTPModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      fullScreen
      sx={{ background: "transparent" }}
      classes={{ paper: "transparentDialog" }}
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
        <OTPInput fields={4} handleChange={() => {}}></OTPInput>
        <Typography
          color="white"
          fontWeight={400}
          fontSize={12}
          paddingTop={"10px"}
        >
          If you don't receive the number in 1:21 minutes, resend code
        </Typography>
      </DialogContent>
      <DialogActions classes={{ root: "transparentActionButton" }}>
        <Button
          type="button"
          variant="text"
          sx={{ fontSize: 18, fontWeight: 500 }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon sx={{ height: "30px", width: "30px" }} />
          <span style={{ lineHeight: "30px" }}>{t("close")}</span>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
