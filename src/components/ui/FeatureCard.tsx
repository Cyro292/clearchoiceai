import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode; // You can use an icon or image
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;