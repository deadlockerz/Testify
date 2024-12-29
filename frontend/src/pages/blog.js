import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Fetch existing blogs when the component mounts
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3030/blogs'); // Replace with your API endpoint
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }; 

    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleAddBlog = async () => {
    try {
      const response = await axios.post('http://localhost:3030/blogs', newBlog); // Replace with your API endpoint
      setBlogs((prevBlogs) => [...prevBlogs, response.data]);
      setNewBlog({ title: '', content: '' });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Blogs</h1>
        
           <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Blog</h2>
            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              name="content"
              value={newBlog.content}
              onChange={handleInputChange}
              placeholder="Content"
              rows="4"
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleAddBlog}
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Add Blog
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="ml-4 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        
          
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
