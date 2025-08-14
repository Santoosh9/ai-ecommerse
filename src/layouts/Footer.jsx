import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowUpIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' }
    ],
    categories: [
      { name: 'Electronics', href: '/categories/electronics' },
      { name: 'Fashion', href: '/categories/fashion' },
      { name: 'Home & Garden', href: '/categories/home' },
      { name: 'Sports', href: '/categories/sports' }
    ]
  };

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ), 
      href: '#', 
      color: 'hover:text-blue-600' 
    },
    { 
      name: 'Instagram', 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
        </svg>
      ), 
      href: '#', 
      color: 'hover:text-pink-500' 
    },
    { 
      name: 'Twitter', 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ), 
      href: '#', 
      color: 'hover:text-blue-400' 
    },
    { 
      name: 'LinkedIn', 
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ), 
      href: '#', 
      color: 'hover:text-blue-700' 
    }
  ];

  return (
    <>
      {/* Main Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Stay Updated
                </h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter for exclusive offers, new products, and updates
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <Link to="/" className="inline-block mb-6">
                  <img
                    src="/images/Logo.jpg"
                    alt="E-Shop Logo"
                    className="h-16 w-auto object-contain rounded-2xl shadow-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300"
                  />
                </Link>
                                 <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                   🚀 <span className="text-blue-400 font-semibold">Revolutionizing</span> online shopping with cutting-edge technology and curated collections. 
                   ✨ Experience the future of e-commerce with lightning-fast delivery, AI-powered recommendations, and 24/7 customer support. 
                   🎯 Your satisfaction is our mission!
                 </p>
                
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 group">
                    <EnvelopeIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">contact@eshop.com</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <PhoneIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <MapPinIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">123 E-Shop Street, Digital City</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-white/40 transform hover:scale-110 transition-all duration-300 ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Categories</h3>
                <ul className="space-y-3">
                  {footerLinks.categories.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-white/10 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 text-gray-300">
                  <span>© {currentYear} Santosh Gajurel. All rights reserved.</span>
                 
                </div>
                
                <div className="flex items-center spacwithe-x-6">
              <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-300 text-sm">4.9/5</span>
                  </div>
                  
                  <div className="flex space-x-4">
                    {footerLinks.legal.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-6 h-6 mx-auto" />
      </button>
    </>
  );
};

export default Footer;
