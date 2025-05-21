import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const CareerRoadmapBanner = () => {
 const navigate = useNavigate();

  const handleClick = () => {
    navigate('/roadmap');
  };

  return (
     <div className="relative h-[70vh] w-full">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("/roadmap.png")',
        }}
      >
        {/* Slightly transparent black overlay */}
        <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-2xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Plan your career journey - step by step
        </h1>
        <p className="text-md md:text-xl mb-6 max-w-xl drop-shadow-md">
          Connect education to opportunity — start your career map today
        </p>
        <button
          onClick={handleClick}
          className="  bg-gradient-to-r from-blue-500 via-pink-400 to-emerald-400 w-full md:w-160 cursor-pointer border-2 flex items-center justify-center gap-3  text-white px-2 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-600 transition-transform duration-300 hover:scale-105"
        
        >
          
          
          🚀 Career Map
          <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button > 
      </div>
    </div>
  )
}

export default CareerRoadmapBanner
