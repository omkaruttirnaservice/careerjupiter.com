import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const IqBanner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-[300px] sm:h-[400px] md:h-[300px] bg-cover bg-center rounded-xl shadow-lg overflow-hidden"
      style={{
        backgroundImage:
          "url('https://us.123rf.com/450wm/hanasaki8739/hanasaki87392301/hanasaki8739230100782/197660645-iq-test.jpg?ver=6')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-10 max-w-2xl text-center text-white border border-white/20 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-4">
            Boost Your Brainpower 🧠
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6">
            Ready to measure your brainpower? Take the test!
          </p>
          <button
            onClick={() => navigate("/profile/test")}
            className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-base sm:text-lg transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <span>Start IQ Test</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IqBanner;
