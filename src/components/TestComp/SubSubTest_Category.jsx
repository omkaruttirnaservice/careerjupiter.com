import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaChalkboardTeacher } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constansts";
import Breadcrumb from "./Breadcrumb";
import LoadingTestCard from "../loading-skeleton/LoadingTestCard";

const SubSubTest_Category = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const categoryId = query.get("id");
  const sub_Category = query.get("sub_category");
  const main_name = query.get("main_name");
  const [subSubName, setSubSubName] = useState(null);

  // const {
  //   data,
  //   mutate: fetchSubSubCategories,
  //   isLoading,
  //   isError,
  // } = useMutation({
  //   mutationFn: () =>
  //     axios.post(`${BASE_URL}/api/iq_category/get-sub-sub-categories`, {
  //       mainCategoryId: categoryId,
  //       sub_category_name: sub_Category,
  //     }),
  // });

  // useEffect(() => {
  //   if (categoryId && sub_Category) {
  //     fetchSubSubCategories();
  //   }
  // }, [categoryId, sub_Category]);

    const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subSubTestCategory"],
    queryFn: () =>
      axios.post(`${BASE_URL}/api/iq_category/get-sub-sub-categories`, {
        mainCategoryId: categoryId,
        sub_category_name: sub_Category,
      }),
  });

  const testCategories = data?.data?.sub_categories;

  const mainCategoryName = main_name;
  const subCategoryName = data?.data?.sub_category_name;
  const subSubCategoryName = subSubName;

  const handle_SubCategory = (sub_name, id, sub_sub_name) => {
    navigate(
      `/profile/test/?type=Test_Card&id=${id}&sub_category=${sub_name}&sub_sub_name=${sub_sub_name}&main_name=${main_name}`
    );
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
    <div className=" max-w-7xl mx-auto">

      <Breadcrumb
        mainCategoryName={mainCategoryName}
        subCategoryName={subCategoryName}
        subSubCategoryName={subSubName}
      />

      <h2 className="text-2xl font-bold mb-6 text-center text-purple-500">
        Categories Under {subCategoryName}
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500"><LoadingTestCard/></p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load data.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {testCategories?.map((category) => (
            <div
              key={category.sub}
              onClick={() =>
                handle_SubCategory(
                  data?.data?.sub_category_name,
                  data?.data?.mainCategoryId,
                  category.sub
                )
              }
              className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition duration-300 ease-in-out hover:scale-105 border-t-4 border-purple-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-full ">
                  <FaChalkboardTeacher className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {category.sub}
              </h3>
              <span className="text-sm text-gray-500">Available Tests</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-600 text-sm font-bold rounded-md">
                {category.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubSubTest_Category;
