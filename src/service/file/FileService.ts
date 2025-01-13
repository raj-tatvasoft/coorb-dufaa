import { apiRequest } from "../interceptor";
import { IUploadFile, IDownloadFile } from "./FileModel";

class FileService {
  upload = async (payload: IUploadFile, byteArr: string) => {
    let url = `task/file/upload`;
    Object.keys(payload).forEach((key, i) => {
      const value = payload[key as keyof typeof payload];
      const encodedValue = encodeURIComponent(value as string);

      url += i === 0 ? `?${key}=${encodedValue}` : `&${key}=${encodedValue}`;
    });
    return await apiRequest.post(url, byteArr);
  };

  download = async (payload: IDownloadFile) => {
    return await apiRequest.get(`task/file/download`, payload);
  };

  getFileName = async (payload: {
    taskInstanceId: string;
    taskInstanceTokenId: string;
    variableTypeId: string;
    variableTypeTokenId: string;
  }) => {
    return apiRequest.get(`task/file/name`, payload);
  };
}

export const fileService = new FileService();
