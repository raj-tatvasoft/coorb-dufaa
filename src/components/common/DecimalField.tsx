import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Field, FieldProps, useFormikContext } from "formik";
import { NumericFormat } from "react-number-format";
import { IGenericFieldProps } from "../../service/commonModel";
import { InputAdornment, InputLabel, TextField } from "@mui/material";
import { checkIsIcon } from "../../utils/helperFunction";

interface IDecimalFieldProps extends IGenericFieldProps {
  fractionDigits?: number;
}

const DecimalField: FC<IDecimalFieldProps> = ({
  name,
  lbl,
  placeholder,
  required,
  readOnly,
  fractionDigits = 2,
  startIcon,
  endIcon,
  showLbl = false,
}) => {
  const { t } = useTranslation();
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");

    setFieldTouched(name, true, true);

    if (rawValue === "") {
      setFieldValue(name, "", true);
    } else {
      const parsedValue = parseFloat(rawValue);
      if (!isNaN(parsedValue)) {
        setFieldValue(name, parsedValue.toFixed(fractionDigits), true);
      } else {
        setFieldValue(name, "", true);
      }
    }
  };

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
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
          <NumericFormat
            customInput={TextField}
            classes={{
              root: `input-textfield ${
                !field.value && Boolean(readOnly) ? "disabledWithNoValue" : ""
              }`,
            }}
            size="medium"
            id={`decimalField-${name}`}
            variant="outlined"
            type="text"
            {...field}
            placeholder={placeholder ? t(placeholder) : undefined}
            value={field.value || ""}
            onChange={handleValueChange}
            decimalScale={fractionDigits}
            fixedDecimalScale
            thousandSeparator=","
            allowNegative={false}
            onBlur={() => {
              setFieldTouched(name, true, true);
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
                    classes={{ root: "start-adornment" }}
                  >
                    {checkIsIcon(startIcon) ? (
                      <img src={`images/${startIcon}`} />
                    ) : (
                      startIcon
                    )}
                  </InputAdornment>
                ) : null,
                endAdornment: endIcon ? (
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
                ) : null,
              },
            }}
          />
        </div>
      )}
    </Field>
  );
};

export default DecimalField;
