import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TruckIcon,
  CurrencyDollarIcon,
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ShoppingBagIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const ManageOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Mock data for orders
  const orders = [
    {
      id: '#ORD-001',
      customer: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001'
      },
      items: [
        { name: 'Wireless Bluetooth Headphones', quantity: 2, price: 89.99 },
        { name: 'Smart Watch Series 5', quantity: 1, price: 299.99 }
      ],
      total: 479.97,
      status: 'Delivered',
      date: '2024-01-15',
      paymentMethod: 'Credit Card',
      shippingMethod: 'Express',
      trackingNumber: 'TRK123456789'
    },
    {
      id: '#ORD-002',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Ave, Los Angeles, CA 90210'
      },
      items: [
        { name: 'Premium Coffee Maker', quantity: 1, price: 199.99 },
        { name: 'Running Shoes Pro', quantity: 1, price: 129.99 },
        { name: 'Designer Handbag', quantity: 1, price: 299.99 }
      ],
      total: 629.97,
      status: 'Shipped',
      date: '2024-01-14',
      paymentMethod: 'PayPal',
      shippingMethod: 'Standard',
      trackingNumber: 'TRK987654321'
    },
    {
      id: '#ORD-003',
      customer: {
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        phone: '+1 (555) 456-7890',
        address: '789 Pine St, Chicago, IL 60601'
      },
      items: [
        { name: 'Smart Home Hub', quantity: 1, price: 149.99 }
      ],
      total: 149.99,
      status: 'Processing',
      date: '2024-01-14',
      paymentMethod: 'Credit Card',
      shippingMethod: 'Standard',
      trackingNumber: 'TRK456789123'
    },
    {
      id: '#ORD-004',
      customer: {
        name: 'Emily Rodriguez',
        email: 'emily.r@email.com',
        phone: '+1 (555) 321-6547',
        address: '321 Elm St, Miami, FL 33101'
      },
      items: [
        { name: 'Wireless Earbuds', quantity: 1, price: 79.99 },
        { name: 'Phone Case', quantity: 2, price: 19.99 },
        { name: 'Screen Protector', quantity: 1, price: 9.99 }
      ],
      total: 129.96,
      status: 'Pending',
      date: '2024-01-13',
      paymentMethod: 'Credit Card',
      shippingMethod: 'Express',
      trackingNumber: 'TRK321654987'
    },
    {
      id: '#ORD-005',
      customer: {
        name: 'David Kim',
        email: 'david.kim@email.com',
        phone: '+1 (555) 789-0123',
        address: '654 Maple Dr, Seattle, WA 98101'
      },
      items: [
        { name: 'Gaming Mouse', quantity: 1, price: 89.99 },
        { name: 'Mechanical Keyboard', quantity: 1, price: 199.99 }
      ],
      total: 289.98,
      status: 'Delivered',
      date: '2024-01-13',
      paymentMethod: 'PayPal',
      shippingMethod: 'Standard',
      trackingNumber: 'TRK789012345'
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircleIcon className="w-5 h-5" />;
      case 'Shipped': return <TruckIcon className="w-5 h-5" />;
      case 'Processing': return <ClockIcon className="w-5 h-5" />;
      case 'Pending': return <ClockIcon className="w-5 h-5" />;
      default: return <ClockIcon className="w-5 h-5" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'date':
        comparison = new Date(b.date) - new Date(a.date);
        break;
      case 'total':
        comparison = b.total - a.total;
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = 0;
    }
    return sortOrder === 'desc' ? comparison : -comparison;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    // In a real app, this would update the database
    console.log(`Updating order ${orderId} status to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Manage <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Orders</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                View and manage all customer orders
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>New Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            >
              <option value="date">Sort by Date</option>
              <option value="total">Sort by Total</option>
              <option value="status">Sort by Status</option>
            </select>

            {/* Sort Order */}
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {sortOrder === 'desc' ? (
                <ArrowDownIcon className="w-4 h-4" />
              ) : (
                <ArrowUpIcon className="w-4 h-4" />
              )}
              <span>{sortOrder === 'desc' ? 'Desc' : 'Asc'}</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80 dark:bg-gray-700/80">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Order ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Items</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900 dark:text-white">Total</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Date</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900 dark:text-white">{order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{order.customer.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <ShoppingBagIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{order.items.length} items</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-bold text-gray-900 dark:text-white">${order.total}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center justify-center space-x-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-gray-900 dark:text-white">{order.date}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-300"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-300">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-300">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {showOrderModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Order Details - {selectedOrder.id}
                  </h2>
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                  >
                    <XCircleIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                      <UserIcon className="w-5 h-5" />
                      <span>Customer Information</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{selectedOrder.customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <PhoneIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{selectedOrder.customer.phone}</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPinIcon className="w-4 h-4 text-gray-400 mt-1" />
                        <span className="text-gray-900 dark:text-white">{selectedOrder.customer.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                      <CalendarIcon className="w-5 h-5" />
                      <span>Order Information</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Order Date:</span>
                        <span className="text-gray-900 dark:text-white">{selectedOrder.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                        <span className="text-gray-900 dark:text-white">{selectedOrder.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Shipping Method:</span>
                        <span className="text-gray-900 dark:text-white">{selectedOrder.shippingMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tracking Number:</span>
                        <span className="text-gray-900 dark:text-white">{selectedOrder.trackingNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <ShoppingBagIcon className="w-5 h-5" />
                    <span>Order Items</span>
                  </h3>
                  <div className="bg-gray-50/80 dark:bg-gray-700/80 rounded-xl p-4">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">${item.price}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">${selectedOrder.total}</span>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Status</h3>
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300">
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrder;
