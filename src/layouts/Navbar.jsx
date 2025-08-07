import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import {
  SunIcon,
  MoonIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useDarkMode } from "../contexts/DarkModeContext";

const categories = [
  { name: "Electronics", href: "/categories/electronics" },
  { name: "Fashion", href: "/categories/fashion" },
  { name: "Grocery", href: "/categories/grocery" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggleDarkMode } = useDarkMode();
  const [cartCount, setCartCount] = useState(3); // Example cart count
  const location = useLocation();

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  // Gradient underline animation
  const navLinkClass = (active) =>
    `relative px-4 py-2 font-semibold transition-all duration-300
    ${active ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-200"}
    group
    `;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500
        ${scrolled ? "shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/40 dark:border-gray-700/40" : "bg-white/40 dark:bg-gray-900/40 backdrop-blur-md"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent select-none tracking-tight hover:scale-110 transition-transform duration-300"
          >
            E-Shop
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" label="Home" location={location} navLinkClass={navLinkClass} />
            <NavLink to="/products" label="Shop" location={location} navLinkClass={navLinkClass} />
            {/* Categories Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className={navLinkClass(location.pathname.startsWith("/categories")) + " flex items-center"}>
                Categories
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </Menu.Button>
              <Menu.Items className="absolute left-0 mt-2 w-44 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                {categories.map((cat) => (
                  <Menu.Item key={cat.name}>
                    {({ active }) => (
                      <Link
                        to={cat.href}
                        className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                          active ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {cat.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
            <NavLink to="/about" label="About" location={location} navLinkClass={navLinkClass} />
            <NavLink to="/contact" label="Contact" location={location} navLinkClass={navLinkClass} />

            {/* Search */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search…"
                className="pl-10 pr-4 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative ml-2 group">
              <ShoppingCartIcon className="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle dark mode"
            >
              {dark ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* Profile Icon */}
            <Link to="/profile" className="ml-2 group">
              <UserCircleIcon className="w-7 h-7 text-gray-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl border-t border-gray-200/40 dark:border-gray-700/40
        ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 py-6 flex flex-col space-y-3">
          <NavLink to="/" label="Home" location={location} navLinkClass={navLinkClass} />
          <NavLink to="/products" label="Shop" location={location} navLinkClass={navLinkClass} />
          {/* Categories Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className={navLinkClass(location.pathname.startsWith("/categories")) + " flex items-center"}>
              Categories
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Menu.Button>
            <Menu.Items className="absolute left-0 mt-2 w-44 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
              {categories.map((cat) => (
                <Menu.Item key={cat.name}>
                  {({ active }) => (
                    <Link
                      to={cat.href}
                      className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                        active ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
          <NavLink to="/about" label="About" location={location} navLinkClass={navLinkClass} />
          <NavLink to="/contact" label="Contact" location={location} navLinkClass={navLinkClass} />

          {/* Search */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search…"
              className="pl-10 pr-4 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <ShoppingCartIcon className="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition self-start"
            aria-label="Toggle dark mode"
          >
            {dark ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-600" />}
          </button>

          {/* Login Icon */}
          <Link to="/login" className="group">
            <UserCircleIcon className="w-7 h-7 text-gray-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Helper for nav links with gradient underline
function NavLink({ to, label, location, navLinkClass }) {
  const active = location.pathname === to;
  return (
    <Link to={to} className={navLinkClass(active)}>
      <span className="relative z-10">{label}</span>
      <span
        className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300
        ${active ? 'w-full' : 'w-0 group-hover:w-full'}
        `}
      ></span>
    </Link>
  );
}

export default Navbar;