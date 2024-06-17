import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [formData, setFormData] = useState({
    bookName: '',
    bookAuthor: '',
    bookPrice: '',
    bookImage: '',
    bookDescription: '',
    numberOfCopies: ''
  });
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ isVisible: false, message: '', isSuccess: false });
  const navigate = useNavigate();

  const validate = {
    bookName: (value) => value ? '' : 'Book name is required.',
    bookAuthor: (value) => value ? '' : 'Author name is required.',
    bookPrice: (value) => value ? '' : 'Price is required.',
    bookImage: (value) => value ? '' : 'Image URL is required.',
    bookDescription: (value) => value ? '' : 'Description is required.',
    numberOfCopies: (value) => value ? '' : 'Number of copies is required.'
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
    const fieldsToValidate = Object.keys(validate);
    const newErrors = fieldsToValidate.reduce((acc, key) => {
      const error = validate[key](formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/addbook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setPopup({ isVisible: true, message: 'Book added successfully', isSuccess: true });
          setFormData({
            bookName: '',
            bookAuthor: '',
            bookPrice: '',
            bookImage: '',
            bookDescription: '',
            numberOfCopies: ''
          });
        } else {
          setPopup({ isVisible: true, message: 'Error adding book', isSuccess: false });
        }
      } catch (error) {
        setPopup({ isVisible: true, message: 'Error adding book', isSuccess: false });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-8/12 py-16'>
      <div className='bg-white py-2 px-8 opacity-80 rounded-lg w-full text-center'>
        Add a New Book
      </div>
      <form className='bg-white opacity-80 w-full rounded-lg px-8 flex flex-col' onSubmit={handleSubmit}>
        <div className='mt-6 flex flex-col'>
          <label className='text-neutral-500 text-sm' htmlFor="bookName">Book Name</label>
          <input
            className='border-b pt-[1px] pb-[12px] border-neutral-300 outline-none'
            type="text"
            name="bookName"
            id="bookName"
            value={formData.bookName}
            onChange={handleChange}
            required
          />
          {errors.bookName && <p className="text-red-500 text-sm">{errors.bookName}</p>}
        </div>
        <div className='mt-6 flex flex-col'>
          <label className='text-neutral-500 text-sm' htmlFor="bookAuthor">Author</label>
          <input
            className='border-b pt-[1px] pb-[12px] border-neutral-300 outline-none'
            type="text"
            name="bookAuthor"
            id="bookAuthor"
            value={formData.bookAuthor}
            onChange={handleChange}
            required
          />
          {errors.bookAuthor && <p className="text-red-500 text-sm">{errors.bookAuthor}</p>}
        </div>
        <div className='mt-6 flex flex-col'>
          <label className='text-neutral-500 text-sm' htmlFor="bookPrice">Price</label>
          <input
            className='border-b pt-[1px] pb-[12px] border-neutral-300 outline-none'
            type="text"
            name="bookPrice"
            id="bookPrice"
            value={formData.bookPrice}
            onChange={handleChange}
            required
          />
          {errors.bookPrice && <p className="text-red-500 text-sm">{errors.bookPrice}</p>}
        </div>
        <div className='mt-6 flex flex-col'>
          <label className='text-neutral-500 text-sm' htmlFor="bookImage">Image URL</label>
          <input
            className='border-b pt-[1px] pb-[12px] border-neutral-300 outline-none'
            type="text"
            name="bookImage"
            id="bookImage"
            value={formData.bookImage}
            onChange={handleChange}
            required
          />
          {errors.bookImage && <p className="text-red-500 text-sm">{errors.bookImage}</p>}
        </div>
        <div className='mt-6 flex flex-col'>
          <label className='text-neutral-500 text-sm' htmlFor="bookDescription">Description</label>
          <textarea
            className='border-b pt-[1px] pb-[12px] border-neutral-300 outline-none'
            name="bookDescription"
            id="bookDescription"
            value={formData.bookDescription}
            onChange={handleChange}
            required
          ></textarea>
          {errors.bookDescription && <p className="text-red-500 text-sm">{errors.bookDescription}</p>}
        </div>
        <div className='mt-6 flex flex-col'>
          <label className='text-neutral-500 text-sm' htmlFor="numberOfCopies">Number of Copies</label>
          <input
            className='border-b pt-[1px] pb-[12px] border-neutral-300 outline-none'
            type="text"
            name="numberOfCopies"
            id="numberOfCopies"
            value={formData.numberOfCopies}
            onChange={handleChange}
            required
          />
          {errors.numberOfCopies && <p className="text-red-500 text-sm">{errors.numberOfCopies}</p>}
        </div>
        <button className='bg-teal-500 text-white py-2 rounded-xl my-4' type="submit">Add Book</button>
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
};

export default AddBook;
