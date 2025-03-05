import axios from "axios";
import { BASE_URL } from "../../utils/constansts";


export const getUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/api/auth/${userId}`);
  return response.data;
};
