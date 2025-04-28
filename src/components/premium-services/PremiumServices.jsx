import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Nav from '../../Layouts/Nav.jsx';
import Footer from '../Footer.jsx';

// Inline style for keyframes animation
const styles = `
@keyframes scaleUp {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-scaleUp {
  animation: scaleUp 0.3s ease-out forwards;
}
`;

const PremiumServices = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    mobile: ''
  });

  const services = [
    {
      title: "Personal Career Counselling 🎯",
      description: "Based on IQ/Aptitude via Video Call or Conferencing.",
      oldPrice: "₹1999",
      newPrice: "₹999",
      saveAmount: "1000",
      link: "/career-counselling",
      image: "https://www.drramakantpsychologist.com/wp-content/uploads/2018/10/career-counselling-in-nagpu.jpg",
    },
  ];

  const handleCardClick = () => {
    setShowSignup(true);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (signupData.name && signupData.mobile ) {
      // Send API request here if needed
      console.log('Signup Data:', signupData);

      setShowSignup(false);
      setShowOptions(true);

      Swal.fire({
        title: 'Signup Successful!',
        text: 'Now you can proceed further.',
        icon: 'success',
        confirmButtonColor: '#8b5cf6',
      });
    } else {
      Swal.fire({
        title: 'Incomplete Details',
        text: 'Please fill all the fields!',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  const handleContactClick = () => {
    setShowOptions(false);
    Swal.fire({
      title: 'Thank You!',
      text: 'We will contact you shortly.',
      icon: 'success',
      confirmButtonColor: '#8b5cf6',
    });
  };

  const handleTeamMemberClick = () => {
    setShowOptions(false);
    Swal.fire({
      title: 'Team Support!',
      text: 'Our team will assist you shortly. Thank you for connecting with us!',
      icon: 'info',
      confirmButtonColor: '#6366f1',
    });
  };

  return (
    <>
      <style>{styles}</style>

      <Nav />

      <div className="mt-10 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: "url('https://img.freepik.com/premium-vector/dynamic-abstact-minimal-modern-background_1035899-11291.jpg')" }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Premium Career Services For Students 🌟
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </h1>
          <center>
            <div className="flex justify-center">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={handleCardClick}
                  className="cursor-pointer max-w-md w-full group relative bg-white rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-purple-50 hover:border-purple-100"
                >
                  <div className="absolute -top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                    ⚡ Limited Offer
                    <div className="ml-2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  </div>

                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-xl mb-6 border-4 border-white shadow-lg"
                  />

                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                    {service.title}
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
                    💰 Save ₹{service.saveAmount}
                  </div>
                </div>
              ))}
            </div>
          </center>
        </div>
      </div>
      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="animate-scaleUp bg-white rounded-2xl p-8 w-80 shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-center text-purple-600">Sign Up</h2>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                className="w-full p-2 border rounded-xl"
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={signupData.mobile}
                onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value })}
                className="w-full p-2 border rounded-xl"
                required
              />
            
              <button
                type="submit"
                className="w-full py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition transform hover:scale-105"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowSignup(false)}
                className="mt-2 text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Options Modal */}
      {showOptions && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="animate-scaleUp bg-white rounded-2xl p-8 w-80 shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-center text-purple-600">Choose an Option</h2>

            <button
              className="w-full mb-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition transform hover:scale-105"
              onClick={handleTeamMemberClick}
            >
              Our Team Member
            </button>

            <button
              className="w-full py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition transform hover:scale-105"
              onClick={handleContactClick}
            >
              Contact Us Shortly
            </button>

            <button
              className="mt-4 text-sm text-gray-500 hover:underline"
              onClick={() => setShowOptions(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PremiumServices;
