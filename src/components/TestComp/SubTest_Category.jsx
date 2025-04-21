import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constansts";

// const testCategories = [
//   { name: "Engineering", count: 10 },
//   { name: "HSC", count: 12 },
//   { name: "SSC", count: 8 },
//   { name: "Diploma", count: 6 },
//   { name: "ITI", count: 9 },
// ];

const SubTest_Category = () => {

    const navigate = useNavigate();
      const { search } = useLocation();
      const query = new URLSearchParams(search);
      const categoryId = query.get("id");

      const { data, isLoading, error } = useQuery({
        queryKey: ["subCategories", categoryId],
        queryFn: async () => {
           return axios.post(
            `${BASE_URL}/api/iq_category/sub-categories/${categoryId}`
          );
        },
        enabled: !!categoryId, // don't run until id is available
      });

      const testCategories =  data?.data?.sub_category_name;
      

    const handle_SubCategory = (sub_category) => {
      navigate(
        `/profile/test/?type=sub_sub_category&Id=${data?.data?.mainCategoryId}&sub_category=${sub_category}`
      );
    };

    
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="p-5 max-w-7xl mx-auto cursor-pointer"
    >
      <button
        onClick={handleBack}
        className="flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition duration-300 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
        Explore Test Sub Categories
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {testCategories?.map((category) => {
          return (
            <div
              onClick={() => handle_SubCategory(category.sub_category)}
              key={category.sub_category}
              className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition duration-300 ease-in-out hover:scale-105 border-t-4 border-orange-300"
            >
              <div className="flex items-center justify-between mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {category.sub_category}
              </h3>
              <p className="text-orange-500 text-2xl font-bold">
                {category.count}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubTest_Category;
