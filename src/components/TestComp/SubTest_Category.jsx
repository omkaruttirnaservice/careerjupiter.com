import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { FaArrowLeft, FaUserGraduate } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constansts";
import Breadcrumb from "./Breadcrumb";

const SubTest_Category = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const categoryId = query.get("id");
  const main_name = query.get("main_name");

  const {
    data,
    mutate: fetchSubCategories,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: () =>
      axios.post(`${BASE_URL}/api/iq_category/sub-categories/${categoryId}`),
  });

  useEffect(() => {
    if (categoryId) {
      fetchSubCategories();
    }
  }, [categoryId]);

  const testCategories = data?.data?.sub_category_name;

  const mainCategoryName = main_name;
  const subCategoryName = data?.data?.sub_category_name;

  const handle_SubCategory = (sub_category) => {
    navigate(
      `/profile/test?type=sub_sub_category&id=${data?.data?.mainCategoryId}&sub_category=${sub_category}&main_name=${main_name}`
    );
    fetchSubCategories();
  };

  useEffect(() => {
    if (isError) {
      navigate("/profile/test");
    }
  }, [isError, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className=" max-w-7xl mx-auto cursor-pointer">
      {/* <button
        onClick={handleBack}
        className="flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition duration-300 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button> */}
      <Breadcrumb
        mainCategoryName={mainCategoryName}
        subCategoryName={subCategoryName}
      />

      <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
        Categories Under {mainCategoryName}
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">
          Failed to load subcategories.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {testCategories?.map((category) => (
            <div
              onClick={() => handle_SubCategory(category.sub_category)}
              key={category.sub_category}
              className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition duration-300 ease-in-out hover:scale-105 border-t-4 border-orange-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                  <FaUserGraduate className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {category.sub_category}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Available Tests</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-600 text-sm font-bold rounded-md">
                  {category.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubTest_Category;
