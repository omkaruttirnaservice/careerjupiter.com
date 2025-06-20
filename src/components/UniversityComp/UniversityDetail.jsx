import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCalendarAlt,
  FaGlobe,
  FaUniversity,
  FaGraduationCap,
  FaBuilding,
  FaBriefcase,
  FaImages,
  FaStar,
  FaRupeeSign,
  FaUsers,
} from "react-icons/fa";
import { fetchUniversityById } from "./Api";
import { motion } from "framer-motion";
import Nav from "../../Layouts/Nav";
import ReviewPage from "../navComp/ReviewPage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BASE_URL } from "../../utils/constansts";

const UniversityDetail = () => {
  const { id } = useParams();
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["university", id],
    queryFn: () => fetchUniversityById(id),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700"></p>
          <p className="text-gray-500"></p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error loading data
          </h2>
          <p className="text-gray-700 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { university: uni, courses, infrastructure, placements } = data;

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatNumber = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A";
  };

  const handleGalleryImageClick = (index) => {
    setActiveGalleryImage(index);
    setShowGalleryModal(true);
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-10">
        {/* Hero Banner */}
        {/* const BASE_URL = "https://yourdomain.com"; // Update as needed */}
        <div className="relative w-full mt-15 h-96 md:h-96 lg:h-96 overflow-hidden">
          {uni.image ? (
            <LazyLoadImage
              src={
                uni.image.startsWith("http")
                  ? uni.image
                  : `${BASE_URL}${uni.image}`
              }
              alt={uni.universityName}
              effect="blur"
              className="absolute inset-0 w-full h-full object-cover"
              wrapperClassName="absolute inset-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-university.jpg"; // Add a fallback image
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          )}
          <div className="absolute inset-0 bg-black/70  flex flex-col justify-center items-center text-white  text-center">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {uni.universityName}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl bg-white font-bold text-black bg-opacity-20 px-4 py-1 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {uni.category}
            </motion.p>
            <motion.div
              className="mt-4 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <FaMapMarkerAlt className="mr-1" />
              <span>{uni.address.state}</span>
            </motion.div>

            <button
              onClick={() => navigate("/university")}
              className="relative bg-none text-cyan-700 cursor-pointer flex items-center gap-2 p-2 pl-0 text-base no-underline 
             group transition-all duration-300 ease-in-out hover:pl-2 hover:gap-3"
            >
              <span className="absolute left-0 w-0 h-px bg-white bottom-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">
                ←
              </span>
              <span className="transition-all duration-300 ease-in-out">
                BACK
              </span>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<FaCalendarAlt className="text-blue-500" />}
              title="Established"
              value={uni.establishedYear || "N/A"}
              color="bg-blue-100 text-blue-800"
            />
            <StatCard
              icon={<FaGraduationCap className="text-purple-500" />}
              title="Courses"
              value={
                courses?.reduce(
                  (acc, block) => acc + (block.courses?.length || 0),
                  0
                ) || 0
              }
              color="bg-purple-100 text-purple-800"
            />
            <StatCard
              icon={<FaUsers className="text-green-500" />}
              title="Students"
              value={formatNumber(uni.info?.totalStudents)}
              color="bg-green-100 text-green-800"
            />
            <StatCard
              icon={<FaRupeeSign className="text-orange-500" />}
              title="Avg. Fees"
              value={
                courses?.[0]?.courses?.[0]?.annualFees
                  ? `₹${formatNumber(courses[0].courses[0].annualFees)}`
                  : "N/A"
              }
              color="bg-orange-100 text-orange-800"
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Section
                title="About University"
                icon={<FaUniversity className="text-indigo-500" />}
              >
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    {uni.info?.description || "No description available."}
                  </p>
                  {uni.info?.highlights && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Key Highlights:
                      </h4>
                      <ul className="space-y-2">
                        {uni.info.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Section>

              {/* Location */}
              <Section
                title="Location & Contact"
                icon={<FaMapMarkerAlt className="text-green-500" />}
              >
                <div className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-green-500" /> Address
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p>{uni.address.line1}</p>
                      <p>{uni.address.line2}</p>
                      <p>
                        {uni.address.dist}, {uni.address.state}
                      </p>
                      <p>Pincode: {uni.address.pincode}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <FaPhoneAlt className="mr-2 text-blue-500" /> Contact
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {uni.contactDetails || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Website:</span>{" "}
                        {uni.websiteURL ? (
                          <a
                            href={uni.websiteURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {uni.websiteURL}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Admission Info */}
              <Section
                title="Admission Process"
                icon={<FaCalendarAlt className="text-blue-500" />}
              >
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Dates
                      </h3>
                      <div className="space-y-2">
                        <InfoItem
                          label="Start Date"
                          value={formatDate(
                            uni.admissionEntranceDetails?.admissionStartDate
                          )}
                        />
                        <InfoItem
                          label="End Date"
                          value={formatDate(
                            uni.admissionEntranceDetails?.admissionEndDate
                          )}
                        />
                        <InfoItem
                          label="Last Year Cutoff"
                          value={
                            uni.admissionEntranceDetails?.lastYearCutoffMarks
                              ? `${uni.admissionEntranceDetails.lastYearCutoffMarks}%`
                              : "N/A"
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Requirements
                      </h3>
                      <div className="space-y-2">
                        <InfoItem
                          label="Entrance Exams"
                          value={
                            uni.entrance_exam_required?.join(", ") ||
                            "Not Specified"
                          }
                        />
                        <InfoItem
                          label="Quota System"
                          value={
                            uni.admissionEntranceDetails?.quotaSystem?.join(
                              ", "
                            ) || "N/A"
                          }
                        />
                        <InfoItem
                          label="Scholarships"
                          value={
                            uni.admissionEntranceDetails?.scholarshipsAvailable?.join(
                              ", "
                            ) || "N/A"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {uni.applicationFormURL && (
                    <div className="mt-6 text-center">
                      <a
                        href={uni.applicationFormURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md font-medium"
                      >
                        Apply Now
                      </a>
                    </div>
                  )}
                </div>
              </Section>

              {/* Courses */}
              <Section
                title="Courses Offered"
                icon={<FaGraduationCap className="text-indigo-500" />}
              >
                <div className="space-y-4">
                  {courses?.length > 0 ? (
                    courses.map((courseBlock) =>
                      courseBlock.courses?.map((course) => (
                        <motion.div
                          key={course._id}
                          whileHover={{ y: -3 }}
                          className="border border-gray-200 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-xl text-gray-800 mb-1">
                                {course.name}
                              </h3>
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {course.category}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-800">
                                ₹{formatNumber(course.annualFees)}
                              </p>
                              <p className="text-sm text-gray-500">per year</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <InfoItem
                              label="Duration"
                              value={`${course.duration} months`}
                            />
                            <InfoItem
                              label="Eligibility"
                              value={course.eligibility}
                            />
                          </div>

                          {course.subCategory?.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-medium text-gray-600 mb-2">
                                Specializations:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {course.subCategory.map((sub, i) => (
                                  <span
                                    key={i}
                                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs"
                                  >
                                    {sub}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))
                    )
                  ) : (
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                      <p className="text-gray-500">
                        No course information available
                      </p>
                    </div>
                  )}
                </div>
              </Section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Accreditations */}
              <Section title="Accreditations & Rankings">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  {uni.accreditation?.length > 0 ? (
                    <div className="space-y-3">
                      {uni.accreditation.map((item, i) => (
                        <div key={i} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p className="ml-2 text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No accreditation information available
                    </p>
                  )}
                </div>
              </Section>

              {/* Infrastructure Highlights */}
              <Section title="Campus Facilities">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  {infrastructure?.infrastructure?.[0] ? (
                    <div className="space-y-4">
                      <FacilityItem
                        icon="🏫"
                        label="Campus Area"
                        value={infrastructure.infrastructure[0].campusArea}
                      />
                      <FacilityItem
                        icon="📚"
                        label="Library"
                        value={infrastructure.infrastructure[0].library?.size}
                      />
                      <FacilityItem
                        icon="🔬"
                        label="Labs"
                        value={infrastructure.infrastructure[0].numberOfLabs}
                      />
                      <FacilityItem
                        icon="🏠"
                        label="Hostel"
                        value={
                          infrastructure.infrastructure[0].hostelAvailability
                            ? "Available"
                            : "Not Available"
                        }
                      />
                      {infrastructure.infrastructure[0].sportsFacilities
                        ?.length > 0 && (
                        <div>
                          <p className="font-medium text-gray-700 mb-2">
                            Sports Facilities:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {infrastructure.infrastructure[0].sportsFacilities.map(
                              (sport, i) => (
                                <span
                                  key={i}
                                  className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                                >
                                  {sport}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No infrastructure information available
                    </p>
                  )}
                </div>
              </Section>

              {/* Placement Highlights */}
              <Section title="Placement Stats">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  {placements?.[0]?.placement?.[0] ? (
                    <div className="space-y-4">
                      <FacilityItem
                        icon="💰"
                        label="Highest Package"
                        value={`₹${formatNumber(placements[0].placement[0].highestPackage)} LPA`}
                      />
                      <FacilityItem
                        icon="📈"
                        label="Placement Rate"
                        value={`${placements[0].placement[0].placementPercentage}%`}
                      />
                      <FacilityItem
                        icon="👨‍🎓"
                        label="Students Placed"
                        value={formatNumber(
                          placements[0].placement[0].noOfStudents
                        )}
                      />
                      {placements[0].placement[0].topRecruiters && (
                        <div>
                          <p className="font-medium text-gray-700 mb-2">
                            Top Recruiters:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {placements[0].placement[0].topRecruiters
                              .split(",")
                              .map((recruiter, i) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                >
                                  {recruiter.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No placement information available
                    </p>
                  )}
                </div>
              </Section>

              {/* Image Gallery */}
              {uni.imageGallery?.length > 0 && (
                <Section title="Campus Gallery">
                  <div className="grid grid-cols-2 gap-2">
                    {uni.imageGallery.slice(0, 4).map((img, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => handleGalleryImageClick(i)}
                      >
                        <LazyLoadImage
                          src={`${BASE_URL}${img}`}
                          alt={`Campus ${i + 1}`}
                          effect="blur"
                          className="h-32 w-full object-cover hover:opacity-90 transition-opacity"
                        />
                      </motion.div>
                    ))}
                  </div>
                  {uni.imageGallery.length > 4 && (
                    <button
                      onClick={() => setShowGalleryModal(true)}
                      className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                      View all {uni.imageGallery.length} photos
                    </button>
                  )}
                </Section>
              )}
            </div>
          </div>

          {/* Full Infrastructure Section */}
          <Section
            title="Detailed Infrastructure"
            icon={<FaBuilding className="text-blue-500" />}
          >
            {infrastructure?.infrastructure?.length > 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                {infrastructure.infrastructure.map((infra, idx) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                      Campus Infrastructure
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Basic Facilities
                        </h4>
                        <div className="space-y-3">
                          <InfoItem
                            label="Campus Area"
                            value={infra.campusArea}
                          />
                          <InfoItem
                            label="Classrooms"
                            value={infra.numberOfClassrooms}
                          />
                          <InfoItem
                            label="Laboratories"
                            value={infra.numberOfLabs}
                          />
                          <InfoItem
                            label="Library"
                            value={infra.library?.size || "N/A"}
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Additional Facilities
                        </h4>
                        <div className="space-y-3">
                          <InfoItem
                            label="Hostel"
                            value={
                              infra.hostelAvailability
                                ? infra.hostelDetails || "Available"
                                : "Not Available"
                            }
                          />
                          <InfoItem
                            label="Transport"
                            value={infra.transportFacility?.join(", ") || "N/A"}
                          />
                          {infra.sportsFacilities?.length > 0 && (
                            <div>
                              <p className="font-medium text-gray-700 mb-1">
                                Sports Facilities:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {infra.sportsFacilities.map((sport, i) => (
                                  <span
                                    key={i}
                                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                  >
                                    {sport}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <p className="text-gray-500">
                  No detailed infrastructure information available
                </p>
              </div>
            )}
          </Section>

          {/* Detailed Placement Section */}
          <Section
            title="Placement Details"
            icon={<FaBriefcase className="text-green-500" />}
          >
            {placements?.length > 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                {placements.map((placementBlock) =>
                  placementBlock.placement?.map((p, idx) => (
                    <div key={idx} className="mb-8 last:mb-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Placement Statistics
                          </h4>
                          <div className="space-y-3">
                            <InfoItem
                              label="Highest Package"
                              value={`₹${formatNumber(p.highestPackage)} LPA`}
                            />
                            <InfoItem
                              label="Average Package"
                              value={
                                p.averagePackage
                                  ? `₹${formatNumber(p.averagePackage)} LPA`
                                  : "N/A"
                              }
                            />
                            <InfoItem
                              label="Placement Percentage"
                              value={`${p.placementPercentage}%`}
                            />
                            <InfoItem
                              label="Students Placed"
                              value={formatNumber(p.noOfStudents)}
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Opportunities
                          </h4>
                          <div className="space-y-3">
                            <InfoItem
                              label="Internship Opportunities"
                              value={
                                p.internshipOpportunities
                                  ? "Available"
                                  : "Not Available"
                              }
                            />
                            <InfoItem
                              label="International Placements"
                              value={
                                p.internationalPlacements
                                  ? "Available"
                                  : "Not Available"
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {p.topRecruiters && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-700 mb-2">
                            Top Recruiters
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {p.topRecruiters.split(",").map((recruiter, i) => (
                              <span
                                key={i}
                                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg"
                              >
                                {recruiter.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <p className="text-gray-500">
                  No detailed placement information available
                </p>
              </div>
            )}
          </Section>

          {/* Reviews Section */}
          <ReviewPage />
        </div>
        {/* Image Gallery Modal */}
        {showGalleryModal && uni.imageGallery?.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setShowGalleryModal(false)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
            >
              &times;
            </button>
            <div className="max-w-4xl w-full">
              <div className="relative">
                <LazyLoadImage
                  src={uni.imageGallery[activeGalleryImage]}
                  alt={`Gallery ${activeGalleryImage + 1}`}
                  effect="blur"
                  className="w-full max-h-[70vh] object-contain"
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      setActiveGalleryImage(
                        (activeGalleryImage - 1 + uni.imageGallery.length) %
                          uni.imageGallery.length
                      )
                    }
                    className="px-4 py-2 bg-white bg-opacity-20 text-white rounded hover:bg-opacity-30"
                  >
                    Previous
                  </button>
                  <span className="text-white">
                    {activeGalleryImage + 1} / {uni.imageGallery.length}
                  </span>
                  <button
                    onClick={() =>
                      setActiveGalleryImage(
                        (activeGalleryImage + 1) % uni.imageGallery.length
                      )
                    }
                    className="px-4 py-2 bg-white bg-opacity-20 text-white rounded hover:bg-opacity-30"
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {uni.imageGallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGalleryImage(i)}
                    className={`h-20 overflow-hidden rounded ${
                      i === activeGalleryImage ? "ring-4 ring-blue-500" : ""
                    }`}
                  >
                    <LazyLoadImage
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      effect="blur"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    className={`${color} p-4 rounded-xl shadow-sm flex items-center`}
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="mr-3 p-2 bg-white bg-opacity-50 rounded-lg">{icon}</div>
    <div>
      <p className="text-xs font-medium uppercase tracking-wider">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </motion.div>
);

// Reusable Facility Item Component
const FacilityItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <span className="text-2xl mr-3">{icon}</span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "N/A"}</p>
    </div>
  </div>
);

// Reusable Info Item Component
const InfoItem = ({ label, value, icon }) => (
  <div className="flex items-start">
    {icon && <span className="mr-2 text-lg">{icon}</span>}
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-gray-800">{value || "N/A"}</p>
    </div>
  </div>
);

// Section Component with animation
const Section = ({ title, children, icon }) => (
  <motion.div
    className="my-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center mb-4 space-x-3">
      {icon && <div className="text-2xl">{icon}</div>}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
    <div>{children}</div>
  </motion.div>
);

export default UniversityDetail;



// import { useParams, useNavigate } from "react-router-dom"
// import { useQuery } from "@tanstack/react-query"
// import {
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaCalendarAlt,
//   FaUniversity,
//   FaGraduationCap,
//   FaRupeeSign,
//   FaUsers,
// } from "react-icons/fa"
// import { fetchUniversityById } from "./Api"
// import { motion } from "framer-motion"
// import Nav from "../../Layouts/Nav"
// import ReviewPage from "../navComp/ReviewPage"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import "react-lazy-load-image-component/src/effects/blur.css"
// import { BASE_URL } from "../../utils/constansts"

// // Import separate components
// import CoursesSection from "./CoursesSection"
// import InfrastructureSection from "./InfrastructureSection"
// import PlacementSection from "./PlacementSection"
// import ImageGallery from "./ImageGallery"

// const UniversityDetail = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["university", id],
//     queryFn: () => fetchUniversityById(id),
//     staleTime: 5 * 60 * 1000,
//   })

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-400 mx-auto"></div>
//           <p className="mt-3 text-lg font-medium text-gray-600"></p>
//           <p className="text-gray-400 text-sm"></p>
//         </div>
//       </div>
//     )
//   }

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md">
//           <div className="text-red-400 text-4xl mb-3">⚠️</div>
//           <h2 className="text-lg font-semibold text-red-500 mb-2">Error loading data</h2>
//           <p className="text-gray-600 mb-4 text-sm">{error.message}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all shadow-md text-sm"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     )
//   }

//   const { university: uni, courses, infrastructure, placements } = data

//   const formatNumber = (num) => {
//     return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"
//   }

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A"
//     const options = { year: "numeric", month: "long", day: "numeric" }
//     return new Date(dateString).toLocaleDateString(undefined, options)
//   }

//   return (
//     <>
//       <Nav />
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-8">
//         {/* Hero Banner */}
//         <div className="relative w-full mt-15 h-80 md:h-80 lg:h-80 overflow-hidden">
//           {uni.image ? (
//             <LazyLoadImage
//               src={uni.image.startsWith("http") ? uni.image : `${BASE_URL}${uni.image}`}
//               alt={uni.universityName}
//               effect="blur"
//               className="absolute inset-0 w-full h-full object-cover"
//               wrapperClassName="absolute inset-0"
//               onError={(e) => {
//                 e.target.onerror = null
//                 e.target.src = "/default-university.jpg"
//               }}
//             />
//           ) : (
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"></div>
//           )}
//           <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center">
//             <motion.h1
//               className="text-2xl md:text-3xl lg:text-3xl font-semibold mb-2 drop-shadow-lg"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               {uni.universityName}
//             </motion.h1>
//             <motion.p
//               className="text-sm md:text-base bg-white font-medium text-black bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.6 }}
//             >
//               {uni.category}
//             </motion.p>
//             <motion.div
//               className="mt-3 flex items-center text-sm"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6, duration: 0.6 }}
//             >
//               <FaMapMarkerAlt className="mr-1" />
//               <span>{uni.address.state}</span>
//             </motion.div>

//             <button
//               onClick={() => navigate("/university")}
//               className="relative bg-none text-cyan-300 cursor-pointer flex items-center gap-2 p-2 pl-0 text-sm no-underline 
//              group transition-all duration-300 ease-in-out hover:pl-2 hover:gap-3"
//             >
//               <span className="absolute left-0 w-0 h-px bg-white bottom-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
//               <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">←</span>
//               <span className="transition-all duration-300 ease-in-out">BACK</span>
//             </button>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//           {/* Quick Stats */}
//           <motion.div
//             className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <StatCard
//               icon={<FaCalendarAlt className="text-blue-400" />}
//               title="Established"
//               value={uni.establishedYear || "N/A"}
//               color="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700"
//             />
//             <StatCard
//               icon={<FaGraduationCap className="text-purple-400" />}
//               title="Courses"
//               value={courses?.reduce((acc, block) => acc + (block.courses?.length || 0), 0) || 0}
//               color="bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700"
//             />
//             <StatCard
//               icon={<FaUsers className="text-green-400" />}
//               title="Students"
//               value={formatNumber(uni.info?.totalStudents)}
//               color="bg-gradient-to-br from-green-50 to-green-100 text-green-700"
//             />
//             <StatCard
//               icon={<FaRupeeSign className="text-orange-400" />}
//               title="Avg. Fees"
//               value={
//                 courses?.[0]?.courses?.[0]?.annualFees ? `₹${formatNumber(courses[0].courses[0].annualFees)}` : "N/A"
//               }
//               color="bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700"
//             />
//           </motion.div>

//           {/* About University - Redesigned */}
//           <motion.div
//             className="mb-12"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <div className="text-center mb-6">
//               <motion.h2
//                 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-3"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: 0.5 }}
//               >
//                 About {uni.universityName}
//               </motion.h2>
//               <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
//               <motion.div
//                 className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
//                 whileHover={{ y: -3, shadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)" }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="flex items-center mb-4">
//                   <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3">
//                     <FaUniversity className="text-white text-lg" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-700">University Overview</h3>
//                 </div>
//                 <p className="text-gray-600 leading-relaxed text-sm">
//                   {uni.info?.description ||
//                     "Discover excellence in education at this prestigious institution, committed to fostering innovation, research, and academic excellence."}
//                 </p>

//                 {uni.info?.highlights && (
//                   <div className="mt-4">
//                     <h4 className="font-medium text-gray-700 mb-3 text-sm">Key Highlights:</h4>
//                     <div className="space-y-2">
//                       {uni.info.highlights.map((highlight, i) => (
//                         <motion.div
//                           key={i}
//                           className="flex items-start p-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg"
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: 0.1 * i }}
//                         >
//                           <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-green-300 to-blue-300 rounded-full flex items-center justify-center mr-2 mt-0.5">
//                             <span className="text-white text-xs">✓</span>
//                           </div>
//                           <span className="text-gray-600 font-medium text-sm">{highlight}</span>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>

//               <motion.div
//                 className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
//                 whileHover={{ y: -3, shadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)" }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="grid grid-cols-1 gap-4">
//                   {/* Location */}
//                   <div>
//                     <div className="flex items-center mb-3">
//                       <div className="p-2 bg-gradient-to-r from-green-300 to-blue-300 rounded-full mr-2">
//                         <FaMapMarkerAlt className="text-white text-sm" />
//                       </div>
//                       <h3 className="text-base font-semibold text-gray-700">Location</h3>
//                     </div>
//                     <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
//                       <p className="text-gray-600 font-medium text-sm">{uni.address.line1}</p>
//                       <p className="text-gray-600 text-sm">{uni.address.line2}</p>
//                       <p className="text-gray-600 text-sm">
//                         {uni.address.dist}, {uni.address.state}
//                       </p>
//                       <p className="text-gray-500 text-sm">Pincode: {uni.address.pincode}</p>
//                     </div>
//                   </div>

//                   {/* Contact */}
//                   <div>
//                     <div className="flex items-center mb-3">
//                       <div className="p-2 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mr-2">
//                         <FaPhoneAlt className="text-white text-sm" />
//                       </div>
//                       <h3 className="text-base font-semibold text-gray-700">Contact</h3>
//                     </div>
//                     <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg space-y-1">
//                       <p className="text-gray-600 text-sm">
//                         <span className="font-medium">Phone:</span> {uni.contactDetails || "N/A"}
//                       </p>
//                       <p className="text-gray-600 text-sm">
//                         <span className="font-medium">Website:</span>{" "}
//                         {uni.websiteURL ? (
//                           <a
//                             href={uni.websiteURL}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-500 hover:underline font-medium"
//                           >
//                             Visit Website
//                           </a>
//                         ) : (
//                           "N/A"
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Admission Process */}
//                   <div>
//                     <div className="flex items-center mb-3">
//                       <div className="p-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mr-2">
//                         <FaCalendarAlt className="text-white text-sm" />
//                       </div>
//                       <h3 className="text-base font-semibold text-gray-700">Admission</h3>
//                     </div>
//                     <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-gray-500 text-sm">Start Date:</span>
//                         <span className="font-medium text-gray-700 text-sm">
//                           {formatDate(uni.admissionEntranceDetails?.admissionStartDate)}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-500 text-sm">End Date:</span>
//                         <span className="font-medium text-gray-700 text-sm">
//                           {formatDate(uni.admissionEntranceDetails?.admissionEndDate)}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-500 text-sm">Last Year Cutoff:</span>
//                         <span className="font-medium text-gray-700 text-sm">
//                           {uni.admissionEntranceDetails?.lastYearCutoffMarks
//                             ? `${uni.admissionEntranceDetails.lastYearCutoffMarks}%`
//                             : "N/A"}
//                         </span>
//                       </div>
//                       {uni.applicationFormURL && (
//                         <div className="pt-2">
//                           <a
//                             href={uni.applicationFormURL}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all shadow-md font-medium text-sm"
//                           >
//                             Apply Now
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Separate Components */}
//           <CoursesSection courses={courses} />
//           <InfrastructureSection infrastructure={infrastructure} />
//           <PlacementSection placements={placements} />
//           <ImageGallery images={uni.imageGallery} universityName={uni.universityName} />

//           {/* Reviews Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//           >
//             <ReviewPage />
//           </motion.div>
//         </div>
//       </div>
//     </>
//   )
// }

// // Enhanced Stat Card Component
// const StatCard = ({ icon, title, value, color }) => (
//   <motion.div
//     className={`${color} p-4 rounded-xl shadow-md border border-white/20 backdrop-blur-sm`}
//     whileHover={{
//       y: -5,
//       scale: 1.02,
//       shadow: "0 15px 30px -12px rgba(0, 0, 0, 0.15)",
//     }}
//     whileTap={{ scale: 0.98 }}
//     transition={{ duration: 0.3 }}
//   >
//     <div className="flex items-center">
//       <div className="mr-3 p-2 bg-white bg-opacity-30 rounded-lg backdrop-blur-sm">{icon}</div>
//       <div>
//         <p className="text-xs font-medium uppercase tracking-wider opacity-80">{title}</p>
//         <p className="text-lg font-semibold">{value}</p>
//       </div>
//     </div>
//   </motion.div>
// )

// export default UniversityDetail
