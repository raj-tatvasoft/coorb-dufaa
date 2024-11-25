import { FC } from "react";
import {
  IGenericFieldProps,
  IObject,
  Variable,
} from "../../service/commonModel";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { taskService } from "../../service/task/TaskService";
import { FormikContextType, useFormikContext } from "formik";
import { ITaskDetail } from "../../service/task/TaskModel";
import { errorToast } from "./ToastMsg";
// import { transferObjectForTaskSave } from "../../pages/WorkflowFormPage";

const ButtonField: FC<
  IGenericFieldProps & {
    isServerClick?: boolean;
    handleClick: (data?: any) => void;
    groupedVariables?: IObject;
    currentStepIndex?: number;
  }
> = (props) => {
  const { t } = useTranslation();
  const {
    variant = "contained",
    lbl,
    isServerClick,
    handleClick,
    variableStyle,
    startIcon,
    endIcon,
    groupedVariables,
    currentStepIndex,
  } = props;
  const {
    values,
    setFieldTouched,
    validateForm,
    errors,
  }: FormikContextType<IObject> = useFormikContext();

  const validateCurrentStepFields = async (callback?: any) => {
    if (groupedVariables && Number(currentStepIndex) >= 0) {
      const groupNames = Object.keys(groupedVariables);
      const currentGroupName = groupNames[Number(currentStepIndex)];
      const currentGroupVariables = groupedVariables[currentGroupName];
      currentGroupVariables.forEach((variable: Variable) => {
        const fieldName = variable.i18nName;
        setFieldTouched(`formField.${fieldName}`, true, false);
      });
      await validateForm();
      const hasErrors = currentGroupVariables.some((variable: Variable) => {
        const fieldName = variable.i18nName;
        return (errors as any)?.formField?.[fieldName];
      });

      if (!hasErrors) {
        if (callback) callback();
        return true;
      } else {
        errorToast(t("commonValidationMsg"));
      }
    }
  };

  const handleBtnClick = () => {
    if (isServerClick) {
      taskService
        .buttonClick({
          // task: transferObjectForTaskSave(values) as ITaskDetail,
          buttonVarialeId: props.id!.toString(),
        })
        .then((res) => {
          if (res?.data) handleClick(res?.data);
        })
        .finally(() => {
          handleClick();
        });
    } else if (handleClick) {
      handleClick();
    }
  };

  return (
    <div className="fieldWrapper">
      <Button
        type="button"
        variant={variant}
        size={variableStyle?.size || "medium"}
        onClick={() => {
          if (variableStyle?.isValidateBeforeClick) {
            validateCurrentStepFields(handleBtnClick);
          } else {
            handleBtnClick();
          }
        }}
        className="genericBtn"
        style={{
          backgroundColor: variableStyle?.bgColor,
          color: variableStyle?.color,
          fontWeight: variableStyle?.fontWeight,
          justifyContent: variableStyle?.justifyContent,
          height: variableStyle?.height,
          borderRadius: variableStyle?.borderRadius,
        }}
      >
        {startIcon && <img src={`images/${startIcon}`} className="mr-2" />}
        {lbl ? t(lbl) : ""}
        {endIcon && <img src={`images/${endIcon}`} className="ml-2" />}
      </Button>
    </div>
  );
};

export default ButtonField;
