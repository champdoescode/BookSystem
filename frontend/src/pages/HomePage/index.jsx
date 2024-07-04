import React, { useState, useEffect } from 'react';
import HomeFlexSlider from '../../components/HomeFlexSlider';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
    <div className="">
      <HomeFlexSlider/>
      <div className='font-bold text-2xl text-center my-6'>Books</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-8 py-16">
        {books.map((book) => (
          <div key={book._id} className="bg-white shadow-md grid-items flex flex-col justify-between border rounded-lg p-4">
            <div className='h-[300px]'>
                  <img src={book.bookImage} alt={book.bookName} className="w-full h-[300px] object-contain rounded-md mb-4" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">{book.bookName}</h2>
                  <p className="text-gray-700 mb-2">Author: {book.bookAuthor}</p>
                  <p className="text-gray-700 mb-2">Price: {book.bookPrice}</p>
                  <p className="text-gray-700 mb-2">Copies Available: {book.numberOfCopies}</p>
                </div>
              <NavLink to='login' className='w-full text-center border border-black rounded-lg py-2 hover:shadow-xl'>
                BuyNow
              </NavLink>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default HomePage;
