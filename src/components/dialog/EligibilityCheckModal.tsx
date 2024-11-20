import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
}

export const EligibilityCheckModal = ({ open }: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      fullScreen
      sx={{ background: "transparent" }}
      classes={{ paper: "transparentDialog" }}
    >
      <DialogContent classes={{ root: "transparentContent" }}>
        <Box className={"eligibility-background"}>
          <img src="/images/logoBackground.png" alt="" />
          <Typography>{t("workingOnEligibilityChecking")}</Typography>
        </Box>
        <Typography
          className="waitText"
          color="#FFD17A"
          textAlign={"center"}
          fontSize={12}
        >
          {t("thisMightTakeMoment")}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
