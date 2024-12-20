export interface IDownloadFile {
  taskInstanceId: string;
  taskInstanceTokenId: string;
  variableTypeId: string;
  variableTypeTokenId: number;
}

export interface IUploadFile {
  fileName: string;
  flowInstanceId: number;
  flowInstanceTokenId: number;
  taskInstanceId: number;
  taskInstanceTokenId: number;
  variableTypeId: string;
  variableTypeTokenId: number;
}
