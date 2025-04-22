import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Breadcrumb = ({
  mainCategoryName,
  subCategoryName,
  subSubCategoryName,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const type = query.get("type");
  const sub = query.get("sub_category");
  const subSub = query.get("sub_sub_name");
  const main_name = query.get("main_name");
  const Id = query.get("id");

  const [crumbs, setCrumbs] = useState([]);

  useEffect(() => {
    let array = [];
    if (main_name) {
      array.push({
        label: "Test List",
        path: "/profile/test",
      });
      array.push({
        label: main_name,
        path: `/profile/test?type=sub_category&id=${Id}&main_name=${main_name}`,
      });
    }

    if (sub) {
      array.push({
        label: sub,
        path: `/profile/test?type=sub_sub_category&id=${Id}&sub_category=${sub}&main_name=${main_name}`,
      });
    }

    if (subSub) {
      array.push({
        label: subSub,
      });
    }
    setCrumbs([...array]);
  }, []);

  return (
    <div className="text-sm text-gray-600 mb-2 ">
      {crumbs.map((crumb, index) => (
        <span key={index}>
          <Link
            to={crumb.path}
            disabled={!crumb.path}
            className={`${
              crumb.path ? "text-blue-600 hover:underline" : "text-gray-500"
            } font-medium`}
            style={{ textTransform: "capitalize" }}
          >
            {crumb.label}
          </Link>
          {index < crumbs.length - 1 && <span className="mx-2">→</span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
