import { IRabiesInfo } from "@models/IRabiesInfo";
import axios from "axios";

export const fetchRabiesInfo = async (id: string): Promise<IRabiesInfo> => {
  const response = await axios.get<IRabiesInfo>(`/api/dog/${id}/rabiesInfo`);
  return response.data;
};