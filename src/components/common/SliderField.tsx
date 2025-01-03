import { Slider, SliderThumb } from "@mui/material";
import { Field, FieldProps, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { IGenericFieldProps } from "../../service/commonModel";
import { regex } from "../../utils/regex";
import InputTextField from "./InputTextField";
import { errorToast } from "./ToastMsg";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ThumbComponentProps extends React.HTMLAttributes<unknown> {}

const Thumb = (props: ThumbComponentProps) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span>
        <img src="/images/SliderThumb.svg" alt="" />
      </span>
    </SliderThumb>
  );
};

const SliderField: FC<
  IGenericFieldProps & {
    formatValue?: (val: string | number) => string | number;
    rightLbl?: string;
    subLbl?: string;
    valLbl?: string;
    min: number;
    max: number;
    step: number;
    onSliderError?: () => void;
  }
> = (props) => {
  const {
    formatValue,
    lbl,
    rightLbl,
    subLbl,
    name,
    min,
    max,
    step,
    valLbl,
    onSliderError,
  } = props;
  const { setFieldValue } = useFormikContext();

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="sliderContainer">
          <div className="sliderLabel">
            {lbl && <p className="label">{t(lbl)}</p>}
            {rightLbl && (
              <div>
                <InputTextField
                  name={name}
                  decimalVariant="standard"
                  sliderFocusOut={() => {
                    if (
                      (max && Number(field.value) > max) ||
                      (min && Number(field.value) < min)
                    ) {
                      errorToast(`${t("invalid")} ${t(name)}`);
                      if (onSliderError) onSliderError();
                    }
                  }}
                  endIcon={valLbl}
                  isSliderInput
                  valRegex={regex.Integer}
                />
              </div>
            )}
          </div>
          {subLbl && (
            <p className="minMax">
              {typeof subLbl === "string" ? t(subLbl) : subLbl}
            </p>
          )}

          <div className="sliderWrapper">
            <Slider
              aria-label="Default"
              value={
                Number(field.value) >= 0 ? Number(field.value) : (null as any)
              }
              valueLabelDisplay="auto"
              step={step}
              marks
              min={min}
              max={max}
              valueLabelFormat={(val) => {
                return formatValue ? formatValue(val) : val;
              }}
              className="slider"
              slots={{ thumb: Thumb }}
              classes={{
                rail: "sliderRail",
                thumb: "sliderThumb",
                track: "sliderTrack",
              }}
              onChange={(_, val) => {
                setFieldValue(name, val);
              }}
            />
          </div>
          {meta.error && meta.touched && (
            <span className="errorText pt-2">{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
};

export default SliderField;
