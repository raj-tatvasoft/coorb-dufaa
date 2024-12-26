import { AxiosResponse } from "axios";
import { errorToast } from "../components/common/ToastMsg";
import { IObject, Variable } from "../service/commonModel";
import { ITaskDetail } from "../service/task/TaskModel";
import { taskService } from "../service/task/TaskService";
import { workflowService } from "../service/workflow/WorkflowService";
import { CONST_WORDS, JDBC_TYPE } from "./constant";
import { t } from "i18next";

export const checkIsIcon = (imagePath: string) => {
  const extenstion = imagePath.split(".")?.pop()?.toLowerCase();

  const iconsExtension = ["png", "jpg", "jpeg", "svg"];

  return iconsExtension.find((x) => x === extenstion);
};

export const transferTaskObjectForPayload = (data: IObject) => {
  const newData: ITaskDetail & {
    taskInstanceTokenId?: string;
  } = JSON.parse(JSON.stringify(data.initialDetails));
  Object.keys(newData?.variables).forEach((key: string) => {
    const variable = newData.variables[key];
    const formFieldVal = data[variable.i18nName];
    if (formFieldVal?.toString() || variable.jdbcType === JDBC_TYPE.Checkbox) {
      if (variable.jdbcType === JDBC_TYPE.Checkbox) {
        newData.variables[variable.id].numericValue =
          formFieldVal?.toString() === "true" ? 1 : 0;
        newData.variables[variable.id].textValue =
          formFieldVal?.toString() === "true" ? "true" : "false";
      } else if (
        variable.jdbcType === JDBC_TYPE.IntegerInput &&
        variable.comboListName &&
        formFieldVal
      ) {
        newData.variables[key].textValue = formFieldVal.label;
        newData.variables[key].numericValue = formFieldVal.value;
      } else if (variable.jdbcType !== JDBC_TYPE.UploadDocument) {
        newData.variables[key].textValue = formFieldVal;
      }
    }
  });
  newData.selectedTaskStatus = { ...data.selectedTaskStatus };

  //removing extra fields before passing data to backend
  newData.formField = undefined;
  newData.taskInstanceTokenId = undefined;
  newData.selectedTaskStatus.value = undefined;
  newData.selectedTaskStatus.label = undefined;

  return newData;
};

export const handleGenericButtonClick = (
  data: IObject,
  btnName: string,
  callBack?: any,
  finallyCallBack?: any
) => {
  const newData: ITaskDetail & {
    taskInstanceTokenId?: string;
  } = JSON.parse(JSON.stringify(data.initialDetails));

  let btnVariableId = "";
  Object.values(newData?.variables).forEach((variable: Variable) => {
    if (variable.i18nName === btnName && !btnVariableId) {
      btnVariableId = variable.id;
    }
  });

  taskService
    .buttonClick({
      buttonVarialeId: btnVariableId,
      task: transferTaskObjectForPayload(data),
    })
    .then((res) => {
      if (res?.data && callBack) {
        callBack(res.data);
      }
    })
    .finally(() => {
      if (finallyCallBack) finallyCallBack();
    });
};

export const camelToPascal = (str: string) => {
  return str.replace(/^./, (match) => match.toUpperCase());
};

export const formatWithCommaAndFractionDigits = (
  value: number | string,
  digits: number = 2
) => {
  return value?.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};

export const transferTaskObjectForFormValue = (
  values: any,
  setGroupedVariables?: any
) => {
  const newGrpVariables: Record<string, Variable[]> = {};

  const newValues: any = {
    selectedTaskStatus: Object.values(values?.statuses ?? {})[0],
    initialDetails: values,
  };
  if (values?.variables)
    Object.keys(values?.variables)?.forEach((key: any) => {
      const variable = (values.variables as any)[key];

      // initial value
      if (variable.jdbcType === JDBC_TYPE.Checkbox) {
        newValues[variable.i18nName] =
          variable.numericValue?.toString() === "1" ? true : false;
      } else if (
        variable.jdbcType === JDBC_TYPE.IntegerInput &&
        variable.comboListName &&
        variable.textValue &&
        variable.numericValue
      ) {
        newValues[variable.i18nName] = {
          value: variable.numericValue,
          label: variable.textValue,
        };
      } else {
        newValues[variable.i18nName] = variable.textValue;
      }

      // grouped variable
      const group = variable.i18nGroupName;
      newGrpVariables[group] = newGrpVariables[group] || [];
      newGrpVariables[group].push({ ...variable });
    });

  // sort the fields based on display order
  Object.keys(newGrpVariables).forEach((key) => {
    return newGrpVariables[key].sort((a, b) => a.displayOrder - b.displayOrder);
  });
  if (setGroupedVariables) setGroupedVariables(newGrpVariables);

  return newValues;
};

export const getFirstPendingWorkflowDetail = (): Promise<
  AxiosResponse<ITaskDetail, any> | undefined
> => {
  return workflowService.getpendingWorkflows().then((pendingRes) => {
    if (pendingRes?.data) {
      const data = pendingRes.data[0];
      return taskService
        .release(data.taskInstanceId, data.data[5].toString())
        .then((relRes) => {
          if (relRes?.data) {
            return taskService
              .load(data.taskInstanceId, data.data[5].toString())
              .then((res) => {
                if (res?.data) {
                  if (res.data.businessErrorMessage) {
                    errorToast(res.data.businessErrorMessage);
                  }
                  return res; // Return the response of type AxiosResponse<ITaskDetail, any>
                }
              });
          }
        });
    }
    return Promise.reject("No pending workflows found");
  });
};

export const getFirstPendingWorkflowDetailAndBtnLoadClick = (
  btnName: string,
  getValue: (data: IObject) => void
) => {
  return getFirstPendingWorkflowDetail().then((res) => {
    if (res) {
      const newValues = {
        ...transferTaskObjectForFormValue(res.data),
        selectedTaskStatus: Object.values(res.data.statuses)[0],
        initialDetails: res.data,
      };
      handleGenericButtonClick(newValues, btnName, (data: any) => {
        const val: any = Object.values(data.statuses)[0];
        const selectedTaskStatus = {
          ...val,
          value: val.id,
          label: t(val.i18nName),
        };
        getValue({
          ...transferTaskObjectForFormValue(data),
          selectedTaskStatus,
          initialDetails: data,
        });
      });
    }
  });
};

let storageUserName = "";
export const getUserName = () => {
  if (!storageUserName)
    storageUserName = localStorage.getItem(CONST_WORDS.username) ?? "";
  return storageUserName;
};

export const setUserName = (userName: string) => {
  localStorage.setItem(CONST_WORDS.username, userName);
  storageUserName = userName;
};
