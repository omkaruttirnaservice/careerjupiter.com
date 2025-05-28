"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import UniversityCard from "./UniversityCard"
import LoadingCard from "../loading-skeleton/LoadingCard"
import dataNotFound from "../../assets/images/dataNotFound.jpg"
import UniversitySearchBar from "../SearchComp/UniversitySearchBar"
import { BASE_URL } from "../../utils/constansts"

// 🔹 Fetch all universities
const fetchUniversities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/university/all`)
    const parsedData = response.data?.data || {}
    return parsedData?.universities || []
  } catch (error) {
    console.error("Error fetching universities:", error)
    throw error
  }
}

// 🔹 Helper to normalize strings
const normalize = (str) => (str || "").toLowerCase().trim()

const UniversityMultiCard = () => {
  const navigate = useNavigate()

  const [searchResults, setSearchResults] = useState([])
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [searchTriggered, setSearchTriggered] = useState(false)

  const {
    data: allUniversities,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: fetchUniversities,
    refetchOnWindowFocus: false,
  })

  if (isError) {
    toast.error(error?.message || "Failed to load universities.")
  }

  // 🔍 Local search handler
  const handleSearchResults = (filters) => {
    const { searchKey = "", district = "", category = "" } = filters

    const filtered = (allUniversities || []).filter((uni) => {
      const nameMatch = normalize(uni.universityName).includes(normalize(searchKey))
      const districtMatch = district ? normalize(uni.address?.dist) === normalize(district) : true
      const categoryMatch = category ? normalize(uni.category) === normalize(category) : true
      return nameMatch && districtMatch && categoryMatch
    })

    setSearchResults(filtered)
    setSearchTriggered(true)

    localStorage.setItem("university-search-results", JSON.stringify(filtered))
    localStorage.setItem("search-triggered", "true")
  }

  // 🔄 Transform data
  const transformUniversityData = (universities) => {
    return Array.isArray(universities)
      ? universities.map((uni) => ({
          name: uni.universityName || uni.name || "Unknown University",
          category: uni.Category || uni.category || "N/A",
          rank: uni.establishedYear || uni.rank || "N/A",
          image: uni.image || "https://via.placeholder.com/300",
          description: uni?.info?.description || uni.description || "No description available.",
          location:
            uni?.address?.line1 && uni?.address?.state
              ? `${uni.address.line1}, ${uni.address.state}`
              : uni.address?.dist || "Location not available",
          id: uni._id || uni.id || uni.name,
          district: uni.address?.dist || "",
        }))
      : []
  }

  // 🔄 On initial load if not searched, show all
  useEffect(() => {
    if (allUniversities && allUniversities.length > 0 && !searchTriggered) {
      setSearchResults(allUniversities)
      localStorage.setItem("university-search-results", JSON.stringify(allUniversities))
    }
  }, [allUniversities, searchTriggered])

  const displayedData = transformUniversityData(searchResults)

  return (
    <div className="mt-10">
      <UniversitySearchBar
        allUniversities={allUniversities || []}
        onSearchResults={handleSearchResults}
        setIsLoading={setIsSearchLoading}
      />

      <div className="bg-gray-30 py-10">
        <div className="container mx-auto px-4">
          {(isLoading || isSearchLoading) && (
            <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <LoadingCard key={index} />
              ))}
            </div>
          )}

          {!isLoading && !isSearchLoading && displayedData.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedData.map((uni) => (
                <UniversityCard key={uni.id} university={uni} onClick={() => navigate(`/university/${uni.id}`)} />
              ))}
            </div>
          )}

          {!isLoading && !isSearchLoading && displayedData.length === 0 && (
            <div className="flex justify-center items-center flex-col mt-5">
              <img
                src={dataNotFound || "/placeholder.svg"}
                alt="No data found"
                className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
              />
              <h1 className="text-red-700 mt-2 text-lg font-semibold">No University Data Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UniversityMultiCard
