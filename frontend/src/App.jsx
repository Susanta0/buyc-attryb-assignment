import React, { useState } from 'react'
import Navbar from './components/Navbar'
import AllRoutes from './Routes/AllRoutes'

const App = () => {

  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin((prev) => !prev);
  };

  const toggleLogin = () => {
    setShowLogin(true);
  };
  return (
    <>
    <Navbar toggleLogin={toggleLogin}/>
    <AllRoutes showLogin={showLogin} toggleForm={toggleForm}/>
    </>
  )
}

export default App