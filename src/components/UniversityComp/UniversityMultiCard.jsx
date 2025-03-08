import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UniversityCard from './UniversityCard';
import TagsSection from '../TagsSection';
import { useSearchContext } from '../../store/SearchContext';
import toast from 'react-hot-toast';
import Loader from '../Loader';

const UniversityMultiCard = () => {
	const navigate = useNavigate();

	let { UniversityData, errorMsg, isLoading } = useSearchContext();

	useEffect(() => {
		toast.error(errorMsg || 'Server error');
	}, [errorMsg]);

	const tags = ['All', 'Private', 'Government'];

	console.log('UniversityData inside university.......', UniversityData);
	console.log('loading...', isLoading);

	return (
    <div className="mt-10">
      <TagsSection tags={tags} />
      <div className="bg-gray-30 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Welcome to Education
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
            Discover the world's top universities with outstanding programs,
            cutting-edge research, and vibrant campus communities.
          </p>
          {isLoading && <Loader />}

          {!isLoading && UniversityData?.length === 0 && (
            <h1 className="text-red-500 text-center mt-5">No data found.</h1>
          )}

          {!isLoading && UniversityData?.length !== 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {UniversityData.results?.map((uni) => (
                <UniversityCard
                  key={uni._id}
                  university={{
                    id: uni._id,
                    name: uni.universityName || "Unknown University",
                    rank: uni.establishedYear || "N/A",
                    category: uni.Category,
                    location: `${uni.address?.line1 || "Address not available"}, ${uni.address?.state || "N/A"}`,
                    image: uni.image || "https://via.placeholder.com/300",
                    description:
                      uni.info?.description || "No description available.",
                  }}
                  onClick={() => navigate(`/university/${uni._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityMultiCard;
