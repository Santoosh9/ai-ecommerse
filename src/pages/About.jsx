import React from 'react';

const About = () => {
  return (
    <div className="pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <p className="text-lg text-gray-600 mb-6">
            Welcome to E-Shop, your premier destination for online shopping. We are committed to providing 
            the best shopping experience with quality products and exceptional customer service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600">To provide high-quality products with excellent customer service.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-600">To become the leading e-commerce platform worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 