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
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const NafathVerifyModal = ({ open, setOpen }: Props) => {
  const { t } = useTranslation();

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
          <Typography fontWeight={400} fontSize={16} textAlign={"center"}>
            {t("verificationText")}
          </Typography>
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
        </Box>
      </DialogContent>
      <DialogActions classes={{ root: "transparentActionButton" }}>
        <Button type="button" variant="text" onClick={() => setOpen(false)}>
          <CloseIcon />
          <p>{t("close")}</p>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
