import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import CarsPage from "../Pages/CarsPage";
import PrivetRoute from "../PrivetRouter/PrivetRoute";
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
    </Routes>
  );
};

export default AllRoutes;
