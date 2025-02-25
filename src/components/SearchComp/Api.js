import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.17:5000/api/search",
});

export const searchCollege = async ({ searchKey, category, type }) => {
  const response = await api.get(
    `?searchKey=${searchKey}&collegeCategory=${category}&type=${type}`
  );
  return response.data; // Return API response data
};

// {
//             "location": {
//                 "lat": 26.9124,
//                 "lan": 75.7873
//             },
//             "address": {
//                 "line1": "10 Court Road",
//                 "line2": "Judicial Complex",
//                 "pincode": "302001",
//                 "state": "Rajasthan",
//                 "dist": "Jaipur"
//             },
//             "info": {
//                 "description": "A prestigious law college offering LLB and LLM programs."
//             },
//             "_id": "67b98ba6d7a07873947e0768",
//             "collegeName": "Sandip College",
//             "affiliatedUniversity": "National Law University",
//             "collegeCategory": "Diploma",
//             "collegeType": "Government",
//             "contactDetails": "9356348906",
//             "websiteURL": "https://www.mnolawcollege.ac.in",
//             "establishedYear": 1980,
//             "accreditation": "Bar Council of India Approved",
//             "admissionProcess": "CLAT Exam",
//             "applicationFormURL": "https://www.mnolawcollege.ac.in/apply",
//             "createdAt": "2025-02-22T08:32:38.796Z",
//             "updatedAt": "2025-02-22T08:32:38.796Z",
//             "__v": 0
//         },
