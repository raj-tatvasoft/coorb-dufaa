import { InputAdornment, TextField } from "@mui/material";
import {
  Field,
  FieldProps,
  FormikContextType,
  useField,
  useFormikContext,
} from "formik";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps } from "../../service/commonModel";

const InputTextField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const {
    lbl = "",
    name,
    fieldType = "text",
    placeholder,
    required,
    readOnly,
    valRegex,
    startEndroment,
    endEndroment,
  } = props;
  const [field] = useField(name);

  const {
    setFieldValue,
    setFieldTouched,
  }: FormikContextType<{ [key: string]: any }> = useFormikContext();

  const [val, setVal] = useState<string>("");

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

  const handleSetFieldVal = (newVal = val) => {
    if (field.value !== val) setFieldTouched(name, true, true);
    setFieldValue(name, newVal, true);
  };

  const isTextArea = fieldType === "textarea";

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="fieldWrapper">
          <TextField
            size="medium"
            classes={{ root: "input-textfield" }}
            id={`textfield-${name}`}
            label={lbl ? `${t(lbl)} ${required ? "*" : ""}` : undefined}
            variant="outlined"
            type={fieldType}
            placeholder={placeholder}
            {...field}
            value={val ?? ""}
            multiline={isTextArea}
            rows={isTextArea ? 4 : 1}
            onChange={(e) => {
              const targetVal = e.target.value;
              if (valRegex) {
                if (valRegex.test(targetVal)) setVal(targetVal);
              } else {
                setVal(targetVal);
              }
            }}
            onBlur={(e) => {
              setFieldTouched(name, true, true);
              setFieldValue(name, e.target?.value?.trim(), true);
            }}
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error ? meta.error : undefined}
            disabled={Boolean(readOnly)}
            autoComplete="off"
            InputProps={{
              startAdornment: startEndroment ? (
                <InputAdornment
                  position="start"
                  classes={{ root: "start-adornment" }}
                >
                  {startEndroment ? startEndroment : ""}
                </InputAdornment>
              ) : null,
              endAdornment: endEndroment ? (
                <InputAdornment position="end">
                  {endEndroment ? endEndroment : ""}
                </InputAdornment>
              ) : null,
            }}
          />
          {/* <FieldHelper desc={t(lbl + "_desc")} /> */}
        </div>
      )}
    </Field>
  );
};

export default InputTextField;
