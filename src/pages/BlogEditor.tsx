import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createBlog, updateBlog, fetchBlogById } from '../redux/blogSlice';
import { RootState, AppDispatch } from '../redux/store';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentBlog, status } = useSelector((state: RootState) => state.blog);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [subImages, setSubImages] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentBlog) {
      setTitle(currentBlog.title);
      setSubtitle(currentBlog.subtitle);
      setContent(currentBlog.content);
      setMainImage(currentBlog.main_image);
      setSubImages(currentBlog.sub_images);
      setAuthorName(currentBlog.author_name);
    }
  }, [currentBlog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = {
      title,
      subtitle,
      content,
      main_image: mainImage,
      sub_images: subImages,
      author_name: authorName,
    };

    if (id) {
      dispatch(updateBlog({ id, ...blogData }));
    } else {
      dispatch(createBlog(blogData));
    }

    navigate('/blog');
  };

  const handleSubImageChange = (index: number, value: string) => {
    const newSubImages = [...subImages];
    newSubImages[index] = value;
    setSubImages(newSubImages);
  };

  const addSubImage = () => {
    setSubImages([...subImages, '']);
  };

  const removeSubImage = (index: number) => {
    const newSubImages = subImages.filter((_, i) => i !== index);
    setSubImages(newSubImages);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{id ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700">Main Image URL</label>
          <input
            type="url"
            id="mainImage"
            value={mainImage}
            onChange={(e) => setMainImage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sub Images</label>
          {subImages.map((subImage, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="url"
                value={subImage}
                onChange={(e) => handleSubImageChange(index, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={() => removeSubImage(index)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubImage}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Sub Image
          </button>
        </div>
        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">Author Name</label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {id ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;