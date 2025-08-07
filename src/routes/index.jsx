import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Login from '../layouts/Login';
import Register from '../layouts/Register';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Categories from '../pages/Categories';
import Profile from '../pages/Profile';
import AdminDashboard from '../admin/AdminDashboard';
import ManageOrder from '../admin/ManageOrder';
import ManageProduct from '../admin/ManageProduct';
import ManageUser from '../admin/ManageUser';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:category" element={<Categories />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/manage-orders" element={<ManageOrder />} />
      <Route path="/manage-products" element={<ManageProduct />} />
      <Route path="/manage-users" element={<ManageUser />} />
    </Routes>
  );
};

export default AppRoutes; 