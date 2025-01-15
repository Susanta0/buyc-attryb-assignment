import React from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'

const Home = ({ showLogin, toggleForm }) => {
  return (
    <>
     {showLogin ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <SignupForm toggleForm={toggleForm} />
      )}
    </>
  )
}

export default Home