import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../redux/blogSlice';
import { RootState, AppDispatch } from '../redux/store';

const Blog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, status, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <Link to="/blog/editor" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Create New Post</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={blog.main_image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-2">{blog.subtitle}</p>
              <p className="text-sm text-gray-500">By {blog.author_name} on {new Date(blog.date_created).toLocaleDateString()}</p>
              <Link to={`/blog/editor/${blog.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;