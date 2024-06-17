import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AuthContext from '../../AuthContext';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Use authentication context

  return (
    <>
      <div>
        <nav className='bg-black w-full text-white flex justify-between px-16 py-4'>
          <div>Logo</div>
          <div className='flex'>
            {!user ? (
              <>
                <NavLink to='login' className='hover:underline mr-8'>Login</NavLink>
                <NavLink to='registration' className='hover:underline mr-8'>SignUp</NavLink>
              </>
            ) : (
              <>
                <NavLink to='login/admin/addbook' className='hover:underline mr-8'>ADD BOOK</NavLink>
                <NavLink to='/' onClick={logout} className='hover:underline'>Logout</NavLink>
              </>
            )}
            <div className='hover:underline ml-8'>AboutUs</div>
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
