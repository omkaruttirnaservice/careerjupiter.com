import { toPascalCase } from "../utils/StringUtils";

const Card = ({ image, name, description, rating, onClick }) => {
        
  return (
    <>
      <div
        className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={onClick}
      >
        <img className="w-full h-48 object-cover" src={image} alt={name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{toPascalCase(name)}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pb-4 flex gap-2">
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700">
            Grade : A
          </span>
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700">
            ⭐ {rating}/5
          </span>
        </div>
      </div> 
    </>
  );
};

export default Card;