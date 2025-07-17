import apiClient from "../../../api/apiClinet";
import type { UrlDataType, UrlSearchDataTypes } from "./urlTypes";

const BASE_PATH = "/scrape";

export const getUrlData = async (
  newUrlDataValues: UrlSearchDataTypes
): Promise<{ data: UrlDataType[]; message: string }> => {
  const response = await apiClient.post(`${BASE_PATH}`, newUrlDataValues);
  return response?.data;
};
