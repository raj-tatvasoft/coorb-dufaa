export interface Status {
  id: string;
  i18nName: string;
  startingTask: boolean;
  endingTask: boolean;
  value?: string | number;
  label?: string | number;
}

export interface Variable {
  id: string;
  tokenId: number;
  i18nName: string;
  type: number;
  comboListName: string;
  required: number;
  hidden: number;
  readOnly: number;
  i18nGroupName: string;
  mimeType: string;
  jdbcType: number;
  auditable: number;
  exitClassId: string;
  exitClassDataId: string;
  instanceId: string;
  textValue: string;
  numericValue: string | number;
  displayOrder: number;

  variableStyle?: any;
}

export interface PendingTaskResponse {
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
  taskI18Name: string;
  workflowI18Name: string;
  userDisplayName: string;
  tenantI18Name: string;
  statusInDesc: string;
  loadedByOwner: boolean;
  // tokenId: number;
}

export interface Workflow {
  id: string;
  name: string;
  tokenId: number;
}

export interface ITaskStatusRes {
  message: string;
  errorCode: number;
  detailedReply: {
    statusName: string;
    lastStusChange: string;
  };
  timeStamp: string;
}

export interface ITaskSummary {
  message: string;
  errorCode: number;
  detailedReply: string[][];
}
