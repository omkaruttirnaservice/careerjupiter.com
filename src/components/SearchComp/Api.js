import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.5:5000/api/search",
});

export const searchCollege = async ({ searchKey, category, type }) => {
  const response = await api.get(
    `?searchKey=${searchKey}&collegeCategory=${category}&type=${type}`
  );
  return response.data;
};
