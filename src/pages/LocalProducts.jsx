import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  MapPinIcon,
  StarIcon,
  ShoppingCartIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import LazyImage from '../components/LazyImage';

const LocalProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');

  // Local products data
  const localProducts = useMemo(() => [
    {
      id: 1,
      name: "Handcrafted Wooden Bowl",
      price: 45.99,
      originalPrice: 59.99,
      category: "handicrafts",
      location: "Kathmandu Valley",
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      description: "Beautiful hand-carved wooden bowl made by local artisans",
      inStock: true,
      featured: true
    },
    {
      id: 2,
      name: "Organic Honey",
      price: 12.99,
      originalPrice: 15.99,
      category: "food",
      location: "Pokhara",
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
      description: "Pure organic honey from local beekeepers",
      inStock: true,
      featured: true
    },
    {
      id: 3,
      name: "Handwoven Silk Scarf",
      price: 89.99,
      originalPrice: 120.00,
      category: "textiles",
      location: "Bhaktapur",
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop",
      description: "Traditional handwoven silk scarf with intricate patterns",
      inStock: true,
      featured: false
    },
    {
      id: 4,
      name: "Ceramic Tea Set",
      price: 75.50,
      originalPrice: 95.00,
      category: "handicrafts",
      location: "Lalitpur",
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      description: "Handcrafted ceramic tea set with traditional designs",
      inStock: true,
      featured: false
    },
    {
      id: 5,
      name: "Spices Collection",
      price: 28.99,
      originalPrice: 35.00,
      category: "food",
      location: "Biratnagar",
      rating: 4.8,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
      description: "Premium collection of local spices and herbs",
      inStock: true,
      featured: true
    },
    {
      id: 6,
      name: "Handmade Paper Notebook",
      price: 15.99,
      originalPrice: 22.00,
      category: "handicrafts",
      location: "Pokhara",
      rating: 4.5,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      description: "Eco-friendly handmade paper notebook",
      inStock: true,
      featured: false
    },
    {
      id: 7,
      name: "Traditional Jewelry",
      price: 150.00,
      originalPrice: 200.00,
      category: "jewelry",
      location: "Kathmandu",
      rating: 4.9,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      description: "Handcrafted traditional jewelry pieces",
      inStock: true,
      featured: true
    },
    {
      id: 8,
      name: "Local Coffee Beans",
      price: 18.99,
      originalPrice: 25.00,
      category: "food",
      location: "Ilam",
      rating: 4.7,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
      description: "Premium coffee beans from local farms",
      inStock: true,
      featured: false
    }
  ], []);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'handicrafts', name: 'Handicrafts' },
    { id: 'food', name: 'Food & Beverages' },
    { id: 'textiles', name: 'Textiles' },
    { id: 'jewelry', name: 'Jewelry' }
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = localProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        filtered.sort((a, b) => b.featured - a.featured);
        break;
      default:
        break;
    }

    return filtered;
  }, [localProducts, searchQuery, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = useCallback((product) => {
    // Add to cart logic here
    console.log('Added to cart:', product.name);
  }, []);

  const handleAddToWishlist = useCallback((product) => {
    // Add to wishlist logic here
    console.log('Added to wishlist:', product.name);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-600/80 to-blue-600/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Local Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Discover authentic local treasures handcrafted by skilled artisans from across Nepal
            </p>
            <div className="flex items-center justify-center space-x-4 text-green-100">
              <MapPinIcon className="w-6 h-6" />
              <span className="text-lg">Supporting Local Artisans & Communities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search local products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 appearance-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} of {localProducts.length} local products
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <LazyImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Location Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <MapPinIcon className="w-3 h-3" />
                    <span>{product.location}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors duration-300"
                  >
                    <HeartIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Link
                    to={`/product/${product.id}`}
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm transition-colors duration-300"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search criteria or browse all local products
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange([0, 1000]);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalProducts;
