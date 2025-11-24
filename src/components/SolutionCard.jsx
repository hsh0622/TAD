import React from 'react';

const SolutionCard = ({ title, description, type }) => {
    const typeColors = {
        infrastructure: 'bg-blue-100 text-blue-800 border-blue-200',
        policy: 'bg-green-100 text-green-800 border-green-200',
        service: 'bg-purple-100 text-purple-800 border-purple-200',
        urgent: 'bg-red-100 text-red-800 border-red-200',
    };

    return (
        <div className={`p-4 rounded-lg border ${typeColors[type] || 'bg-gray-100'}`}>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm">{description}</p>
        </div>
    );
};

export default SolutionCard;
