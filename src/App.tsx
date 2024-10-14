import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogEditor from './pages/BlogEditor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/editor" element={<BlogEditor />} />
            <Route path="/blog/editor/:id" element={<BlogEditor />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;