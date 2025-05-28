// import axios from "axios";
// import { BASE_URL } from "../../utils/constansts";

// export const getUniversityCategory = async () => {
//   const response = await axios.get(`${BASE_URL}/api/university/search/Allcat`);
//   return response.data;
// };

// export const getUniversityDist = async () => {
//   const response = await axios.get(`${BASE_URL}/api/university/search/Dist`);
//   return response.data;
// };

// export const searchUniversity = async (params = {}) => {
//   const response = await axios.get(`${BASE_URL}/api/search/university`, {
//     params: {
//       ...params,
//       type: "university",
//     },
//   });
//   return response.data?.results || [];
// };
