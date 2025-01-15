import axios from "axios";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import IsLoading from "./IsLoading";
import { useAuth } from "../context/AuthContextProvider";


const LoginForm = ({ toggleForm }) => {
  const navigate = useNavigate();
  const notify = () => toast("Login succsesfully");

  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    try {
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: `https://buyc-attryb-assignment.onrender.com/login`,
        headers: { "Content-Type": "application/json" },
        data: {
          email: email,
          password: password,
        },
      });

      console.log(response.data.token);
      localStorage.setItem("authToken", response.data.token);  // Persist token
      login(response.data.token);
      notify();

      setTimeout(() => {
        setIsLoading(false);
        navigate("/all_cars");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const { email, password } = loginData;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
            {/* <button 
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button> */}
          </div>

          {isLoading ? (
            <>
              <IsLoading />
            </>
          ) : (
            <>
              <form onSubmit={handleClick} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChangeLogin}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChangeLogin}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-200"
                >
                  Login
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <button
                    onClick={toggleForm}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Create a new account
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
