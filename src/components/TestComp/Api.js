import axios from "axios";
import { BASE_URL } from "../../utils/constansts";


export const getTest = async (testLevel) => {
  const response = await axios.get(`${BASE_URL}/api/iqtest?type=${testLevel}`);
  return response.data;
};
