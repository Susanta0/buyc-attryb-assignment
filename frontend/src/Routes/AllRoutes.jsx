import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import CarsPage from "../Pages/CarsPage";
import PrivetRoute from "../PrivetRouter/PrivetRoute";
import EditPage from "../Pages/EditPage";
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

    </Routes>
  );
};

export default AllRoutes;
