import { FC, useState } from "react";
import CheckboxField from "./CheckboxField";
import InputTextField from "./InputTextField";
import { Variable } from "../../service/workflow/WorkflowModel";
import { JDBC_TYPE } from "../../utils/constant";
import DecimalField from "./DecimalField";
import LabelField from "./LabelField";
import ButtonField from "./ButtonField";
import { regex } from "../../utils/regex";
import { IObject, ISelectOpt } from "../../service/commonModel";
import SelectField from "./SelectField";
import FileUploadField from "./FileUpload/FileUploadField";
import DatePickerField from "./DatePickerField";

const WorkflowFormField: FC<
  Variable & {
    handleBtnClick: (data: any) => void;
    groupedVariables: IObject;
    currentStepIndex: number;
    hideFieldNames?: string[];
    showLbl?: boolean;
  }
> = (props) => {
  const [comboListOptions, setComboListOptions] = useState<{
    [key: string]: ISelectOpt[];
  }>({});

  const {
    jdbcType,
    hidden,
    handleBtnClick,
    i18nName,
    groupedVariables,
    currentStepIndex,
    hideFieldNames,
    showLbl,
  } = props;

  if (hidden || hideFieldNames?.find((x) => x === i18nName)) return <></>;

  const transferredProps: Variable & {
    name: string;
    lbl: string;
    startIcon: any;
    endIcon: any;
  } = {
    ...props,
    name: props.i18nName,
    lbl: props.i18nName,
    startIcon: props.variableStyle?.startIcon,
    endIcon: props.variableStyle?.endIcon,
  };
  switch (Number(jdbcType)) {
    case JDBC_TYPE.Button:
      return (
        <ButtonField
          {...transferredProps}
          isServerClick
          groupedVariables={groupedVariables}
          currentStepIndex={currentStepIndex}
          handleClick={(data) => handleBtnClick(data)}
        />
      );

    case JDBC_TYPE.TextInput:
      return (
        <InputTextField
          {...transferredProps}
          placeholder={transferredProps.lbl}
          showLbl={showLbl ?? false}
          lbl={showLbl ? transferredProps.lbl : ""}
        />
      );

    case JDBC_TYPE.IntegerInput:
      if (transferredProps.comboListName)
        return (
          <SelectField
            {...transferredProps}
            fetchOpt={!comboListOptions[transferredProps.name]}
            options={comboListOptions[transferredProps.name]}
            setComboListOptions={setComboListOptions}
          />
        );
      return (
        <InputTextField
          valRegex={regex.Integer}
          {...transferredProps}
          placeholder={transferredProps.lbl}
          showLbl={showLbl ?? false}
          lbl={showLbl ? transferredProps.lbl : ""}
        />
      );

    case JDBC_TYPE.TextAreaInput:
      return (
        <InputTextField
          fieldType="textarea"
          {...transferredProps}
          placeholder={transferredProps.lbl}
          showLbl={showLbl ?? false}
          lbl={showLbl ? transferredProps.lbl : ""}
        />
      );

    case JDBC_TYPE.Checkbox:
      return <CheckboxField {...transferredProps} />;

    case JDBC_TYPE.DatePicker:
      return <DatePickerField {...transferredProps} />;

    case JDBC_TYPE.Label:
      return <LabelField {...transferredProps} />;

    case JDBC_TYPE.UploadDocument:
      return (
        <FileUploadField
          {...transferredProps}
          isServerUpload
          showLbl={showLbl ?? false}
        />
      );

    case JDBC_TYPE.DecimalInput:
      return (
        <DecimalField
          {...transferredProps}
          showLbl={showLbl ?? false}
          lbl={showLbl ? transferredProps.lbl : ""}
          placeholder={transferredProps.lbl}
        />
      );

    default:
      return <></>;
  }
};

export default WorkflowFormField;
