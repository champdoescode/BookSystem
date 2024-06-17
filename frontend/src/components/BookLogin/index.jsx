import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../AuthContext'; // Import the AuthContext

const BookLogin = () => {
    
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [popup, setPopup] = useState({ isVisible: false, message: '', isSuccess: false });
    const navigate = useNavigate();
    const login = async (username, password) => {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
      
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          // Update user state in context
        } else {
          // Handle login error
        }
      };

    const validate = {
        userName: (value) => value ? '' : 'Username is required.',
        password: (value) => value ? '' : 'Password is required.'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validate[name](value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fieldsToValidate = ['userName', 'password'];
        const newErrors = fieldsToValidate.reduce((acc, key) => {
            const error = validate[key](formData[key]);
            if (error) acc[key] = error;
            return acc;
        }, {});

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5000/login', {
                    username: formData.userName,
                    password: formData.password
                });
                if (response.data.userType) {
                    login({ username: formData.userName, userType: response.data.userType });
                    if (response.data.userType === 'admin') {
                        navigate('admin');
                    } else {
                        navigate('user');
                    }
                } else {
                    setPopup({ isVisible: true, message: 'Invalid username or password', isSuccess: false });
                }
            } catch (error) {
                setPopup({ isVisible: true, message: 'Invalid username or password', isSuccess: false });
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center w-8/12 py-16'>
            <div className='bg-white py-2 px-8 opacity-80 rounded-lg w-full text-center'>Login to your Account</div>
            <form className='bg-white opacity-80 w-full rounded-lg px-8 flex flex-col' onSubmit={handleSubmit}>
                <div className='mt-6 flex flex-col'>
                    <label className='text-neutral-500 text-sm' htmlFor="userName">Username</label>
                    <input
                        className='border-b pt-[1px] pb-[12px] border-neutral-300 outline-none'
                        type="text"
                        name="userName"
                        id="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                    {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                </div>
                <div className='mt-6 flex flex-col'>
                    <label className='text-neutral-500 text-sm' htmlFor="password">Password</label>
                    <input
                        className='border-b pt-[1px] pb-[12px] border-neutral-300 outline-none'
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <button className='bg-teal-500 text-white py-2 rounded-xl my-4' type="submit">Login</button>
            </form>
            {popup.isVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg text-center">
                        <h2 className="text-xl mb-4">{popup.message}</h2>
                        <button className="bg-teal-500 text-white py-2 px-4 rounded" onClick={() => setPopup({ isVisible: false, message: '', isSuccess: false })}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookLogin;
