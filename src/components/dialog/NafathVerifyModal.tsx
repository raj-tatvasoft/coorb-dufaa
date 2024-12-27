import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import ButtonField from "../common/ButtonField";

interface Props {
  open: boolean;
  handleNextStep: (btnName: string) => void;
}

export const NafathVerifyModal = ({ open, handleNextStep }: Props) => {
  const { t } = useTranslation();
  const [timer, setTimer] = useState<number | null>(60);

  useEffect(() => {
    if (!open) {
      setTimer(60);
      return;
    }

    if (timer! <= 0) {
      setTimer(null);
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer! - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [open, timer]);

  return (
    <Dialog
      open={open}
      fullScreen
      sx={{ background: "transparent" }}
      classes={{ paper: "transparentDialog" }}
    >
      <DialogContent classes={{ root: "transparentContent" }}>
        <Box
          bgcolor={"white"}
          maxWidth={"450px"}
          gap={"14px"}
          padding={"32px 20px"}
          borderRadius={"16px"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="/images/nafath.png"
            alt=""
            style={{ height: "auto", width: "125px" }}
          />
          <Typography fontWeight={700} fontSize={24}>
            {t("verifyWithNafath")}
          </Typography>
          <div>
            <Typography fontWeight={400} fontSize={16} textAlign={"center"}>
              {t("verificationText")}
            </Typography>
            <Typography fontWeight={400} fontSize={16} textAlign={"center"}>
              {t("verificationText2")}
            </Typography>
          </div>
          <Typography
            fontWeight={600}
            fontSize={24}
            height={"69px"}
            width={"69px"}
            borderRadius={"16px"}
            color={"#11998E"}
            border={"1px solid #11998E"}
            padding={"16px 16px"}
            textAlign={"center"}
          >
            50
          </Typography>
          <ButtonField
            name="requestNafathCode"
            lbl={t("requestNafathCode") + " " + (timer ? `(${timer})` : "")}
            handleClick={() => {}}
            variableStyle={{
              bgColor: "#11998E",
              borderRadius: "20px",
              size: "large",
            }}
            readOnly={timer! > 0 ? 1 : 0}
          />
        </Box>
      </DialogContent>
      <DialogActions classes={{ root: "transparentActionButton" }}>
        <Button
          type="button"
          variant="text"
          onClick={() => handleNextStep("nafath")}
        >
          <CloseIcon />
          <p>{t("close")}</p>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
