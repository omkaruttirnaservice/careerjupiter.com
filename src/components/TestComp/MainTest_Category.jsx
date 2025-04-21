import React from "react";
import { LuNotebookPen } from "react-icons/lu";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { RiToolsFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMainTest_Category } from "./Api";

const testCategories = [
  { name: "Engineering", count: 10, icon: LuNotebookPen },
  { name: "HSC", count: 12, icon: FaUserGraduate },
  { name: "SSC", count: 8, icon: FaChalkboardTeacher },
  { name: "Diploma", count: 6, icon: GiGraduateCap },
  { name: "ITI", count: 9, icon: RiToolsFill },
];


const MainTest_Category = () => {
  const navigate = useNavigate();

  const { data: testCategory, refetch: getMainTestCategory } = useQuery({
    queryKey: ["getTestCategory"],
    queryFn: () => getMainTest_Category(),
    staleTime: 0,
  });

  const handle_SubCategory = (id) => {
    navigate(`/profile/test/?type=sub_category&id=${id}`);
  };

  console.log("testCategories", testCategory?.data?.data);
  

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-blue-600">
        Explore Test Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {testCategory?.data?.data.map((category) => {
          const Icon = LuNotebookPen;
          return (
            <div
              key={category.main_category}
              onClick={() => handle_SubCategory(category.mainCategoryId)}
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
    </div>
  );
};

export default MainTest_Category;
