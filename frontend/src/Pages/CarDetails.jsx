import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";


const CarDetails = () => {
  const { id } = useParams(); // Get car ID from URL params
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");

  const { authToken } = useAuth(); // Access the authToken from context

  useEffect(() => {
    // Fetch car details by ID
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`https://buyc-attryb-assignment.onrender.com/inventory/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`, // Include JWT token in the request header
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch car details.");
        }
        setCar(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (authToken) {
      fetchCarDetails();
    } else {
      setError("You are not authorized. Please log in.");
    }
  }, [id, authToken]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg border border-blue-200">
  <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
    {car.modelName}
  </h1>
  <img
    src={car.imageUrl || "/api/placeholder/600/400"}
    alt={car.modelName}
    className="w-full h-auto mb-6 rounded-xl border border-gray-300 shadow-md"
  />
  <div className="space-y-4 text-gray-700">
    <p className="flex items-center">
      <strong className="w-40 font-medium text-gray-600">Year:</strong>
      <span>{car.year}</span>
    </p>
    <p className="flex items-center">
      <strong className="w-40 font-medium text-gray-600">Price:</strong>
      <span>${car.price}</span>
    </p>
    <p className="flex items-center">
      <strong className="w-40 font-medium text-gray-600">Mileage:</strong>
      <span>{car.kmOdometer} km</span>
    </p>
    <p className="flex items-center">
      <strong className="w-40 font-medium text-gray-600">Color:</strong>
      <span>{car.color}</span>
    </p>
    <p className="flex items-center">
      <strong className="w-40 font-medium text-gray-600">Original Paint:</strong>
      <span>{car.originalPaint ? "Yes" : "No"}</span>
    </p>
    <p className="flex items-center">
      <strong className="w-40 font-medium text-gray-600">Registration Place:</strong>
      <span>{car.registrationPlace}</span>
    </p>
    <p className="flex items-center">
      <strong className="w-40 font-medium text-gray-600">Number of Accidents:</strong>
      <span>{car.numAccidents || 0}</span>
    </p>
    <p className="flex items-center">
      <strong className="w-40 font-medium text-gray-600">Previous Buyers:</strong>
      <span>{car.numPreviousBuyers || 0}</span>
    </p>
    <p>
      <strong className="block text-gray-600 font-medium mb-1">Description:</strong>
      <span>{car.description || "No description provided."}</span>
    </p>
  </div>
</div>

  );
};

export default CarDetails;
