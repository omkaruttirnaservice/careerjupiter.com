import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

export const getSubType = (id) => {
  return axios.get(`${BASE_URL}/api/roadmap/${id}`);
};
