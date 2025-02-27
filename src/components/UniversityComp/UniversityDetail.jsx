import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { FaUniversity, FaBookOpen, FaTrophy, FaUserGraduate, FaClipboardCheck, FaBuilding, FaMedal } from "react-icons/fa";
import EntranceExam from './EntranceExam';
import InquiryForm from './InquiryForm';
import PlacementOpportunities from './PlacementOpportunities';
import OfferedCourse from './OfferedCourse';
import UniversityRanking from './UniversityRanking';
import UniversityInformation from './UniversityInformation';

const UniversityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    

    const universities = [
        {
            id: 1,
            name: "Harvard University",
            rank: 1,
            location: "Cambridge, MA, USA",
            image: "https://2u.com/static/84f4025b19c2bf44a1c9b049994c1eff/ee8ba/baker-library-harvard-university_OPxWuDn.max-2880x1800.jpg",
            description: "Harvard University is known for its prestigious academic programs and world-class research.",
        },
        {
            id: 2,
            name: "MIT",
            rank: 2,
            location: "Cambridge, MA, USA",
            image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=60",
            description: "MIT leads in technology and innovation, with cutting-edge research and teaching.",
        },
        {
            id: 3,
            name: "Stanford University",
            rank: 3,
            location: "Stanford, CA, USA",
            image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=600&q=60",
            description: "Stanford University fosters innovation and entrepreneurship in a vibrant campus community.",
        },
        {
            id: 4,
            name: "Oxford University",
            rank: 4,
            location: "Oxford, UK",
            image: "https://images.unsplash.com/photo-1612563958093-2c3bcfbd8760?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3hmb3JkJTIwdW5pdmVyc2l0eXxlbnwwfHwwfHx8MA%3D%3D",
            description: "Oxford University is renowned for its rich history, academic excellence, and research.",
        },
        {
            id: 5,
            name: "Cambridge University",
            rank: 5,
            location: "Cambridge, UK",
            image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=600&q=60",
            description: "Cambridge University offers a unique blend of tradition and cutting-edge research.",
        },
        {
            id: 6,
            name: "Tokyo University",
            rank: 6,
            location: "Tokyo, Japan",
            image: "https://images.unsplash.com/photo-1612563958093-2c3bcfbd8760?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3hmb3JkJTIwdW5pdmVyc2l0eXxlbnwwfHwwfHx8MA%3D%3D",
            description: "Tokyo University is a leader in research and innovation in Asia, providing outstanding education.",
        },
    ];

    const university = universities.find((u) => u.id === Number(id));

    if (!university) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h2 className="text-2xl">University not found</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-10 mt-5">
            {/* Banner Section */}
            <div className="relative">
                <img
                    src={university.image}
                    alt={university.name}
                    className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-grey-400 bg-opacity-100 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">{university.name}</h1>
                    <p className="text-white mt-2">Rank: #{university.rank}</p>
                </div>
            </div>

            {/* Info Section */}
            <div className="container mx-auto mt-8 px-4">
                <div className="bg-grey-100 shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-2">Location</h2>
                    <p className="text-gray-600 mb-4">{university.location}</p>

                    <h2 className="text-2xl font-semibold mb-2">About</h2>
                    <p className="text-gray-700 leading-relaxed">{university.description}</p>

                    {/* Additional College Information */}
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <UniversityInformation/>
                        </div>

                    {/* Rankings Section */}
                    {/* Rankings Section */}
                    <UniversityRanking/>

                    {/* Courses Section */}
                   <OfferedCourse/>

                    {/* Placement Opportunities Section */}
                    <PlacementOpportunities/>
                        
                    {/* Entrance Test and Admission Form Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* Entrance Test Section */}
                        <EntranceExam/>

                        {/* Admission Form Section */}
                        <InquiryForm/>
                    </div>
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/")}
                        className=" cursor-pointer mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UniversityDetail;