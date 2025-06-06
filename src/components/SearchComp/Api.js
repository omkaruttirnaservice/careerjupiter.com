import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

// export const GetSearchCollege = async ({ searchKey, category, type, dist , roadmap }) => {
//   // if (!type) return;
//   const response = await axios.get(
//     `${BASE_URL}/api/search/college/?searchKey=${searchKey}&category=${category}&type=${type}&dist=${dist}&roadmap=${roadmap}`
//   );

//   console.log(response.data , 'respose getserach college')
//   return response.data;

// };

export const GetSearchCollege = async ({
  searchKey ,
  category ,
  type ,
  dist ,
  roadmap ,
  page = 1,
}) => {
  // Add page parameter to the API call
  const response = await axios.get(
    `${BASE_URL}/api/search/college/?searchKey=${searchKey}&category=${category}&type=${type}&dist=${dist}&roadmap=${roadmap}&p=${page}`,
  )

  return response.data
}

// export const GetSearchClass = async ({ searchKey, category, type, dist , page = 1,  limit = 10,  }) => {
//   // if (!type) return;
//   const response = await axios.get(
//     `${BASE_URL}/api/search/class/?searchKey=${searchKey}&category=${category}&type=${type}&dist=${dist}&p=${page}&limit=${limit}`
//   );
//   return response.data;
// };


export const GetSearchClass = async ({
  searchKey ,
  category ,
  type = "class",
  dist ,
  page ,
  limit ,
}) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/search/class/?searchKey=${searchKey}&category=${category}&type=${type}&dist=${dist}&p=${page}&pt=${limit}`,
    )
    const responseData = response.data.data || response.data

    if (page === 1) {
      return {
        results: responseData.results || responseData,
        totalResults:
          responseData.totalResults || (responseData.results ? responseData.results.length : responseData.length),
        currentPage: 1,
        hasNextPage: false,
      }
    }

    return {
      results: responseData.results || responseData,
      totalResults:
        responseData.totalResults || (responseData.results ? responseData.results.length : responseData.length),
      currentPage: page,
      hasNextPage: false, 
    }
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}


export const getCollegeRoadmaps = async () => {
  const res = await fetch(`${BASE_URL}/api/college/roadmap`);
  return res.json();
};

export const GetSearchUniversity = async ({ searchKey, category, type, dist, page, limit }) => {
  const response = await axios.get(
    `${BASE_URL}/api/search/university/?searchKey=${searchKey}&category=${category}&type=${type}&dist=${dist}&p=${page}&pt=${limit}`
  );
  console.log(response.data.data.results, 'university ');
  return response.data.data;
};



export const getCollegeCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/college/Category`);
  return response.data;
};

export const getCollegeDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/college/Dist`);
  return response.data;
};

export const getClassCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/class/Category`);
    // console.log(response.data, "responpasdof catory")

  return response.data;
};

export const getClassDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/class/Dist`);
  return response.data;
};

export const getUniversityCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/university/search/Allcat`);
  return response.data;
};

export const getUniversityDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/university/search/Dist`);
  return response.data;
};


