import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constansts";

// const testCategories = [
//   { name: "Engineering", count: 10 },
//   { name: "HSC", count: 12 },
//   { name: "SSC", count: 8 },
//   { name: "Diploma", count: 6 },
//   { name: "ITI", count: 9 },
// ];

const SubSubTest_Category = () => {

  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const categoryId = query.get("Id");
  const sub_Category = query.get("sub_category");

  const { data, isLoading, error } = useQuery({
    queryKey: ["subCategories", categoryId],
    queryFn: async () => {
      return axios.post(`${BASE_URL}/api/iq_category/get-sub-sub-categories`, {
        mainCategoryId: categoryId,
        sub_category_name: sub_Category,
      });
    },
    enabled: !!categoryId, // don't run until id is available
  });

  const handle_SubCategory = () => {
    navigate("/profile/test/?type=Test_Card");
  };

  const handleBack = () => {
    navigate(-1);
  };

  console.log("get-sub-sub-categories", data);
  const testCategories = data?.data?.sub_categories;
  

  return (
    <div
      className="p-5 max-w-7xl mx-auto cursor-pointer"
      onClick={handle_SubCategory}
    >
      <button
        onClick={handleBack}
        className="flex items-center px-4 py-2 bg-purple-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition duration-300 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-300">
        Explore Test Sub Categories
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {testCategories.map((category) => {
          return (
            <div
              key={category.sub}
              className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition duration-300 ease-in-out hover:scale-105 border-t-4 border-purple-300"
            >
              <div className="flex items-center justify-between mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {category.sub}
              </h3>
              <p className="text-purple-500 text-2xl font-bold">
                {category.count}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubSubTest_Category;
