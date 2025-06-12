// import { useLocation } from "react-router-dom";
// import TestCard from "./TestCard";
// import TestResult from "./TestResult";
// import MainTest_Category from "./MainTest_Category";
// import SubTest_Category from "./SubTest_Category";
// import SubSubTest_Category from "./SubSubTest_Category";
// import InProgressTest from "./InProgressTest";

// const ComponentA = () => <h2>Component A</h2>;

// const QueryBasedComponent = () => {
//   const { search } = useLocation();
//   const query = new URLSearchParams(search);
//   const type = query.get("type");

//   const componentMap = {
//     A: <ComponentA />,
//     result: <TestResult />,
//     sub_category: <SubTest_Category />,
//     sub_sub_category: <SubSubTest_Category />,
//     Test_Card: <TestCard />,
//   };

//   // return componentMap[type] || <TestCard />;
//   return componentMap[type] || <MainTest_Category />;
// };

// export default QueryBasedComponent;




import { useLocation } from "react-router-dom";
import TestCard from "./TestCard";
import RoadmapTestCard from "./RoadmapTestCard"; // ⬅️ Import the new component
import TestResult from "./TestResult";
import MainTest_Category from "./MainTest_Category";
import SubTest_Category from "./SubTest_Category";
import SubSubTest_Category from "./SubSubTest_Category";

const ComponentA = () => <h2>Component A</h2>;

const QueryBasedComponent = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const type = query.get("type");
  const roadmapId = query.get("roadmap");

  // ✅ If roadmap ID exists, show RoadmapTestCard
  if (roadmapId) {
    console.log("🚀 Roadmap ID detected:", roadmapId);
    console.log("📋 Showing RoadmapTestCard for roadmap tests");
    return <RoadmapTestCard roadmapId={roadmapId} />;
  }

  const componentMap = {
    A: <ComponentA />,
    result: <TestResult />,
    sub_category: <SubTest_Category />,
    sub_sub_category: <SubSubTest_Category />,
    Test_Card: <TestCard externalTestList={[]} externalCompetedTestList={[]} />,
  };

  // 🧭 Return component based on type param, or default to MainTest_Category
  return componentMap[type] || <MainTest_Category />;
};

export default QueryBasedComponent;
