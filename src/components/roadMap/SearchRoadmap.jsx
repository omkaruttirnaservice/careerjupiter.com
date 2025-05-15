import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaTimes, FaSearch } from "react-icons/fa"
import { BASE_URL } from "../../utils/constansts"

const SearchRoadmap = ({ onClose, onSelect ,setTypeId }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [allSuggestions, setAllSuggestions] = useState([])
    const [filteredSuggestions, setFilteredSuggestions] = useState([])

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/roadmap/types`) // Replace with real API
                const types = res.data.data
                setAllSuggestions(types)
                setFilteredSuggestions(types)
                console.log("response Data 1 ----",types);
                
            } catch (error) {
                console.error("Failed to fetch suggestions", error)
            }
        }

        fetchSuggestions()
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            const filtered = allSuggestions.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredSuggestions(filtered)
        }, 300)

        return () => clearTimeout(timeout)
    }, [searchTerm, allSuggestions])

    return (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 relative transition-all">
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <FaTimes size={20} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Start Your Career Roadmap
                </h2>

                {/* Search input with icon */}
                <div className="relative mb-4">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search your starting point..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Suggestions List */}
                <ul className="max-h-64 overflow-y-auto border rounded-lg shadow-inner bg-white">
                    {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((item) => (
                            <li
                                key={item._id}
                                onClick={() => {
                                    onSelect({name :item.name,type_id:item.type._id})
                                    onClose()
                                    setTypeId(item.type._id)
                                }}
                                className="px-4 py-3 hover:bg-indigo-100 cursor-pointer transition-all"
                            >
                                <p className="text-gray-800 font-medium">{item.name}</p>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-3 text-gray-500 text-center">
                            No results found.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SearchRoadmap
