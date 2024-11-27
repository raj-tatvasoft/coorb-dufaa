import { IObject, Variable } from "../service/commonModel";
import { ITaskDetail } from "../service/task/TaskModel";
import { taskService } from "../service/task/TaskService";
import { JDBC_TYPE } from "./constant";

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
    if (formFieldVal?.toString()) {
      if (variable.jdbcType === JDBC_TYPE.Checkbox) {
        newData.variables[key].numericValue = formFieldVal ? "1" : "0";
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
  callBack?: any
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
        callBack();
      }
    });
};

export const camelToPascal = (str: string) => {
  return str.replace(/^./, (match) => match.toUpperCase());
};
