import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrashIcon, 
  PlusIcon, 
  MinusIcon, 
  ShoppingBagIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
      color: "Black",
      inStock: true,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
      color: "Silver",
      inStock: true,
      badge: "New"
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop&crop=center",
      color: "Stainless Steel",
      inStock: false,
      badge: "Limited"
    }
  ]);

  const [isRemoving, setIsRemoving] = useState(null);
  const [showEmptyCart, setShowEmptyCart] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item with animation
  const removeItem = (id) => {
    setIsRemoving(id);
    setTimeout(() => {
      setCartItems(prev => prev.filter(item => item.id !== id));
      setIsRemoving(null);
      if (cartItems.length === 1) {
        setShowEmptyCart(true);
      }
    }, 300);
  };

  // Handle checkout
  const handleCheckout = () => {
    // Add checkout logic here
    console.log('Proceeding to checkout...');
  };

  // Empty cart state
  if (cartItems.length === 0 && showEmptyCart) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="animate-bounce mb-8">
              <ShoppingBagIcon className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to see some amazing products!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/products"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Continue Shopping
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <ShoppingBagIcon className="w-6 h-6" />
              <span className="font-semibold">{cartItems.length} items</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Cart Items ({cartItems.length})
                </h2>
                
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`relative bg-white dark:bg-gray-700 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-600 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                        isRemoving === item.id ? 'animate-pulse opacity-50' : ''
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Badge */}
                      {item.badge && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg">
                            {item.badge}
                          </span>
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="relative flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 rounded-xl object-cover shadow-md hover:scale-110 transition-transform duration-300"
                            />
                            {!item.inStock && (
                              <div className="absolute inset-0 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <span className="text-red-600 text-xs font-semibold bg-white px-2 py-1 rounded">
                                  Out of Stock
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              Color: <span className="font-medium">{item.color}</span>
                            </p>
                            
                            {/* Price */}
                            <div className="flex items-center space-x-3 mb-4">
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${item.price}
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="text-lg text-gray-500 line-through">
                                  ${item.originalPrice}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Quantity:
                                </span>
                                <div className="flex items-center bg-gray-100 dark:bg-gray-600 rounded-lg">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-l-lg transition-colors"
                                    disabled={item.quantity <= 1}
                                  >
                                    <MinusIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                  </button>
                                  <span className="px-4 py-2 text-lg font-semibold text-gray-900 dark:text-white min-w-[3rem] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-r-lg transition-colors"
                                    disabled={!item.inStock}
                                  >
                                    <PlusIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                  </button>
                                </div>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 group"
                              >
                                <TrashIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Order Summary
                  </h2>

                  {/* Summary Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 dark:text-green-400">Savings</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          -${savings.toFixed(2)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <TruckIcon className="w-5 h-5 text-green-500" />
                      <span>Free shipping on orders over $100</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <ShieldCheckIcon className="w-5 h-5 text-blue-500" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <CreditCardIcon className="w-5 h-5 text-purple-500" />
                      <span>Multiple payment options</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <CreditCardIcon className="w-5 h-5" />
                    <span>Proceed to Checkout</span>
                  </button>

                  {/* Continue Shopping */}
                  <Link
                    to="/products"
                    className="block w-full text-center mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
