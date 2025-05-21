import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const IQTestandRoadMapBanner = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-450 mx-auto px-4 sm:px-6">
      
      {/* Career Roadmap Banner */}
      <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[350px] md:h-[450px] rounded-xl shadow-lg group">
        <img
          src="/roadmap.png"
          alt="Road Map"
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center">
          <button
            onClick={() => navigate("/roadmap")}
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-blue-500 via-pink-400 to-emerald-400 text-white font-bold text-base sm:text-lg shadow-[0_10px_20px_rgba(0,200,0,0.3)] hover:shadow-[0_15px_25px_rgba(0,200,0,0.4)] hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-300 flex items-center gap-2 group/btn"
          >
            <span>Career Map</span>
            <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* IQ Test Banner */}
      <div className="  relative w-full lg:w-1/2 h-[300px] sm:h-[350px] md:h-[450px] rounded-xl shadow-lg group">
        <img
          src="https://cdn11.bigcommerce.com/s-aqhrs1x7/images/stencil/1280x1280/products/3923/10149/TY0301300_IQ_1__75257.1671250549.jpg?c=2"
          alt="IQ Test"
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center">
          <button
            onClick={() => navigate("/profile/test")}
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-blue-500 via-pink-400 to-emerald-400 text-white font-bold text-base sm:text-lg shadow-[0_10px_20px_rgba(0,200,0,0.3)] hover:shadow-[0_15px_25px_rgba(0,200,0,0.4)] hover:translate-y-[-3px] active:translate-y-[1px] transition-all duration-300 flex items-center gap-2 group/btn"
          >
            <span>Take IQ Test</span>
            <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default IQTestandRoadMapBanner
