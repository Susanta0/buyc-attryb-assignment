import { createContext, useState } from "react";

export const AuthContext= createContext()

export const AuthContextProvider=({children})=>{

    const [isLogin, setIsLogin]=useState({
        status:false,
        token:null,
    })

    const loginStatus=(token)=>{
        setIsLogin({
            status:true,
            token:token,
        })
    }

    const logoutStatus=()=>{
        setIsLogin({
            status:false,
            token:null,
        })
    }
    return(
        <AuthContext.Provider value={{loginStatus, logoutStatus, isLogin}}>
            {children}
        </AuthContext.Provider>
    )
}