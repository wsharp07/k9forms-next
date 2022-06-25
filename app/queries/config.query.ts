import axios from "axios";

interface IAppConfig {
  surgeon: string;
}

export const fetchConfig = async () => {
  const response = await axios.get<IAppConfig>('/api/config');
  return response.data;
}