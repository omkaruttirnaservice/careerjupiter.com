// src/api.js
import axios from "axios";
import { BASE_URL } from "../../utils/constansts";


export const getUniversity = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/university/${id}`);
  return JSON.parse(response.data.data);
};