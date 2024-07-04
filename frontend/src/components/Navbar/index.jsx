import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AuthContext from '../../AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Use authentication context

  return (
    <>
      <div>
        <nav className='bg-black w-full text-white flex justify-between px-16 py-4'>
          <NavLink to='' className='italic text-2xl'>BookVerse</NavLink>
          <div className='flex'>
            {!user ? (
              <>
                <NavLink to='/login' className='hover:underline mr-8'>Login</NavLink>
                <NavLink to='/registration' className='hover:underline mr-8'>SignUp</NavLink>
              </>
            ) : (
              <>
                {user.userType === 'admin' && (
                  <div>
                    <NavLink to='/login/admin/addbook' className='hover:underline mr-8'>ADD BOOK</NavLink>
                    <NavLink to='/login/admin/bookdetails' className='hover:underline mr-8'>Book Info</NavLink>
                    <NavLink to='/login/admin/buyings' className='hover:underline mr-8'>Buyings</NavLink>
                  </div>
                  
                )}
                <NavLink to='/' onClick={logout} className='hover:underline'>Logout</NavLink>
              </>
            )}
            <NavLink to='/about' className='hover:underline ml-8'>AboutUs</NavLink>
          </div>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
