import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const PrivateRoute = () => {

    const navigate = useNavigate()
    
    useEffect(()=> {
      if(!localStorage.getItem('app_token') || !sessionStorage.getItem('app_token')){
            navigate('/login')
          }
    }, [])

  return (
    <div>    
        <Outlet/>
    </div>
  )
}
