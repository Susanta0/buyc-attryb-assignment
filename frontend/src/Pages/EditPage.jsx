import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContextProvider";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, authToken } = useAuth();
  const [car, setCar] = useState({
    modelName: "",
    year: "",
    price: "",
    kmOdometer: "",
    majorScratches: false,
    originalPaint: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch car details by ID
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/inventory/${id}`, {
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
      await axios.put(`http://localhost:8080/inventory/${id}`, car, {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Model Name</label>
          <input
            type="text"
            name="modelName"
            value={car.modelName}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={car.year}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={car.price}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Kilometer Odometer</label>
          <input
            type="number"
            name="kmOdometer"
            value={car.kmOdometer}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Major Scratches</label>
          <input
            type="checkbox"
            name="majorScratches"
            checked={car.majorScratches}
            onChange={handleCheckboxChange}
            className="ml-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Original Paint</label>
          <input
            type="checkbox"
            name="originalPaint"
            checked={car.originalPaint}
            onChange={handleCheckboxChange}
            className="ml-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPage;
