import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">PERN Blog</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/services" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Services</Link>
              <Link to="/work" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Work</Link>
              <Link to="/faqs" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">FAQs</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              <Link to="/blog" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Blog</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/services" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Services</Link>
            <Link to="/work" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Work</Link>
            <Link to="/faqs" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">FAQs</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Blog</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;