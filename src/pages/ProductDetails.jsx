import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  EyeIcon,
  ShareIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  // Mock product data - in real app, fetch by ID
  const product = {
    id: id || 1,
    name: "Premium Wireless Bluetooth Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for extended listening sessions. Perfect for music lovers, gamers, and professionals alike.",
    price: 89.99,
    originalPrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop&crop=center"
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Blue', hex: '#3B82F6' },
      { name: 'Red', hex: '#EF4444' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    stockCount: 15,
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge (10 min = 5 hours)",
      "Premium comfort design",
      "Bluetooth 5.0",
      "Built-in microphone"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32Ω",
      "Sensitivity": "105dB",
      "Weight": "250g",
      "Cable Length": "1.2m"
    },
    badges: ["Best Seller", "Free Shipping", "2-Year Warranty"]
  };

  // Handle quantity changes
  const updateQuantity = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
    // Add to cart logic here
    console.log('Added to cart:', {
      product: product.name,
      quantity,
      color: selectedColor,
      size: selectedSize,
      price: product.price * quantity
    });
  };

  // Calculate savings
  const savings = product.originalPrice - product.price;
  const savingsPercentage = Math.round((savings / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.badges.map((badge, index) => (
                  <span
                    key={badge}
                    className="block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 space-y-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                    isWishlisted 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <HeartIcon className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 shadow-lg hover:bg-indigo-500 hover:text-white transition-all duration-300">
                  <ShareIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                    selectedImage === index 
                      ? 'ring-4 ring-indigo-500 scale-105' 
                      : 'hover:scale-105'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full">
                      Save ${savings} ({savingsPercentage}%)
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Color: <span className="text-indigo-600 dark:text-indigo-400">{selectedColor}</span>
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                      selectedColor === color.name
                        ? 'border-indigo-500 scale-110'
                        : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Size: <span className="text-indigo-600 dark:text-indigo-400">{selectedSize}</span>
              </h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <button
                    onClick={() => updateQuantity(quantity - 1)}
                    className="p-3 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg transition-colors"
                    disabled={quantity <= 1}
                  >
                    <span className="text-xl font-bold text-gray-600 dark:text-gray-300">−</span>
                  </button>
                  <span className="px-6 py-3 text-xl font-semibold text-gray-900 dark:text-white min-w-[4rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg transition-colors"
                    disabled={quantity >= product.stockCount}
                  >
                    <span className="text-xl font-bold text-gray-600 dark:text-gray-300">+</span>
                  </button>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.stockCount} in stock
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  product.inStock
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCartIcon className="w-6 h-6" />
                <span>
                  {product.inStock ? `Add to Cart - $${(product.price * quantity).toFixed(2)}` : 'Out of Stock'}
                </span>
              </button>

              {/* Added to Cart Notification */}
              {showAddedToCart && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-bounce">
                  <CheckIcon className="w-5 h-5" />
                  <span>Added to cart successfully!</span>
                </div>
              )}
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <TruckIcon className="w-8 h-8 mx-auto text-green-500 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Free Shipping</p>
              </div>
              <div className="text-center">
                <ShieldCheckIcon className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">2-Year Warranty</p>
              </div>
              <div className="text-center">
                <CreditCardIcon className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Specifications
          </h2>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{key}</span>
                  <span className="text-gray-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
