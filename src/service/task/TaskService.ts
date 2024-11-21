import { AxiosResponse } from "axios";
import { apiRequest } from "../interceptor";
import { ITaskDetail } from "./TaskModel";

class TaskService {
  load = async (
    taskInstanceId: string,
    tokenId: string
  ): Promise<AxiosResponse<ITaskDetail>> => {
    return apiRequest.post(`task/load`, {
      taskInstanceId,
      tokenId,
    });
  };

  release = async (taskInstanceId: string, tokenId: string) => {
    return apiRequest.post(`task/release`, {
      taskInstanceId,
      tokenId,
    });
  };

  save = async (payload: ITaskDetail) => {
    return apiRequest.post(`task/save`, payload);
  };

  commit = async (payload: ITaskDetail) => {
    return apiRequest.post(`task/commit`, payload);
  };

  buttonClick = async (payload: {
    task: ITaskDetail;
    buttonVarialeId: string;
  }) => {
    return apiRequest.post(`task/click`, payload);
  };
}

export const taskService = new TaskService();
