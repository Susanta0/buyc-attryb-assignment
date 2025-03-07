

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IsLoading from "./IsLoading";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const notify = () => toast.success("Successfully registered!");
  const errorNotify = () => toast.error("Registration failed. Please try again.");

  const handleChangeSignup = (e) => {
    const { name, value } = e.target;
    setSignup({
      ...signup,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, role, password } = signup;
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://buyc-attryb-assignment.onrender.com/signup",
        { name, email, role, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response.data);
      setIsLoading(false);
      toggleForm(); // Switch to login form
      notify();
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error(error);
      errorNotify();
      setIsLoading(false);
    }
  };

  const { name, email, role, password } = signup;

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="mt-2 text-gray-600">Join us and start your journey</p>
          </div>
          {isLoading ? (
            <IsLoading />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChangeSignup}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChangeSignup}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={role}
                  onChange={handleChangeSignup}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="buyer">Buyer</option>
                  <option value="dealer">Dealer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChangeSignup}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-md transition-all duration-200 mt-6"
              >
                Sign Up
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  I have an account
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupForm;
