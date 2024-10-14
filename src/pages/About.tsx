import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-4">
          We are a team of passionate developers and tech enthusiasts dedicated to sharing knowledge and insights about the PERN stack and web development.
        </p>
        <p className="text-lg mb-4">
          Our mission is to create a community where developers can learn, grow, and stay updated with the latest trends in the ever-evolving world of technology.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['John Doe', 'Jane Smith', 'Mike Johnson'].map((name, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-gray-600">Software Developer</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;