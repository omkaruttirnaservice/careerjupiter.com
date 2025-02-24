import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.17:5000",
});

export const userSignUp = (data) => {
  return api.post("/api/auth/signup", data);
};
