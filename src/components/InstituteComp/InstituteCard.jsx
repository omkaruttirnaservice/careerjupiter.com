const InstituteCard = ({ institute, onClick }) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" onClick={onClick}>
        <img
          className="w-full h-48 object-cover"
          src={institute.image}
          alt={institute.name}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{institute.name}</div>
          <p className="text-gray-700 text-base">Rank: {institute.rank}</p>
          <p className="text-gray-700 text-base">
            Success Ratio: {institute.successRatio}%
          </p>
        </div>
      </div>
    </>
  );
};

export default InstituteCard;