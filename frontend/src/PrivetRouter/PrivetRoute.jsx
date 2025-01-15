import React, { useContext } from 'react'

import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'

const PrivetRoute = ({children}) => {
    const {isLogin:{status}}=useContext(AuthContext)

    if(!status){
        return <Navigate to="/"/>
    }
    return children
  
}

export default PrivetRoute