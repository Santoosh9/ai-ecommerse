import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon,
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [notifications, setNotifications] = useState([]);

  // Mock data for analytics
  const analytics = {
    totalRevenue: 124750.50,
    totalOrders: 1247,
    totalCustomers: 8923,
    totalProducts: 156,
    revenueChange: 12.5,
    ordersChange: 8.3,
    customersChange: 15.7,
    productsChange: -2.1
  };

  // Mock data for recent orders
  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      amount: 89.99,
      status: 'Delivered',
      date: '2024-01-15',
      items: 2
    },
    {
      id: '#ORD-002',
      customer: 'Sarah Johnson',
      amount: 156.75,
      status: 'Shipped',
      date: '2024-01-14',
      items: 3
    },
    {
      id: '#ORD-003',
      customer: 'Mike Chen',
      amount: 234.50,
      status: 'Processing',
      date: '2024-01-14',
      items: 1
    },
    {
      id: '#ORD-004',
      customer: 'Emily Rodriguez',
      amount: 67.25,
      status: 'Pending',
      date: '2024-01-13',
      items: 4
    },
    {
      id: '#ORD-005',
      customer: 'David Kim',
      amount: 189.99,
      status: 'Delivered',
      date: '2024-01-13',
      items: 2
    }
  ];

  // Mock data for top products
  const topProducts = [
    {
      name: 'Wireless Bluetooth Headphones',
      sales: 234,
      revenue: 21060.00,
      growth: 15.3
    },
    {
      name: 'Smart Watch Series 5',
      sales: 189,
      revenue: 56699.00,
      growth: 8.7
    },
    {
      name: 'Premium Coffee Maker',
      sales: 156,
      revenue: 24453.00,
      growth: 22.1
    },
    {
      name: 'Running Shoes Pro',
      sales: 143,
      revenue: 18588.00,
      growth: 12.4
    },
    {
      name: 'Designer Handbag',
      sales: 98,
      revenue: 8819.00,
      growth: -3.2
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      type: 'order',
      message: 'New order #ORD-006 received from Lisa Wang',
      time: '2 minutes ago',
      icon: ShoppingBagIcon,
      color: 'text-blue-600'
    },
    {
      type: 'customer',
      message: 'New customer registration: Alex Thompson',
      time: '15 minutes ago',
      icon: UsersIcon,
      color: 'text-green-600'
    },
    {
      type: 'product',
      message: 'Product "Smart Home Hub" stock updated',
      time: '1 hour ago',
      icon: CogIcon,
      color: 'text-purple-600'
    },
    {
      type: 'alert',
      message: 'Low stock alert: Wireless Earbuds (5 remaining)',
      time: '2 hours ago',
      icon: ExclamationTriangleIcon,
      color: 'text-orange-600'
    },
    {
      type: 'payment',
      message: 'Payment received for order #ORD-004',
      time: '3 hours ago',
      icon: CheckCircleIcon,
      color: 'text-green-600'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Shipped': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'Processing': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Pending': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getGrowthIcon = (value) => {
    return value >= 0 ? (
      <ArrowUpIcon className="w-4 h-4 text-green-500" />
    ) : (
      <ArrowDownIcon className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                <BellIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Period Selector */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                {getGrowthIcon(analytics.revenueChange)}
                <span className={`text-sm font-semibold ${analytics.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.revenueChange >= 0 ? '+' : ''}{analytics.revenueChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              ${analytics.totalRevenue.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Total Revenue</p>
          </div>

          {/* Orders Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                <ShoppingBagIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                {getGrowthIcon(analytics.ordersChange)}
                <span className={`text-sm font-semibold ${analytics.ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.ordersChange >= 0 ? '+' : ''}{analytics.ordersChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.totalOrders.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Total Orders</p>
          </div>

          {/* Customers Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                {getGrowthIcon(analytics.customersChange)}
                <span className={`text-sm font-semibold ${analytics.customersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.customersChange >= 0 ? '+' : ''}{analytics.customersChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.totalCustomers.toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Total Customers</p>
          </div>

          {/* Products Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                {getGrowthIcon(analytics.productsChange)}
                <span className={`text-sm font-semibold ${analytics.productsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.productsChange >= 0 ? '+' : ''}{analytics.productsChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.totalProducts}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Total Products</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Orders
                </h2>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2">
                  <PlusIcon className="w-4 h-4" />
                  <span>View All</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-md rounded-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <ShoppingBagIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {order.id}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.customer} • {order.items} items
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">
                        ${order.amount}
                      </p>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Recent Activities
              </h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-md rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.color.replace('text-', 'bg-')} bg-opacity-10`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="mt-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Top Performing Products
              </h2>
                             <button className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center space-x-2">
                 <FunnelIcon className="w-4 h-4" />
                 <span>Filter</span>
               </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Product</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Sales</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Revenue</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">
                        {product.sales}
                      </td>
                      <td className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">
                        ${product.revenue.toLocaleString()}
                      </td>
                      <td className="text-right py-4 px-4">
                        <div className="flex items-center justify-end space-x-1">
                          {getGrowthIcon(product.growth)}
                          <span className={`font-semibold ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.growth >= 0 ? '+' : ''}{product.growth}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
