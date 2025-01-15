import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import CarsPage from "../Pages/CarsPage";
import PrivetRoute from "../PrivetRouter/PrivetRoute";
import EditPage from "../Pages/EditPage";
import AddCar from "../Pages/AddCar";
import CarDetails from "../Pages/CarDetails";
const AllRoutes = ({ showLogin, toggleForm }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home toggleForm={toggleForm} showLogin={showLogin} />}
      />
      <Route
        path="/all_cars"
        element={
          <PrivetRoute>
            <CarsPage />
          </PrivetRoute>
        }
      />
      <Route
        path="/edit_cars/:id"
        element={
          <PrivetRoute>
            <EditPage/>
          </PrivetRoute>
        }
      />
      <Route
        path="/add_car"
        element={
          <PrivetRoute>
            <AddCar/>
          </PrivetRoute>
        }
      />
      <Route
        path="/car-details/:id"
        element={
          <PrivetRoute>
            <CarDetails/>
          </PrivetRoute>
        }
      />

    </Routes>
  );
};

export default AllRoutes;
