import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { IoSearchOutline } from "react-icons/io5"
import { getUniversityCategory, getUniversityDist, searchUniversity } from "./UniApi"

const UniversitySearchBar = ({ onSearchResults, setIsLoading }) => {
  const [searchKey, setSearchKey] = useState("")
  const [universityDistValue, setUniversityDistValue] = useState("")
  const [universityCategoryValue, setUniversityCategoryValue] = useState("")

  // Fetch categories
  const { data: categoryData } = useQuery({
    queryKey: ["university-category"],
    queryFn: getUniversityCategory,
    refetchOnWindowFocus: false,
  })

  // Fetch districts
  const { data: districtData } = useQuery({
    queryKey: ["university-district"],
    queryFn: getUniversityDist,
    refetchOnWindowFocus: false,
  })

  // Search universities
  const { refetch } = useQuery({
    queryKey: [
      "university-search",
      {
        dist: universityDistValue.toLowerCase(),
        category: universityCategoryValue.toLowerCase(),
        searchKey: searchKey.trim(),
      },
    ],
    queryFn: () =>
      searchUniversity({
        dist: universityDistValue.toLowerCase(),
        category: universityCategoryValue.toLowerCase(),
        searchKey: searchKey.trim(),
      }),
    enabled: false,
    onSuccess: (data) => {
      onSearchResults(data?.results || [])
      setIsLoading(false)
    },
    onError: () => {
      onSearchResults([])
      setIsLoading(false)
    },
  })

  // Refetch on district or category change
  useEffect(() => {
    if (universityDistValue || universityCategoryValue) {
      setIsLoading(true)
      refetch()
    }
  }, [universityDistValue, universityCategoryValue])

  const handleSearchClick = () => {
    if (searchKey || universityDistValue || universityCategoryValue) {
      setIsLoading(true)
      refetch()
    }
  }

  return (
    <div className="w-full max-w-5xl mt-18 justify-center p-6 mx-auto">
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full border-2 border-gray-400 bg-white rounded-full overflow-hidden mx-auto">
        <input
          type="text"
          className="px-4 py-3 w-full focus:outline-none"
          placeholder="Search University"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />

        <select
          className="px-4 py-3 border-l border-gray-300 cursor-pointer"
          value={universityDistValue}
          onChange={(e) => setUniversityDistValue(e.target.value)}
        >
          <option value="">All Districts</option>
          {districtData?.data?.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-3 border-l border-gray-300 cursor-pointer"
          value={universityCategoryValue}
          onChange={(e) => setUniversityCategoryValue(e.target.value)}
        >
          <option value="">All Categories</option>
          {categoryData?.data?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          className="rounded-r-full px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          onClick={handleSearchClick}
        >
          <IoSearchOutline className="text-2xl" />
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col space-y-3 md:hidden w-full mx-auto mt-4">
        <input
          type="text"
          className="px-4 py-3 w-full bg-white border-2 border-gray-400 rounded-lg focus:outline-none"
          placeholder="Search University"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />

        <select
          className="px-4 py-3 w-full bg-white border-2 border-gray-400 rounded-lg cursor-pointer"
          value={universityDistValue}
          onChange={(e) => setUniversityDistValue(e.target.value)}
        >
          <option value="">All Districts</option>
          {districtData?.data?.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-3 w-full bg-white border-2 border-gray-400 rounded-lg cursor-pointer"
          value={universityCategoryValue}
          onChange={(e) => setUniversityCategoryValue(e.target.value)}
        >
          <option value="">All Categories</option>
          {categoryData?.data?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={handleSearchClick}
        >
          <IoSearchOutline className="text-2xl mx-auto" />
        </button>
      </div>
    </div>
  )
}

export default UniversitySearchBar