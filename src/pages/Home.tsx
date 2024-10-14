import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our PERN Blog</h1>
      <p className="text-xl mb-8">Discover insightful articles and stay up-to-date with the latest in technology and web development.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
          <p className="mb-4">Check out our most recent blog posts and join the conversation.</p>
          <Link to="/blog" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Blog</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">About Us</h2>
          <p className="mb-4">Learn more about our team and our mission to share knowledge and expertise.</p>
          <Link to="/about" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">About Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;