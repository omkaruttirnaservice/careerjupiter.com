import { useState } from "react";
import { NavLink } from "react-router-dom";
import TypewriterComponent from "../components/Typewriter";
import MultiCards from "../components/MultiCards";
import { cardDataProvider } from "../store/DashbordData";
import Nav from "./Nav";
import TagsSection from "../components/TagsSection";
import { LuNotebookPen } from "react-icons/lu";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const Data = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D", // Replace with your image URL
    name: "first",
    description:
      "A leading institution offering world-class education in various fields.",
    rating: 4.5,
  },
  {
    id: 2,
    image:
      "https://media.istockphoto.com/id/472942802/photo/madras-university.webp?a=1&b=1&s=612x612&w=0&k=20&c=fXhlM6GIBVUNwb4Bxs7MWxL9wLgeiM-cw_Mr6MWdb3g=", // Replace with your image URL
    name: "second",
    description:
      "A leading institution offering world-class education in various fields.",
    rating: 4.5,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D", // Replace with your image URL
    name: "third",
    description:
      "A leading institution offering world-class education in various fields.",
    rating: 4.5,
  },
  {
    id: 4,
    image:
      "https://media.istockphoto.com/id/472942802/photo/madras-university.webp?a=1&b=1&s=612x612&w=0&k=20&c=fXhlM6GIBVUNwb4Bxs7MWxL9wLgeiM-cw_Mr6MWdb3g=", // Replace with your image URL
    name: "forth",
    description:
      "A leading institution offering world-class education in various fields.",
    rating: 4.5,
  },
];

const HeroSection = () => {
  const [collegeData, setCollegeData] = useState(Data);
  const [filteredData, setFilteredData] = useState(Data);

  const handleSearch = (val) => {
    if (val.trim() === "") {
      setFilteredData(collegeData);
    } else {
      const searchData = collegeData.filter((eachCollege) =>
        eachCollege.name.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredData(searchData);
    }
  };

  return (
    <>
      <cardDataProvider.Provider value={{ collegeData: filteredData }}>
        <div className="relative bg-gray-50 overflow-hidden">
          <div className="fixed flex items-center justify-center top-1/2 right-4 transform -translate-y-1/2 w-[80px] h-[45px] bg-white rounded-full rounded-bl-[50%] z-50 shadow-lg animate-bounce">
            <NavLink
              to="/iq"
              className="  text-white hover:text-green-800 flex flex-row gap-2"
            >
              <div className="flex items-center justify-center">
                <h1 className="font-bold text-2xl text-green-500">
                  <LuNotebookPen />
                </h1>
              </div>
              <div className=" flex items-center justify-center w-[35px] h-[35px]  bg-green-500 rounded-br-[50%] rounded-tl-[50%] rounded-tr-[50%] mr-1">
                <h1 className="font-bold text-2xl">Q</h1>
              </div>
            </NavLink>
          </div>

          <div className="relative pt-14 pb-16 sm:pb-14 sm:pt-4 md:pt-0">
            <main className="mx-auto max-w-7xl px-4 sm:mt-14">
              <div className="text-center ">
                {/* <SearchComponent onSearch={handleSearch} /> */}
                <TagsSection />
                <div className="flex flex-row justify-center gap-3 sm:gap-4 md:gap-5 text-xl font-bold sm:text-3xl md:text-4xl">
                  <h1 className=" text-gray-900">Find your</h1>
                  <span className="text-blue-400">
                    <TypewriterComponent
                      strings={["Best College", "Best School", "Best Class"]}
                      autoStart={true}
                      loop={true}
                    />
                  </span>
                </div>

                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
              </div>
            </main>
          </div>
        </div>
        <div>
          <MultiCards />
        </div>
      </cardDataProvider.Provider>
    </>
  );
};

export default HeroSection;
