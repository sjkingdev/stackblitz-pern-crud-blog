import React from 'react';
import { Code, PenTool, Server } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    { title: 'Web Development', description: 'Custom web applications using the PERN stack', icon: Code },
    { title: 'UI/UX Design', description: 'Creating intuitive and beautiful user interfaces', icon: PenTool },
    { title: 'Backend Solutions', description: 'Scalable and efficient server-side applications', icon: Server },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <service.icon className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;