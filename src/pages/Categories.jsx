import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  HeartIcon,
  EyeIcon,
  ShoppingCartIcon,
  StarIcon,
  XMarkIcon,
  ChevronDownIcon,
  SparklesIcon,
  FireIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useDebounce } from '../hooks';
import LazyImage from '../components/LazyImage';

const Categories = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  
  // Debounced search for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Category-specific product data
  const categoryProducts = useMemo(() => {
    const allProducts = {
      electronics: [
        {
          id: 1,
          name: 'Wireless Bluetooth Headphones',
          price: 89.99,
          originalPrice: 129.99,
          rating: 4.8,
          reviews: 1247,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
          badge: 'Best Seller',
          colors: ['Black', 'White', 'Blue'],
          inStock: true,
          isNew: false,
          isHot: true
        },
        {
          id: 2,
          name: 'Smart Watch Series 5',
          price: 299.99,
          originalPrice: 399.99,
          rating: 4.9,
          reviews: 892,
          image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&crop=center',
          badge: 'New',
          colors: ['Silver', 'Black', 'Rose Gold'],
          inStock: true,
          isNew: true,
          isHot: false
        },
        {
          id: 6,
          name: 'Wireless Earbuds',
          price: 79.99,
          originalPrice: 99.99,
          rating: 4.4,
          reviews: 678,
          image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop&crop=center',
          badge: 'Sale',
          colors: ['White', 'Black'],
          inStock: false,
          isNew: false,
          isHot: false
        },
        {
          id: 8,
          name: 'Smart Home Hub',
          price: 199.99,
          originalPrice: 249.99,
          rating: 4.7,
          reviews: 234,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
          badge: 'New',
          colors: ['White', 'Black'],
          inStock: true,
          isNew: true,
          isHot: false
        },
        {
          id: 9,
          name: '4K Smart TV',
          price: 599.99,
          originalPrice: 799.99,
          rating: 4.6,
          reviews: 445,
          image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&crop=center',
          badge: 'Sale',
          colors: ['Black'],
          inStock: true,
          isNew: false,
          isHot: true
        },
        {
          id: 10,
          name: 'Gaming Laptop',
          price: 1299.99,
          originalPrice: 1499.99,
          rating: 4.8,
          reviews: 567,
          image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop&crop=center',
          badge: 'Hot',
          colors: ['Black', 'Red'],
          inStock: true,
          isNew: false,
          isHot: true
        }
      ],
      fashion: [
        {
          id: 5,
          name: 'Designer Handbag',
          price: 89.99,
          originalPrice: 120.00,
          rating: 4.5,
          reviews: 432,
          image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&crop=center',
          badge: 'Trending',
          colors: ['Brown', 'Black', 'Beige'],
          inStock: true,
          isNew: false,
          isHot: true
        },
        {
          id: 11,
          name: 'Premium Denim Jacket',
          price: 129.99,
          originalPrice: 159.99,
          rating: 4.7,
          reviews: 234,
          image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop&crop=center',
          badge: 'New',
          colors: ['Blue', 'Black'],
          inStock: true,
          isNew: true,
          isHot: false
        },
        {
          id: 12,
          name: 'Leather Sneakers',
          price: 149.99,
          originalPrice: 189.99,
          rating: 4.6,
          reviews: 345,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center',
          badge: 'Popular',
          colors: ['White', 'Black', 'Brown'],
          inStock: true,
          isNew: false,
          isHot: true
        },
        {
          id: 13,
          name: 'Silk Scarf',
          price: 45.99,
          originalPrice: 59.99,
          rating: 4.4,
          reviews: 123,
          image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop&crop=center',
          badge: 'Sale',
          colors: ['Red', 'Blue', 'Green'],
          inStock: true,
          isNew: false,
          isHot: false
        },
        {
          id: 14,
          name: 'Wool Sweater',
          price: 89.99,
          originalPrice: 119.99,
          rating: 4.5,
          reviews: 267,
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop&crop=center',
          badge: 'Best Value',
          colors: ['Gray', 'Navy', 'Burgundy'],
          inStock: true,
          isNew: false,
          isHot: false
        }
      ],
      grocery: [
        {
          id: 15,
          name: 'Organic Honey',
          price: 12.99,
          originalPrice: 15.99,
          rating: 4.8,
          reviews: 456,
          image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&crop=center',
          badge: 'Organic',
          colors: ['Golden'],
          inStock: true,
          isNew: false,
          isHot: true
        },
        {
          id: 16,
          name: 'Fresh Coffee Beans',
          price: 24.99,
          originalPrice: 29.99,
          rating: 4.9,
          reviews: 789,
          image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center',
          badge: 'Premium',
          colors: ['Brown'],
          inStock: true,
          isNew: false,
          isHot: true
        },
        {
          id: 17,
          name: 'Extra Virgin Olive Oil',
          price: 18.99,
          originalPrice: 22.99,
          rating: 4.7,
          reviews: 234,
          image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&crop=center',
          badge: 'Best Seller',
          colors: ['Green'],
          inStock: true,
          isNew: false,
          isHot: false
        },
        {
          id: 18,
          name: 'Organic Quinoa',
          price: 8.99,
          originalPrice: 11.99,
          rating: 4.6,
          reviews: 123,
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center',
          badge: 'Organic',
          colors: ['White'],
          inStock: true,
          isNew: false,
          isHot: false
        },
        {
          id: 19,
          name: 'Dark Chocolate',
          price: 6.99,
          originalPrice: 8.99,
          rating: 4.8,
          reviews: 567,
          image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop&crop=center',
          badge: 'Sale',
          colors: ['Brown'],
          inStock: true,
          isNew: false,
          isHot: true
        },
        {
          id: 20,
          name: 'Fresh Herbs Bundle',
          price: 4.99,
          originalPrice: 6.99,
          rating: 4.5,
          reviews: 89,
          image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=400&fit=crop&crop=center',
          badge: 'Fresh',
          colors: ['Green'],
          inStock: true,
          isNew: true,
          isHot: false
        }
      ]
    };

    return allProducts[category] || [];
  }, [category]);

  // Memoized callback functions for better performance
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setPriceRange([0, 1000]);
    setSortBy('featured');
  }, []);

  // Memoized filtered and sorted products
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesPrice;
    });
  }, [categoryProducts, debouncedSearchTerm, priceRange]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.isNew - a.isNew;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller': return 'bg-orange-500';
      case 'New': return 'bg-green-500';
      case 'Sale': return 'bg-red-500';
      case 'Popular': return 'bg-purple-500';
      case 'Trending': return 'bg-pink-500';
      case 'Best Value': return 'bg-blue-500';
      case 'Hot': return 'bg-red-600';
      case 'Organic': return 'bg-green-600';
      case 'Premium': return 'bg-yellow-600';
      case 'Fresh': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryInfo = () => {
    switch (category) {
      case 'electronics':
        return {
          title: 'Electronics',
          description: 'Discover the latest gadgets and technology',
          icon: '🔌',
          color: 'from-blue-500 to-purple-600'
        };
      case 'fashion':
        return {
          title: 'Fashion',
          description: 'Trendy clothing and accessories for every style',
          icon: '👗',
          color: 'from-pink-500 to-red-500'
        };
      case 'grocery':
        return {
          title: 'Grocery',
          description: 'Fresh and organic food products',
          icon: '🛒',
          color: 'from-green-500 to-teal-600'
        };
      default:
        return {
          title: 'All Categories',
          description: 'Browse all our products',
          icon: '📦',
          color: 'from-indigo-500 to-purple-600'
        };
    }
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/products"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to All Products</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`text-4xl ${categoryInfo.icon}`}></div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {categoryInfo.title} <span className={`bg-gradient-to-r ${categoryInfo.color} bg-clip-text text-transparent`}>Collection</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {categoryInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${categoryInfo.title.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
            >
              <FunnelIcon className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>$0</span>
                      <span>$1000</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <XMarkIcon className="w-5 h-5" />
                    <span>Clear Filters</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {sortedProducts.length} of {categoryProducts.length} products
          </p>
          <div className="flex items-center space-x-2">
            <SparklesIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {sortedProducts.filter(p => p.isNew).length} new arrivals
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-500"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <LazyImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${getBadgeColor(product.badge)}`}>
                    {product.badge}
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      wishlist.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <HeartIcon className="w-5 h-5" />
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                </div>

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  {product.isNew && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full">
                      NEW
                    </span>
                  )}
                  {product.isHot && (
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-full flex items-center">
                      <FireIcon className="w-3 h-3 mr-1" />
                      HOT
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Colors */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Colors:</span>
                  <div className="flex space-x-1">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={color}
                        className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    product.inStock
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories; 