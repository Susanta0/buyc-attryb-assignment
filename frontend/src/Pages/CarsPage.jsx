import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IsLoading from "../components/IsLoading";
import CarCard from "../components/CarCard";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("User not authenticated.");
        }

        const response = await axios.get("https://buyc-attryb-assignment.onrender.com/inventory", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setInventory(response.data);
        console.log(response.data);
         
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError(err.response?.data?.message || "Failed to fetch inventory.");
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <IsLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
        <button
          onClick={() => navigate("/l")}
          className="block mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dealer Inventory</h1>
      {inventory.length === 0 ? (
        <p className="text-gray-600">No inventory found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {inventory.map((item) => (
            <CarCard key={item._id} {...item} /> 
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
