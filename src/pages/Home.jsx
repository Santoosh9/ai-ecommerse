import React from 'react';

const Home = () => {
  return (
    <div className="pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Welcome to E-Shop
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing products with our beautiful animated navbar experience
          </p>
          <div className="space-y-4">
            <p className="text-gray-500">✨ Beautiful animations</p>
            <p className="text-gray-500">📱 Fully responsive</p>
            <p className="text-gray-500">🎨 Modern design</p>
          </div>
        </div>
        
        {/* Demo content to show scroll effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Feature {item}</h3>
              <p className="text-gray-600">
                This is demo content to show how the navbar looks when you scroll. Try scrolling down to see the glassmorphism effect!
              </p>
            </div>
          ))}
        </div>
        
        {/* More content for scrolling */}
        <div className="py-20 space-y-8">
          {[1, 2, 3, 4, 5].map((section) => (
            <div key={section} className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Section {section}</h3>
              <p className="text-gray-600">
                Scroll down to see more content and experience the beautiful navbar animations. 
                The navbar will change its appearance as you scroll!
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
