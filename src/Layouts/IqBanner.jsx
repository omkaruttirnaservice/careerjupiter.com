import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const IqBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[400px] md:h-[400px] bg-cover bg-center rounded-lg overflow-hidden shadow-xl"
      style={{
        backgroundImage:
          "url('https://us.123rf.com/450wm/hanasaki8739/hanasaki87392301/hanasaki8739230100782/197660645-iq-test.jpg?ver=6')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-16 text-white max-w-4xl">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
          Test Your Brain Power 🧠
        </h2>
        <p className="text-base sm:text-lg mb-6 text-gray-200 max-w-xl">
          Discover how sharp your mind is with our interactive and scientifically-designed IQ test.
        </p>
        <button
          onClick={() => navigate("/profile/test")}
          className=" hover:scale-105 w-fit px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-1 rounded-full font-semibold text-lg shadow-md hover:shadow-lg flex items-center gap-2 transition-all duration-300"
        >
          <span>Take the IQ Test</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default IqBanner;
