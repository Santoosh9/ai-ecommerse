import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  HeartIcon,
  EyeIcon,
  ShoppingCartIcon,
  StarIcon,
  SparklesIcon,
  FireIcon,
  BoltIcon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 1247,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      badge: "Best Seller",
      colors: ["Black", "White", "Blue"],
      inStock: true,
      isNew: false,
      isHot: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch Pro",
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.6,
      reviews: 892,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      badge: "New",
      colors: ["Black", "Silver", "Rose Gold"],
      inStock: true,
      isNew: true,
      isHot: false
    },
    {
      id: 3,
      name: "Luxury Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.9,
      reviews: 567,
      category: "Home & Garden",
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      badge: "Sale",
      colors: ["Stainless Steel", "Black"],
      inStock: true,
      isNew: false,
      isHot: true
    },
    {
      id: 4,
      name: "Designer Leather Handbag",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviews: 234,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      badge: "Limited",
      colors: ["Brown", "Black", "Beige"],
      inStock: true,
      isNew: true,
      isHot: false
    },
    {
      id: 5,
      name: "Professional Running Shoes",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.5,
      reviews: 678,
      category: "Sports",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      badge: "Popular",
      colors: ["White", "Black", "Red"],
      inStock: true,
      isNew: false,
      isHot: true
    },
    {
      id: 6,
      name: "Wireless Earbuds Pro",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviews: 445,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      badge: "Trending",
      colors: ["White", "Black"],
      inStock: false,
      isNew: true,
      isHot: true
    },
    {
      id: 7,
      name: "Premium Yoga Mat",
      price: 39.99,
      originalPrice: 49.99,
      rating: 4.3,
      reviews: 234,
      category: "Sports",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      badge: "Eco-Friendly",
      colors: ["Purple", "Blue", "Green"],
      inStock: true,
      isNew: false,
      isHot: false
    },
    {
      id: 8,
      name: "Protective Phone Case",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.2,
      reviews: 189,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1603313011962-71737c079a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      badge: "Protection",
      colors: ["Clear", "Black", "Pink"],
      inStock: true,
      isNew: false,
      isHot: false
    }
  ];

  const categories = [
    { name: "All", icon: SparklesIcon, color: "from-purple-500 to-pink-500" },
    { name: "Electronics", icon: BoltIcon, color: "from-blue-500 to-cyan-500" },
    { name: "Fashion", icon: SparklesIcon, color: "from-pink-500 to-rose-500" },
    { name: "Home & Garden", icon: SparklesIcon, color: "from-green-500 to-emerald-500" },
    { name: "Sports", icon: FireIcon, color: "from-orange-500 to-red-500" }
  ];

  // Filter and search products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'New':
        return 'bg-gradient-to-r from-green-400 to-emerald-500';
      case 'Sale':
        return 'bg-gradient-to-r from-red-400 to-pink-500';
      case 'Limited':
        return 'bg-gradient-to-r from-purple-400 to-indigo-500';
      case 'Popular':
        return 'bg-gradient-to-r from-blue-400 to-cyan-500';
      case 'Trending':
        return 'bg-gradient-to-r from-pink-400 to-rose-500';
      case 'Eco-Friendly':
        return 'bg-gradient-to-r from-green-400 to-teal-500';
      case 'Protection':
        return 'bg-gradient-to-r from-gray-400 to-slate-500';
      default:
        return 'bg-gradient-to-r from-blue-400 to-purple-500';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of premium products with unbeatable prices and exceptional quality
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg w-full">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
            </div>

            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            >
              <option value="featured">✨ Featured</option>
              <option value="price-low">💰 Price: Low to High</option>
              <option value="price-high">💰 Price: High to Low</option>
              <option value="rating">⭐ Highest Rated</option>
              <option value="newest">🆕 Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 sticky top-8 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Categories</h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center p-4 rounded-2xl transition-all duration-300 ${
                        selectedCategory === category.name
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <category.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h4>
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-3 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setPriceRange([0, 1000]);
                  setSortBy('featured');
                }}
                className="w-full px-6 py-4 text-gray-600 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-lg text-gray-600">
                Showing <span className="font-semibold text-indigo-600">{sortedProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-white/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden h-80">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className={`absolute top-4 left-4 ${getBadgeColor(product.badge)} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                        {product.badge}
                      </div>
                    )}

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute top-4 right-4 bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Out of Stock
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 space-y-3">
                      <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110">
                        <HeartIcon className="w-6 h-6 text-gray-600" />
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110"
                      >
                        <EyeIcon className="w-6 h-6 text-gray-600" />
                      </Link>
                    </div>

                    {/* Color Options */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex space-x-3">
                        {product.colors.slice(0, 3).map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-8 h-8 rounded-full border-3 border-white shadow-lg"
                            style={{
                              backgroundColor: color.toLowerCase(),
                              backgroundImage: color === 'White' ? 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)' : 'none',
                              backgroundSize: color === 'White' ? '8px 8px' : 'auto'
                            }}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-3 border-white shadow-lg bg-gray-300 flex items-center justify-center">
                            <span className="text-xs text-gray-600 font-bold">+{product.colors.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-8">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-3 font-medium">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                        <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                      </div>
                      <span className="text-sm text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 ${
                        product.inStock
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      <ShoppingCartIcon className="w-6 h-6" />
                      <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-16 h-16 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                <p className="text-lg text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setPriceRange([0, 1000]);
                    setSortBy('featured');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
