import React from 'react';

const Work: React.FC = () => {
  const projects = [
    { title: 'E-commerce Platform', description: 'A full-stack online store using PERN stack', image: 'https://source.unsplash.com/random/800x600?ecommerce' },
    { title: 'Task Management App', description: 'A collaborative project management tool', image: 'https://source.unsplash.com/random/800x600?task' },
    { title: 'Social Media Dashboard', description: 'Analytics and management platform for social media', image: 'https://source.unsplash.com/random/800x600?social' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Our Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;