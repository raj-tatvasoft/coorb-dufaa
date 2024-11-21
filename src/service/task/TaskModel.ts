import { IObject } from "../commonModel";
import { Status, Variable } from "../workflow/WorkflowModel";

export interface IDownloadFile {
  taskInstanceId: string;
  taskInstanceTokenId: string;
  variableTypeId: string;
  variableTypeTokenId: number;
}

export interface ITaskDetail {
  taskInstanceId: string;
  workflowInstanceId: string;
  addedOn: string;
  addedBy: string;
  savedOn: string;
  savedBy: string;
  committedOn: string;
  committedBy: string;
  statusInId: string;
  statusOutId: string;
  tenantId: string;
  nextTenantId: string;
  nextTaskTypeId: string;
  taskTypeId: string;
  data: number[];
  note: string;
  selectedTaskStatus: Status;
  businessErrorMessage: string;
  statuses: { [key: string]: Status };
  variables: { [key: string]: Variable };
  variablesByName: { [key: string]: string };

  formField?: IObject;
}
