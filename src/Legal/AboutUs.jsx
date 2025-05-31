

import Footer from '../components/Footer';
import Nav from '../Layouts/Nav.jsx';
import React from 'react';

const AboutUs = () => {
  return (
    <>
      <Nav />
      <div className="w-full bg-gradient-to-br from-sky-50 mt-10 to-white py-10">
        {/* Title Section */}
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold text-purple-700 animate-fade-in">About <span className="text-orange-500">Career Jupiter</span></h1>
          <p className="text-lg mt-4 text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Your future starts here! Career Jupiter is a leading student-centered platform providing growth, guidance, and transformation in your educational and career journey.
          </p>
        </div>

        {/* Mission, Vision, Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-6 lg:px-20 animate-fade-in-up">
          {[
            {
              title: 'Our Mission',
              desc: 'To inspire, empower, and connect students with resources that shape successful careers.',
              color: 'from-orange-400 to-yellow-300',
              icon: '🚀'
            },
            {
              title: 'Our Vision',
              desc: 'To become the most trusted student platform driving innovation in education and career building.',
              color: 'from-indigo-500 to-purple-400',
              icon: '🌐'
            },
            {
              title: 'Our Values',
              desc: 'Trust, creativity, support, growth, and continuous improvement.',
              color: 'from-green-400 to-emerald-300',
              icon: '🌟'
            }
          ].map((card, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Image + Quote Section */}
        <div className="mt-16 flex flex-col md:flex-row items-center gap-10 px-6 lg:px-20">
          <img
            src="https://static.vecteezy.com/system/resources/previews/007/149/650/non_2x/career-growth-concept-wooden-block-bar-chart-graph-with-text-and-upward-trend-line-drawn-on-background-photo.jpg"
            alt="Career growth"
            className="rounded-lg shadow-md w-full  md:w-1/2 h-96 object-cover"
          />
          <div className="text-gray-800 text-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-3">Why Career Jupiter?</h2>
            <p className="mb-2">
              We help students discover their path through:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personalized counseling sessions</li>
              <li>Internship & placement opportunities</li>
              <li>College collaboration across India</li>
              <li>Online skill development workshops</li>
              <li>Peer learning & mentor support</li>
            </ul>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-20 px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">Our Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { year: '2025', event: 'Founded Career Jupiter' },
              { year: '2025', event: 'Connected with 1500+ students' },
              { year: '2025', event: 'Partnered with 1000+ colleges' },
              { year: '2025', event: 'Launched internship portal' }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white shadow-md rounded-lg border-l-4 border-purple-500">
                <h4 className="text-xl font-bold text-purple-700">{item.year}</h4>
                <p className="text-gray-600">{item.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 px-6 lg:px-20 text-center">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">Be a part of Career Jupiter</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2">
            Whether you're a student, mentor, or college partner – we welcome you to grow together. Join us to unlock limitless opportunities.
          </p>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
