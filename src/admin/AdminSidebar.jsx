import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChartBarIcon,
  ShoppingBagIcon,
  CubeIcon,
  UsersIcon,
  CogIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: ChartBarIcon
    },
    {
      name: 'Manage Orders',
      path: '/manage-orders',
      icon: ShoppingBagIcon
    },
    {
      name: 'Manage Products',
      path: '/manage-products',
      icon: CubeIcon
    },
    {
      name: 'Manage Users',
      path: '/manage-users',
      icon: UsersIcon
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 z-40">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <CogIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">E-commerce Management</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Back to Main Site */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
