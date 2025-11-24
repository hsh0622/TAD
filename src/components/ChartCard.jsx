import React from 'react';

const ChartCard = ({ title, children, analysis }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <div className="h-80 w-full mb-4">
                {children}
            </div>
            {analysis && (
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                    <p className="text-sm text-blue-800 font-medium">💡 분석</p>
                    <p className="text-sm text-gray-700 mt-1">{analysis}</p>
                </div>
            )}
        </div>
    );
};

export default ChartCard;
