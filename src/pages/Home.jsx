

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to E-Shop</h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover amazing products at great prices. Browse our collection and find what you&apos;re looking for.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Featured Products</h3>
            <p className="text-gray-600">Check out our latest arrivals and best sellers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Special Offers</h3>
            <p className="text-gray-600">Don&apos;t miss out on our limited-time deals and discounts.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
            <p className="text-gray-600">We&apos;re here to help with any questions or concerns.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
