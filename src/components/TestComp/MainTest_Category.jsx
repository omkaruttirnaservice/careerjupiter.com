import React, { useEffect } from "react";
import { LuNotebookPen } from "react-icons/lu";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getMainTest_Category } from "./Api";
import Breadcrumb from "./Breadcrumb";
import Swal from "sweetalert2";
const MainTest_Category = () => {
  const navigate = useNavigate();

  const {
    data: testCategory,
    mutate: fetchTestCategory,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: getMainTest_Category,
  });

  useEffect(() => {
    fetchTestCategory();
  }, []);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "",
        text: "We’re experiencing high traffic or a temporary issue. Please try again.",
        icon: "info",
        buttons: {
          retry: {
            text: "ok",
            value: "retry",
          },
        },
      }).then((value) => {
        if (value === "retry") {
          fetchTestCategory();
        }
      });
    }
  }, [isError, fetchTestCategory]);

  const handle_SubCategory = (id, name) => {
    navigate(`/profile/test?type=sub_category&id=${id}&main_name=${name}`);
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto mt-0">
      <Breadcrumb />
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-blue-600">
        Explore Test Categories
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : testCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {testCategory?.data?.data.map((category, index) => {
            const icons = [
              LuNotebookPen,
              FaUserGraduate,
              FaChalkboardTeacher,
              GiGraduateCap,
            ];
            const Icon = icons[index % icons.length];

            return (
              <div
                key={category.mainCategoryId}
                onClick={() =>
                  handle_SubCategory(
                    category.mainCategoryId,
                    category.main_category
                  )
                }
                className="group bg-white shadow-lg rounded-2xl p-6 border-t-4 border-blue-600 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-blue-700 transition">
                  {category.main_category}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Available Tests</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-sm font-bold rounded-md">
                    {category.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MainTest_Category;