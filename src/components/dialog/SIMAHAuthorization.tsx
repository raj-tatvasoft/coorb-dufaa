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
import CheckboxField from "../common/CheckboxField";
import ButtonField from "../common/ButtonField";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SIMAHAuthorization = ({ open, setOpen }: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} fullScreen classes={{ paper: "transparentDialog" }}>
      <DialogContent classes={{ root: "transparentContent simahContent" }}>
        <Box className="simahContentWrapper">
          {/* <img
            src="/images/nafath.png"
            alt=""
            style={{ height: "auto", width: "125px" }}
          /> */}
          <Typography fontWeight={700} fontSize={32} color="info">
            {t("SIMAH")}
          </Typography>
          <Typography fontWeight={700} fontSize={24}>
            {t("simahAuthorization")}
          </Typography>
          <CheckboxField
            name={"SIMAHCheckbox"}
            lbl={t("simahCheckboxLabel")}
            className="simahCheckbox"
          />
          <ButtonField
            name="requestNafathCode"
            lbl={t("continue")}
            handleClick={() => {}}
            endIcon="ForwardArrow.svg"
            variableStyle={{
              bgColor: "var(--darkBrown)",
              borderRadius: "20px",
              size: "large",
            }}
          />
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
