import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCoursesByUniversityId } from './Api'; 
import { FaBookOpen } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const UniversityCourses = () => {
    const { id } = useParams(); 

    useEffect(() => {
        console.log('University ID from URL:', id);
    }, [id]);

    const { data: courseCategories = [], error, isLoading } = useQuery({
        queryKey: ['courses', id],
        queryFn: () => fetchCoursesByUniversityId(id),
        enabled: !!id,
    });

    if (isLoading) return <div className="text-center text-lg font-medium text-gray-700">Loading courses...</div>;
    if (error) return <div className="text-red-500 text-center text-lg">Error: {error.message}</div>;

    return (
        <div className="mt-6 p-8 text-black">
            <h3 className="text-4xl font-bold flex items-center gap-3 mb-8">
                <FaBookOpen className="text-black text-5xl" /> Offered Courses
            </h3>
            {courseCategories.length > 0 ? (
                courseCategories.map((category) => (
                    <div key={category._id} className="mb-10">
                        <h4 className="text-2xl font-semibold mb-5 border-b-2 border-black pb-2">{category.Category}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {category.courses.map((course) => (
                                <div key={course._id} className="p-6 border-b-2 border-black bg-blue-400 bg-opacity-25 rounded-xl shadow-md hover:bg-opacity-40 transition duration-300">
                                    <h5 className="text-xl font-bold mb-3 text-white">{course.name}</h5>
                                    <p>📅 Duration: <span className="font-medium">{course.duration} years</span></p>
                                    <p>💸 Fees: <span className="font-medium">₹{course.annualFees.toLocaleString()}</span></p>
                                    <p>🎓 Eligibility: <span className="font-medium">{course.eligibility}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-xl">No courses available.</p>
            )}
        </div>
    );
};

export default UniversityCourses;
