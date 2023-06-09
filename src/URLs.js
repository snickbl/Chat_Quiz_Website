import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './Pages/Main'
import Login from './Pages/Login'
import { PrivateRoute } from './PrivateRoute/PrivateRoute'
// import PrivateRoute from './PrivateRoute/PrivateRoute'

export const URLs = () => {
  return (
    <>
        <Routes>
            <Route path='/login' element={<Login/>}/>

            <Route path='/' element={<PrivateRoute/>}>
              <Route path='/' element={<Main/>}/>
            </Route>
            
        </Routes>
    </>
  )
}
