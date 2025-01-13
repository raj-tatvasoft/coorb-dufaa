import { AxiosResponse } from "axios";
import { apiRequest } from "../interceptor";
import { ITaskStatusRes, ITaskSummary } from "./WorkflowModel";

class WorkflowService {
  getStartableWorkflows = async () => {
    return await apiRequest.get(`workflow/startable`);
  };

  getpendingWorkflows = async () => {
    return await apiRequest.get(`tasks/pending`);
  };

  instantiate = async (
    workflowTypeToken: string,
    workflowTypeTokenId: string
  ) => {
    return apiRequest.post(`workflow/instantiate`, {
      workflowTypeToken,
      workflowTypeTokenId,
    });
  };

  startWorkflow = async (id: string, tokenId: number) => {
    return apiRequest.post(`workflow/start/${id}`, {
      tokenId,
    });
  };

  getStatus = async (): Promise<AxiosResponse<ITaskStatusRes>> => {
    return apiRequest.get(`flow/status`);
  };

  getSummary = async (): Promise<AxiosResponse<ITaskSummary>> => {
    return apiRequest.get(`flow/summary`);
  };
}

export const workflowService = new WorkflowService();
