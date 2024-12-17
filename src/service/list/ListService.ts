import { AxiosResponse } from "axios";
import { apiRequest } from "../interceptor";
import { IObject } from "../commonModel";

class ListService {
  getListOptions = async (
    listName: string
  ): Promise<AxiosResponse<IObject>> => {
    return await apiRequest.get(`lists/${listName}`);
  };
}

export const listService = new ListService();
