import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.5:5000",
});

export const userSignUp = (data) => {
  return api.post("/api/auth/signup", data);
};

export const getCollege = async (id) => {
  const response = await api.get(`/api/college/${id}`);
  return JSON.parse(response.data.data);
};