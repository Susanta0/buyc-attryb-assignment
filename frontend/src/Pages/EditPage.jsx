import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContextProvider";
import IsLoading from "../components/IsLoading";


const EditPage = () => {
  const { id } = useParams();
  
  
  const navigate = useNavigate();
  const { user, authToken } = useAuth() 
  const [car, setCar] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch car details by ID
    const fetchCar = async () => {
        console.log(id);
        
      try {
        const response = await axios.get(`https://buyc-attryb-assignment.onrender.com/inventory/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        // Check if the car belongs to the logged-in user
        if (response.data.userId !== user.id) {
          setError("You are not authorized to edit this car.");
          return;
        }

        setCar(response.data);
        console.log(response.data);
        
        
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError("Error fetching car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, user, authToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCar({ ...car, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://buyc-attryb-assignment.onrender.com/inventory/${id}`, car, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert("Car details updated successfully.");
      navigate("/all_cars");
    } catch (err) {
      console.error("Error updating car details:", err);
      setError("Error updating car details.");
    }
  };

  if (loading) return <IsLoading/>;
  if (error) return <div>{error}</div>;
  const {modelName}=car
console.log(car.modelName)
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
    <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Edit Car</h2>
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md p-6">
      {/* Model Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Model Name
        </label>
        <input
          type="text"
          name="modelName"
          value={car.modelName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="Enter model name"
        />
      </div>

      {/* Year */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Year
        </label>
        <input
          type="number"
          name="year"
          value={car.year}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="Enter year"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={car.price}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="Enter price"
        />
      </div>

      {/* Kilometer Odometer */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Kilometer Odometer
        </label>
        <input
          type="number"
          name="kmOdometer"
          value={car.kmOdometer}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="Enter kilometers"
        />
      </div>

      {/* Checkboxes Group */}
      <div className="space-y-4 border-t pt-4">
        {/* Major Scratches */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="majorScratches"
            checked={car.majorScratches}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
          />
          <label className="ml-3 text-sm font-medium text-gray-700">
            Major Scratches
          </label>
        </div>

        {/* Original Paint */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="originalPaint"
            checked={car.originalPaint}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
          />
          <label className="ml-3 text-sm font-medium text-gray-700">
            Original Paint
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
  );
};

export default EditPage;
