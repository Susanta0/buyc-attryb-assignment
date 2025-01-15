import React from 'react';

const CarCard = () => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Car Image */}
      <img 
        src="/api/placeholder/400/250" 
        alt="Car" 
        className="w-full h-48 object-cover rounded-t-lg"
      />
      
      {/* Car Details */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Tesla Model 3</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Year:</span>
            <span className="font-medium">2023</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium text-green-600">$45,000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Mileage:</span>
            <span className="font-medium">15,000 km</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Fuel Type:</span>
            <span className="font-medium">Electric</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {/* Details Button */}
          <button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Details
          </button>
          
          {/* Edit Button */}
          <button 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Edit
          </button>
          
          {/* Delete Button */}
          <button 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;