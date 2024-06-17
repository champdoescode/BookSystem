import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// import bcrypt from 'bcryptjs';

const BookRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    userType: 'user' // Default value
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const validate = {
    userName: (value) => /^[a-zA-Z0-9_.-@]{3,16}$/.test(value) ? '' : 'Username must be 3-16 characters and can only contain letters, numbers, and underscores.',
    email: (value) => /^(?!.?\.\.)(?!.?\.(|\.|\.))([a-zA-Z0-9]+[a-zA-Z]*)(?:[.][a-zA-Z0-9]+)?(?:[.]?[a-zA-Z0-9]+)?@[a-zA-Z.]+(?:[a-zA-Z0-9]+)?\.[a-zA-Z]{2,3}$/.test(value) ? '' : 'Email must be in lowercase, include "@" and a valid domain extension.',
    mobileNumber: (value) => /^[6-9]\d{9}$/.test(value) ? '' : 'Contact number must be 10 digits and start with a digit from 6 to 9.',
    password: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/.test(value) ? '' : 'Password must be at least 8 characters long, contain uppercase and lowercase letters, and include special characters.',
    confirmPassword: (value, password) => value === password ? '' : 'Passwords do not match.',
    fullName: (value) => /^[a-zA-Z. ]{6,30}$/.test(value) ? '' : 'Full name must contain alphabets and be between 6 and 30 characters.',
    userType: (value) => value ? '' : 'User type is required.'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobileNumber' && (!/^\d*$/.test(value) || value.length > 10)) {
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    if (validate[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validate[name](value, formData.password)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate[key] ? validate[key](formData[key], formData.password) : '';
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // const hashedPassword = await bcrypt.hash(formData.password, 10); // Hash the password
      const response = await axios.post('http://localhost:5000/register', {
        fullName: formData.fullName,
        username: formData.userName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password, // Send the hashed password to the server
        userType: formData.userType
      });
      setPopupVisible(true); // Show popup on successful registration
    } catch (error) {
      alert('Error registering user');
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    // Optionally reset the form or redirect the user
  };

  return (
    <div className='flex flex-col justify-center items-center w-8/12 py-16'>
      <div className='bg-white py-2 px-8 opacity-90 rounded-lg w-full text-center'>Sign Up to your Account</div>
      <form className='bg-white opacity-90 w-full rounded-lg px-8 flex flex-col' onSubmit={handleSubmit}>
        {['fullName', 'email', 'mobileNumber', 'userName', 'password', 'confirmPassword'].map((field) => (
          <div key={field} className='mt-6 flex flex-col relative'>
            <label className='text-neutral-500 text-sm' htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              className='border-b pt-[1px] pb-[12px] border-neutral-300 outline-none'
              type={(field === 'password' && !passwordVisible) || (field === 'confirmPassword' && !confirmPasswordVisible) ? 'password' : 'text'}
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              required
              maxLength={field === 'mobileNumber' ? 10 : undefined}
            />
            {(field === 'password' || field === 'confirmPassword') && (
              <button
                type='button'
                className='absolute right-2 top-8'
                onClick={() => togglePasswordVisibility(field)}
              >
                {((field === 'password' && passwordVisible) || (field === 'confirmPassword' && confirmPasswordVisible)) ? '👁️' : '👁️‍🗨️'}
              </button>
            )}
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}
        <div className='mt-6 flex flex-col relative'>
          <label className='text-neutral-500 text-sm' htmlFor="userType">User Type</label>
          <select
            className='border-b pt-[1px] pb-[12px] border-neutral-300 outline-none'
            name="userType"
            id="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
        </div>
        <button className='bg-teal-500 text-white py-2 rounded-xl my-4' type="submit">Sign Up</button>
      </form>
      {popupVisible && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-4 rounded'>
            <p>User registered successfully!</p>
            <NavLink to='' className='bg-teal-500 text-white py-2 px-6 rounded-xl mt-4' onClick={handleClosePopup}>OK</NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookRegistration;
