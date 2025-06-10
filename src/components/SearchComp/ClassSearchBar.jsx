
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getClassCategory, getClassDist, GetSearchClass } from "./Api"
import { useEffect, useState } from "react"
import { capitalize } from "../../utils/constansts"
import { IoChevronUp, IoChevronDown, IoSearchOutline } from "react-icons/io5"

const ClassSearchBar = ({
  setQuery,
  query,
  setSearchClassData,
  setIsLoading,
  setHasNextPage,
  setFetchNextPage,
  setIsFetchingNextPage,
  onSearchParamsUpdate,
  hideRoadmapFilter = false,
  currentRoadmapId = null,
}) => {
  const [classCategoryValue, setClassCategoryValue] = useState("")
  const [classDistValue, setClassDistValue] = useState("")
  const [showClassFilters, setShowClassFilters] = useState(true)

  const [classSearchParams, setClassSearchParams] = useState({
    searchKey: "",
    category: "",
    type: "class",
    dist: "",
    roadmap: currentRoadmapId || "",
  })

  const { data: ClassCategory } = useQuery({
    queryKey: ["class-category"],
    queryFn: getClassCategory,
    refetchOnWindowFocus: false,
  })

  const { data: ClassDist } = useQuery({
    queryKey: ["class-district"],
    queryFn: getClassDist,
    refetchOnWindowFocus: false,
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isError, refetch } = useInfiniteQuery({
    queryKey: ["classes", classSearchParams],
    queryFn: ({ pageParam = 1 }) => GetSearchClass({ ...classSearchParams, page: pageParam, limit: 50 }),
   enabled: !!classSearchParams.type && !hideRoadmapFilter,// Disable automatic fetching when roadmap is in URL
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNextPage) return lastPage.currentPage + 1
      if (lastPage?.results?.length >= 4) return (lastPage.currentPage || 1) + 1
      return undefined
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  })

  // Auto update data to parent (only when not in roadmap mode)
  useEffect(() => {
    if (data?.pages && !hideRoadmapFilter) {
      const allResults = data.pages
        .flatMap((page) => {
          if (page?.results) return page.results
          if (page?.data?.results) return page.data.results
          if (Array.isArray(page?.data)) return page.data
          if (Array.isArray(page)) return page
          return []
        })
        .filter((item) => item != null)
      setSearchClassData({ results: allResults })
      setIsLoading(false)
    }
  }, [data, hideRoadmapFilter])

  useEffect(() => {
    if (!hideRoadmapFilter) {
      setIsLoading(isPending)
    }
  }, [isPending, hideRoadmapFilter])

  useEffect(() => {
    if (isError && !hideRoadmapFilter) {
      setSearchClassData({ results: [] })
      setIsLoading(false)
    }
  }, [isError, hideRoadmapFilter])

  useEffect(() => {
    if (!hideRoadmapFilter) {
      setHasNextPage(hasNextPage)
      setFetchNextPage(() => fetchNextPage)
      setIsFetchingNextPage(isFetchingNextPage)
    }
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, hideRoadmapFilter])

   useEffect(() => {
    if (!hideRoadmapFilter) {
      const timeout = setTimeout(() => {
        setClassSearchParams({
          searchKey: query,
          category: classCategoryValue,
          type: "class",
          dist: classDistValue,
          roadmap: "", // Normal search doesn't include roadmap
        })
      }, 1000) // ✅ 1 second delay as before
      return () => clearTimeout(timeout)
    }
  }, [query, classCategoryValue, classDistValue, hideRoadmapFilter])

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    if (!hideRoadmapFilter) {
      setIsLoading(true) // ✅ Show loading immediately for normal search
    } else {
      // In roadmap mode, trigger search through parent with debounce
      const timeout = setTimeout(() => {
        handleRoadmapSearch(e.target.value)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }

  const handleSearch = (searchQuery = query) => {
    const searchParams = {
      searchKey: searchQuery,
      category: classCategoryValue,
      type: "class",
      dist: classDistValue,
      roadmap: hideRoadmapFilter ? currentRoadmapId || "" : "",
    }

    // Notify parent component
    if (onSearchParamsUpdate) {
      onSearchParamsUpdate(searchParams)
    }
  }

  const handleCategoryChange = (value) => {
    setClassCategoryValue(value)
    if (hideRoadmapFilter) {
      setTimeout(() => handleSearch(), 100)
    }
  }

  const handleDistrictChange = (value) => {
    setClassDistValue(value)
    if (hideRoadmapFilter) {
      setTimeout(() => handleSearch(), 100)
    }
  }

  const handleManualSearch = () => {
    if (hideRoadmapFilter) {
      handleSearch()
    } else {
      setClassSearchParams({
        searchKey: query,
        category: classCategoryValue,
        type: "class",
        dist: classDistValue,
        roadmap: "",
      })
      refetch()
    }
  }

  return (
    <div className="w-full sticky top-16 z-20 bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-3">
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden">
          <input
            type="text"
            className="px-6 py-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
            placeholder="Search Class"
            value={query}
            onChange={handleInputChange}
          />
          <select
            className="px-4 py-3 text-gray-700 border-l border-gray-200 bg-white cursor-pointer focus:outline-none"
            onChange={(e) => handleDistrictChange(e.target.value)}
            value={classDistValue}
          >
            <option value="">District</option>
            {ClassDist?.data?.map((district) => (
              <option key={district} value={district}>
                {capitalize(district)}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-3 text-gray-700 border-l cursor-pointer border-gray-200 bg-white focus:outline-none"
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={classCategoryValue}
          >
            <option value="">Category</option>
            {ClassCategory?.data?.map((cate) => (
              <option key={cate} value={cate}>
                {capitalize(cate)}
              </option>
            ))}
          </select>
          <button
            className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-white flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-colors duration-200"
            onClick={handleManualSearch}
          >
            <IoSearchOutline className="text-2xl" />
          </button>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col space-y-3 border-b-gray-600 md:hidden w-full mt-2">
          {showClassFilters && (
            <>
              <input
                type="text"
                className="px-4 py-3 w-full border bg-white border-gray-300 rounded-lg focus:outline-none text-gray-700 placeholder-gray-400"
                placeholder="Search Class"
                value={query}
                onChange={handleInputChange}
              />

              <select
                className="px-4 py-3 w-full border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none"
                onChange={(e) => handleDistrictChange(e.target.value)}
                value={classDistValue}
              >
                <option value="">District</option>
                {ClassDist?.data?.map((district) => (
                  <option key={district} value={district}>
                    {capitalize(district)}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-3 w-full border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none"
                onChange={(e) => handleCategoryChange(e.target.value)}
                value={classCategoryValue}
              >
                <option value="">Category</option>
                {ClassCategory?.data?.map((cate) => (
                  <option key={cate} value={cate}>
                    {capitalize(cate)}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Search Button (Always visible) */}
          <button
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-colors duration-200"
            onClick={handleManualSearch}
          >
            <IoSearchOutline className="text-2xl" />
          </button>

          {/* Toggle Button */}
          <div className="flex justify-end w-full">
            <button
              onClick={() => setShowClassFilters(!showClassFilters)}
              className="text-lg text-blue-600 underline mr-3 flex items-center "
            >
              <span>{showClassFilters ? "Less" : "Search More"}</span>
              {showClassFilters ? <IoChevronUp className="text-xl" /> : <IoChevronDown className="text-xl" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassSearchBar
