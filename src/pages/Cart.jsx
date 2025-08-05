import React from 'react';

const Cart = () => {
  return (
    <div className="pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
          <p className="text-center text-gray-400 mt-2">Add some products to get started!</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
