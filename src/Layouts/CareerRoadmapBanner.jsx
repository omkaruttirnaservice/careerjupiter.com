import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const CareerRoadmapBanner = () => {
 const navigate = useNavigate();

  const handleClick = () => {
    navigate('/roadmap');
  };

  return (
     <div className="relative h-[50vh] w-full">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/premium-photo/man-hand-pressing-social-media-iconconceptual-image-social-connection_38816-1244.jpg?uid=R201258600&ga=GA1.1.269464125.1721311712&semt=ais_hybrid&w=740")',
        }}
      >
        {/* Slightly transparent black overlay */}
        <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-2xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Plan Your Career Journey - Step By Step
        </h1>
        <p className="text-md md:text-xl mb-6 max-w-xl drop-shadow-md">
          Connect Education to Opportunity - Start Your Career Map Today
        </p>
        <button
          onClick={handleClick}
          className="  bg-gradient-to-r from-pink-400 via-blue-400 to-emerald-500 w-full md:w-160 cursor-pointer border-1 flex items-center justify-center gap-3  text-white px-2 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-600 transition-transform duration-300 hover:scale-105"
        
        >
          
          
          🚀 Career Map
          <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300 " />
        </button > 
      </div>
    </div>
  )
}

export default CareerRoadmapBanner
