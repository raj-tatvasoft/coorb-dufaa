import { FC } from "react";
import CheckboxField from "./CheckboxField";
import InputTextField from "./InputTextField";
import { Variable } from "../../service/workflow/WorkflowModel";
import { JDBC_TYPE } from "../../utils/constant";
import DecimalField from "./DecimalField";
import LabelField from "./LabelField";
import ButtonField from "./ButtonField";
import { regex } from "../../utils/regex";
import { IObject } from "../../service/commonModel";

const WorkflowFormField: FC<
  Variable & {
    handleBtnClick: (data: any) => void;
    groupedVariables: IObject;
    currentStepIndex: number;
  }
> = (props) => {
  const {
    jdbcType,
    hidden,
    handleBtnClick,
    groupedVariables,
    currentStepIndex,
  } = props;

  if (hidden) return <></>;

  const transferredProps: Variable & {
    name: string;
    lbl: string;
    startIcon: any;
    endIcon: any;
  } = {
    ...props,
    name: "formField." + props.i18nName,
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
          lbl=""
          placeholder={transferredProps.lbl}
        />
      );

    case JDBC_TYPE.IntegerInput:
      //   if (transferredProps.comboListName)
      //     return (
      //       <SelectField
      //         {...transferredProps}
      //         fetchOpt={!comboListOptions[transferredProps.name]}
      //         options={comboListOptions[transferredProps.name]}
      //         setComboListOptions={setComboListOptions}
      //       />
      //     );
      return (
        <InputTextField
          valRegex={regex.Integer}
          {...transferredProps}
          lbl=""
          placeholder={transferredProps.lbl}
        />
      );

    case JDBC_TYPE.TextAreaInput:
      return (
        <InputTextField
          fieldType="textarea"
          {...transferredProps}
          lbl=""
          placeholder={transferredProps.lbl}
        />
      );

    case JDBC_TYPE.Checkbox:
      return <CheckboxField {...transferredProps} />;

    case JDBC_TYPE.Label:
      return <LabelField {...transferredProps} />;

    case JDBC_TYPE.DecimalInput:
      return (
        <DecimalField
          {...transferredProps}
          lbl=""
          placeholder={transferredProps.lbl}
        />
      );

    default:
      return <></>;
  }
};

export default WorkflowFormField;
