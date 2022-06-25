import { IDog } from "@models/IDog";
import axios from "axios";

export const fetchDogs = async (): Promise<IDog[]> => {
  const response = await axios.get<IDog[]>('/api/dog');
  return response.data;
};

export const fetchDogById = async (id: string): Promise<IDog> => {
  const response = await axios.get<IDog>(`/api/dog/${id}`);
  return response.data;
}