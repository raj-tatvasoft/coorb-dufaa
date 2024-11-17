import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Field, FieldProps, useFormikContext } from "formik";
import { NumericFormat } from "react-number-format";
import { IGenericFieldProps } from "../../service/commonModel";
import { TextField } from "@mui/material";

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
          <NumericFormat
            customInput={TextField}
            size="small"
            id={`decimalField-${name}`}
            label={lbl ? `${t(lbl)} ${required ? "*" : ""}` : undefined}
            variant="outlined"
            type="text"
            placeholder={placeholder}
            {...field}
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
          />
        </div>
      )}
    </Field>
  );
};

export default DecimalField;
