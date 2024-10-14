import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQs: React.FC = () => {
  const faqs = [
    { question: 'What is the PERN stack?', answer: 'PERN stands for PostgreSQL, Express, React, and Node.js. It\'s a popular full-stack web development framework.' },
    { question: 'Do you offer custom web development services?', answer: 'Yes, we specialize in creating custom web applications tailored to our clients\' specific needs.' },
    { question: 'How can I get started with the PERN stack?', answer: 'We recommend starting with our blog posts that cover the basics of each technology in the stack.' },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              {openIndex === index ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-gray-50">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;