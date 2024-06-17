import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import App from './App'
import BookLogin from './components/BookLogin'
import HomePage from './pages/HomePage'
import BookRegistration from './components/BookRegistration'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import AddBook from './components/AddBook'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<App/>}>
            <Route path='' element ={<HomePage/>}/>
            {/* <Route path='/registration' element={<BookRegistration/>} >

                <Route path='/login' elemen={<BookLogin/>} />
            </Route> */}
            <Route path="/login" element={<Outlet />} >
                <Route index element ={<BookLogin/>} />
                <Route path="/login/admin" element={<Outlet />} >
                    <Route index element={<AdminDashboard/>}/>
                    <Route path='/login/admin/addbook' element={<AddBook/>} />
                </Route>
                <Route path="/login/user" element={<UserDashboard />} />
                
            </Route>
            
            <Route path='/registration' element={<Outlet/>} >
                <Route index element={<BookRegistration/>}/>
                {/* <Route path='/registration/login' element={<BookLogin/>} /> */}
                
                
            </Route>
            

        </Route>
    </Routes>
  )
}

export default Router