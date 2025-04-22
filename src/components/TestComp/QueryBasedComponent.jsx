import { useLocation } from "react-router-dom";
import TestCard from "./TestCard";
import TestResult from "./TestResult";
import MainTest_Category from "./MainTest_Category";
import SubTest_Category from "./SubTest_Category";
import SubSubTest_Category from "./SubSubTest_Category";

const ComponentA = () => <h2>Component A</h2>;

const QueryBasedComponent = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const type = query.get("type");

  const componentMap = {
    A: <ComponentA />,
    result: <TestResult />,
    sub_category: <SubTest_Category />,
    sub_sub_category: <SubSubTest_Category />,
    Test_Card: <TestCard />,
  };

  // return componentMap[type] || <TestCard />;
   return componentMap[type] || <MainTest_Category />;
};

export default QueryBasedComponent;