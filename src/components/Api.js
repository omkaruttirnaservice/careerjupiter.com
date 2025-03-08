import axios from "axios";
import { BASE_URL } from "../utils/constansts";

export const getCollege = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/college/${id}`);
  return (response.data.data);
};