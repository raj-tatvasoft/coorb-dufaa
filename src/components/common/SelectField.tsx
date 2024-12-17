import { Autocomplete, TextField } from "@mui/material";
import { Field, FieldProps, useFormikContext } from "formik";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IGenericFieldProps,
  IObject,
  ISelectOpt,
} from "../../service/commonModel";
import { listService } from "../../service/list/ListService";

type Props = IGenericFieldProps &
  IObject & {
    setComboListOptions?: Dispatch<
      SetStateAction<{ [key: string]: ISelectOpt[] }>
    >;
  };

const SelectField: FC<Props> = ({
  name,
  options,
  onChange,
  required = false,
  readOnly,
  hideClr = false,
  fetchOpt = false,
  comboListName = "",
  lbl,
  hideHelp = false,
  setComboListOptions,
}) => {
  const { t } = useTranslation();
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const [localOptions, setLocalOptions] = useState<ISelectOpt[]>([]);
  useEffect(() => {
    if (Array.isArray(options)) setLocalOptions(options);
  }, [options]);

  useEffect(() => {
    if (fetchOpt && comboListName) getOptions();
  }, [fetchOpt, comboListName]);

  const getOptions = () => {
    listService.getListOptions(comboListName).then((res) => {
      if (res?.data) {
        const newOpts: ISelectOpt[] = [];
        Object.keys(res.data).forEach((key) => {
          newOpts.push({ label: res.data[key], value: key });
        });
        setLocalOptions(newOpts);
        if (setComboListOptions)
          setComboListOptions((prev) => ({
            ...prev,
            [name]: newOpts,
          }));
      }
    });
  };

  const handleChange = (_: React.SyntheticEvent, value: any) => {
    setFieldValue(name, value);
    setTimeout(() => {
      setFieldTouched(name, true, true);
    }, 0);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={`fieldWrapper ${hideHelp ? "fullGrid" : ""}`}>
          <Autocomplete
            disablePortal
            options={localOptions}
            size="small"
            getOptionLabel={(x) => x.label?.toString()}
            value={
              localOptions?.find(
                (x) => x.value?.toString() === field.value?.value?.toString()
              ) || null
            }
            onChange={handleChange}
            noOptionsText={t("noOptionsAvailable")}
            disabled={readOnly === 1}
            disableClearable={hideClr || required ? true : false}
            renderInput={(params) => (
              <TextField
                {...params}
                label={lbl ? `${t(lbl)} ${required ? "*" : ""}` : null}
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error ? meta.error : undefined}
                disabled={readOnly === 1}
              />
            )}
            onClose={() => setFieldTouched(name, true, true)}
            onBlur={() => setFieldTouched(name, true, true)}
          />
        </div>
      )}
    </Field>
  );
};

export default SelectField;
