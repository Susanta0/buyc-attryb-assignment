import React from "react";
import { useNavigate } from "react-router-dom";

const CarCard = ({_id, imageUrl,modelName, description,year,price, kmOdometer, color, originalPaint,}) => {
  console.log(_id);
  
  const navigate = useNavigate();
  // Ensure descriptions are formatted with periods
  const formatDescriptions = (descriptions) => {
    if (!descriptions || descriptions.length === 0) {
      return ["No description available."];
    }
    return descriptions.map((desc) => (desc.trim().endsWith(".") ? desc : `${desc}.`));
  };

  const formattedDescriptions = formatDescriptions(description);

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Car Image */}
      <img
        src={imageUrl || "/api/placeholder/400/250"}
        alt={modelName || "Car"}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Car Details */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{modelName}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Year:</span>
            <span className="font-medium">{year}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium text-green-600">${price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Mileage:</span>
            <span className="font-medium">{kmOdometer} km</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Color:</span>
            <span className="font-medium">{color}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Original Paint:</span>
            <span className="font-medium">{originalPaint ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h4 className="text-gray-800 font-semibold mb-2">Description:</h4>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {formattedDescriptions.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Details
          </button>

          <button
          onClick={() => navigate(`/edit_cars/${_id}`)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Edit
          </button>

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
