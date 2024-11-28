import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  Field,
  FieldProps,
  FormikContextType,
  useField,
  useFormikContext,
} from "formik";
import { FC, useEffect, useState } from "react";
import { IGenericFieldProps } from "../../service/commonModel";
import { useTranslation } from "react-i18next";

export const ToggleButtonGroupField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const { name, lbl = "", variableStyle, options } = props;
  const [field] = useField(name);
  const [val, setVal] = useState<any>(null);

  const {
    setFieldValue,
    setFieldTouched,
  }: FormikContextType<{ [key: string]: any }> = useFormikContext();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleSetFieldVal();
    }, 200);
    return () => {
      clearTimeout(timeOut);
    };
  }, [val]);

  useEffect(() => {
    setVal(field.value);
  }, [field.value]);

  const handleSetFieldVal = (
    event?: React.MouseEvent<HTMLElement>,
    newVal = val
  ) => {
    if (field.value !== val) setFieldTouched(name, true, true);
    setFieldValue(name, newVal, true);
  };

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <div className="fieldWrapper">
          {variableStyle?.htmlLabel ? (
            <div
              dangerouslySetInnerHTML={{ __html: variableStyle?.htmlLabel }}
            />
          ) : (
            <label className="LoanTenorLabel">
              {t(lbl ? t(lbl) : t(name))}
            </label>
          )}
          <ToggleButtonGroup
            fullWidth
            exclusive
            classes={{
              grouped: "buttons",
              root: "toggleButtonGroup",
              firstButton: "firstButton",
              lastButton: "lastButton",
              selected: "selected",
            }}
            {...field}
            onChange={handleSetFieldVal}
          >
            {options?.map((option, i) => (
              <ToggleButton
                classes={{ selected: "selected" }}
                value={option.value}
                key={i}
              >
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      )}
    </Field>
  );
};
