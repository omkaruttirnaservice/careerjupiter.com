const SearchSuggestions = ({ suggestions, query }) => {
  if (!query) return null;

  return (
    <ul className="absolute z-50 border border-gray-300 rounded-md mt-2 bg-white shadow-xl w-full max-w-lg left-1/2 transform -translate-x-1/2 overflow-hidden">
      {suggestions
        .filter((suggestion) =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        )
        .map((suggestion, index) => (
          <li
            key={index}
            className="px-4 py-3 text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-200 border-b border-gray-300 last:border-b-0"
          >
            {suggestion}
          </li>
        ))}
    </ul>
  );
};

export default SearchSuggestions;
