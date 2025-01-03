import {
  IconButton,
  InputAdornment,
  TextField,
  InputLabel,
} from "@mui/material";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps, IObject } from "../../service/commonModel";
import { checkIsIcon } from "../../utils/helperFunction";
import OTPInput from "./OTPField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import zxcvbn from "zxcvbn";

const InputTextField: FC<
  IGenericFieldProps & {
    showPasswordStrength?: boolean;
    decimalVariant?: "outlined" | "filled" | "standard";
    isSliderInput?: boolean;
    sliderFocusOut?: () => void;
  }
> = (props) => {
  const { t } = useTranslation();
  const {
    lbl = "",
    name,
    fieldType = "text",
    placeholder,
    required,
    readOnly,
    valRegex,
    startIcon,
    endIcon,
    variableStyle,
    showLbl = false,
    showPasswordStrength = false,
    decimalVariant = "outlined",
    isSliderInput = false,
    sliderFocusOut,
  } = props;

  const { setFieldValue, setFieldTouched }: FormikContextType<IObject> =
    useFormikContext();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const isTextArea = fieldType === "textarea";

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) =>
        variableStyle?.otpCount ? (
          <OTPInput
            fields={variableStyle.otpCount}
            handleChange={(val) => {
              setFieldValue(name, val?.join(""));
            }}
          />
        ) : (
          <div className="fieldWrapper">
            {lbl && showLbl && (
              <InputLabel
                htmlFor={`textfield-${name}`}
                className="inputLabel"
                error={Boolean(meta.touched && meta.error)}
              >
                {`${t(lbl)} ${required ? "*" : ""}`}
              </InputLabel>
            )}
            <TextField
              size="medium"
              classes={{
                root: `input-textfield ${
                  !field.value && Boolean(readOnly) ? "disabledWithNoValue" : ""
                } ${isSliderInput ? "sliderTextField" : ""}`,
              }}
              id={`textfield-${name}`}
              variant={decimalVariant}
              type={
                fieldType === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : fieldType
              }
              onCopy={(e) => {
                fieldType === "password" && e.preventDefault();
              }}
              onPaste={(e) => {
                fieldType === "password" && e.preventDefault();
              }}
              placeholder={placeholder ? t(placeholder) : ""}
              {...field}
              value={field.value ?? ""}
              multiline={isTextArea}
              rows={isTextArea ? 4 : 1}
              onChange={(e) => {
                const targetVal = e.target.value;
                if (fieldType === "password") {
                  const result = zxcvbn(targetVal);
                  const score = result.score;

                  // const rawValue = e.target.value.replace(/,/g, "");
                  // if (min && Number(rawValue) < min) {
                  //   debugger;
                  //   setFieldValue(name, min, true);
                  //   return;
                  // }

                  // if (max && Number(rawValue) > max) {
                  //   debugger;
                  //   setFieldValue(name, max);
                  //   return;
                  // }

                  if (score === 0 || score === 1) {
                    setPasswordStrength("Weak");
                  } else if (score === 2) {
                    setPasswordStrength("Medium");
                  } else if (score === 3 || score === 4) {
                    setPasswordStrength("Strong");
                  }
                  if (targetVal?.includes(" ")) return;
                }
                if (valRegex) {
                  if (valRegex.test(targetVal)) setFieldValue(name, targetVal);
                } else {
                  setFieldValue(name, targetVal);
                }
              }}
              onBlur={(e) => {
                setFieldTouched(name, true, true);
                setFieldValue(name, e.target?.value?.trim(), true);
                sliderFocusOut && sliderFocusOut();
              }}
              error={Boolean(meta.touched && meta.error)}
              helperText={meta.touched && meta.error ? meta.error : undefined}
              disabled={Boolean(readOnly)}
              autoComplete="off"
              slotProps={{
                input: {
                  startAdornment: startIcon ? (
                    <InputAdornment
                      position="start"
                      classes={{
                        root: "start-adornment",
                      }}
                    >
                      {checkIsIcon(startIcon) ? (
                        <img src={`images/${startIcon}`} />
                      ) : (
                        startIcon
                      )}
                    </InputAdornment>
                  ) : null,
                  endAdornment: endIcon ? (
                    isSliderInput ? (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "var(--warmOrange)",
                          fontWeight: "600",
                        }}
                      >
                        {t(endIcon)}
                      </p>
                    ) : (
                      <InputAdornment
                        position="end"
                        classes={{ root: "end-adornment" }}
                      >
                        {checkIsIcon(endIcon) ? (
                          <img src={`images/${endIcon}`} />
                        ) : (
                          endIcon
                        )}
                      </InputAdornment>
                    )
                  ) : fieldType === "password" ? (
                    <InputAdornment
                      position="end"
                      classes={{ root: "end-adornment" }}
                    >
                      <IconButton
                        size="large"
                        className="visibility-icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="large" />
                        ) : (
                          <Visibility fontSize="large" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                  style: { width: isSliderInput ? "120px" : "" },
                },
              }}
            />
            {fieldType === "password" &&
              field.value &&
              showPasswordStrength && (
                <div className="passwordStrength">
                  {t("passwordStrength", { strength: passwordStrength })}
                </div>
              )}
            {/* <FieldHelper desc={t(lbl + "_desc")} /> */}
          </div>
        )
      }
    </Field>
  );
};

export default InputTextField;
