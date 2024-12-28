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
import CheckboxField from "../common/CheckboxField";
import ButtonField from "../common/ButtonField";
import { useFormikContext } from "formik";
import { IObject } from "../../service/commonModel";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleContinue: () => void;
}

export const SimahAuthModalFields = {
  SIMAHCheckbox: "SIMAHCheckbox",
};
export const SIMAHAuthorization = ({
  open,
  handleClose,
  handleContinue,
}: Props) => {
  const { t } = useTranslation();
  const { validateForm, setTouched } = useFormikContext();

  const onContinue = () => {
    validateForm().then((res) => {
      if (Object.keys(res)?.length) {
        const touchedFields: IObject = {};
        Object.keys(res).forEach((field) => {
          touchedFields[field] = true;
        });
        setTouched(touchedFields);
      } else {
        handleContinue();
      }
    });
  };
  return (
    <Dialog open={open} fullScreen classes={{ paper: "transparentDialog" }}>
      <DialogContent classes={{ root: "transparentContent simahContent" }}>
        <Box className="simahContentWrapper">
          <Typography fontWeight={700} fontSize={32} color="info">
            {t("SIMAH")}
          </Typography>
          <Typography fontWeight={700} fontSize={24}>
            {t("simahAuthorization")}
          </Typography>
          <CheckboxField
            name={SimahAuthModalFields.SIMAHCheckbox}
            lbl={t("simahCheckboxLabel")}
            className="simahCheckbox"
          />
          <ButtonField
            name="requestNafathCode"
            lbl={t("continue")}
            handleClick={onContinue}
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
        <Button type="button" variant="text" onClick={handleClose}>
          <CloseIcon />
          <p>{t("close")}</p>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
