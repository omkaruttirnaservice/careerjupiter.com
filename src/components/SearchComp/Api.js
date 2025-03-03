import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

// const api = axios.create({
//   baseURL: "http://192.168.1.5:5000/api/search",
// });

export const searchCollege = async ({ searchKey, category, type }) => {
  const response = await axios.get(
    `${BASE_URL}/api/search/?searchKey=${searchKey}&category=${category}&type=${type}`
  );
  return response.data;
};
