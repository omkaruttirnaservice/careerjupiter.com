import React from 'react';
import Nav from '../../Layouts/Nav.jsx';
import Footer from '../Footer.jsx';

const PremiumServices = () => {
  const services = [
    {
      title: "Personal Career Counselling 🎯",
      description: "Based on IQ/Aptitude via Video Call or Conferencing.",
      oldPrice: "₹1999",
      newPrice: "₹999",
      saveAmount: "1000",
      link: "/career-counselling",
      image: "https://www.drramakantpsychologist.com/wp-content/uploads/2018/10/career-counselling-in-nagpu.jpg",
      aiPrompt: "Modern virtual career counseling session with holographic interface..."
    },
  
  ];


  return (
    <>
      <Nav />
      
      <div className="mt-10 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{background: "url('https://img.freepik.com/premium-vector/dynamic-abstact-minimal-modern-background_1035899-11291.jpg')"}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl bg font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Premium Career Services For Students 🌟
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </h1>
   <center>
          <div className="  w-100">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-2 border-purple-50 hover:border-purple-100"
              >
                {/* New Floating Ribbon */}
                <div className="absolute -top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                  ⚡ Limited Offer
                  <div className="ml-2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                </div>

                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-xl mb-6 border-4 border-white shadow-lg"
                  />
                  
                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                    <span className="mr-2">🎯</span>
                    {service.title}
                    <span className="block w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mt-2 rounded-full"></span>
                  </h2>

                  {service.description && (
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                  )}

                  <div className="flex items-end gap-4 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      {service.newPrice}
                    </span>
                    <span className="text-gray-400 line-through text-lg">
                      {service.oldPrice}
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between shadow-md">
                    <span className="flex items-center">
                      💰 Save ₹{service.saveAmount}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </center>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PremiumServices;