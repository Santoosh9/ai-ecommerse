import React from 'react';

const Categories = () => {
  return (
    <div className="pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Product Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Electronics', icon: '📱', color: 'from-blue-500 to-blue-600' },
            { name: 'Fashion', icon: '👕', color: 'from-purple-500 to-purple-600' },
            { name: 'Grocery', icon: '🛒', color: 'from-green-500 to-green-600' },
            { name: 'Home & Garden', icon: '🏠', color: 'from-yellow-500 to-yellow-600' },
            { name: 'Sports', icon: '⚽', color: 'from-red-500 to-red-600' },
            { name: 'Books', icon: '📚', color: 'from-indigo-500 to-indigo-600' }
          ].map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{category.name}</h3>
              <p className="text-gray-600 text-center mb-4">Explore our {category.name.toLowerCase()} collection</p>
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Browse {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories; 