import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  ErrorMessage,
  Field,
  FieldProps,
  FormikContextType,
  useField,
  useFormikContext,
} from "formik";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps } from "../../service/commonModel";

export const ToggleButtonGroupField: FC<
  IGenericFieldProps & { subLbl?: string }
> = (props) => {
  const { t } = useTranslation();
  const { name, lbl = "", variableStyle, options, subLbl } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, meta] = useField(name);

  const {
    setFieldValue,
    setFieldTouched,
  }: FormikContextType<{ [key: string]: any }> = useFormikContext();

  return (
    <>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <div className="fieldWrapper">
            {variableStyle?.htmlLabel ? (
              <div
                dangerouslySetInnerHTML={{ __html: variableStyle?.htmlLabel }}
              />
            ) : (
              <>
                <label className="LoanTenorLabel">
                  {t(lbl ? t(lbl) : t(name))}
                </label>
                {subLbl && <p className="sliderSubLbl -mt-2">{t(subLbl)}</p>}
              </>
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
              onChange={(_, val) => {
                setFieldValue(name, val, true);
              }}
              onBlur={() => {
                setFieldTouched(name, true, true);
              }}
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
      {meta.error && meta.touched && (
        <span className="ml-3 errorText">
          <ErrorMessage name={name} />
        </span>
      )}
    </>
  );
};
