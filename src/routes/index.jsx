import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load all page components
const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart'));

const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Profile = lazy(() => import('../pages/Profile'));
const Categories = lazy(() => import('../pages/Categories'));
const LocalProducts = lazy(() => import('../pages/LocalProducts'));
const AdminDashboard = lazy(() => import('../admin/AdminDashboard'));
const ManageOrder = lazy(() => import('../admin/ManageOrder'));
const ManageProduct = lazy(() => import('../admin/ManageProduct'));
const ManageUser = lazy(() => import('../admin/ManageUser'));

// Simple loading component for route transitions
const RouteLoading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<Categories />} />
        <Route path="/categories/local-products" element={<LocalProducts />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manage-orders" element={<ManageOrder />} />
        <Route path="/manage-products" element={<ManageProduct />} />
        <Route path="/manage-users" element={<ManageUser />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 