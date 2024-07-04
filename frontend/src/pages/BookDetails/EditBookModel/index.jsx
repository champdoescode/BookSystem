import React, { useState } from 'react';

const EditBookModal = ({ book, onClose, onUpdate }) => {
  const [bookName, setBookName] = useState(book.bookName);
  const [bookAuthor, setBookAuthor] = useState(book.bookAuthor);
  const [bookPrice, setBookPrice] = useState(book.bookPrice);
  const [numberOfCopies, setNumberOfCopies] = useState(book.numberOfCopies);

  const handleUpdate = async () => {
    const updatedBook = {
      ...book,
      bookName,
      bookAuthor,
      bookPrice,
      numberOfCopies,
    };

    try {
      const response = await fetch(`http://localhost:5000/books/${book._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate(data);
        onClose();
      } else {
        console.error('Error updating book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="modal w-full">
      <div className="modal-content">
        <h2 className='text-center text-2xl'>Edit Book</h2>
        <form >
          <div className='flex flex-col mt-4'>
            <label>Book Name : </label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className='pl-4 py-2 border border border-neutral-300 focus:border-black rounded text-neutral-600 outline-none'
            />
          </div>
          <div className='flex flex-col mt-4'>
            <label>Author : </label>
            <input
              type="text"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              className='pl-4 py-2 border border border-neutral-300 focus:border-black rounded text-neutral-600 outline-none'
            />
          </div>
          <div className='flex flex-col mt-4'>
            <label>Price</label>
            <input
              type="text"
              value={bookPrice}
              onChange={(e) => setBookPrice(e.target.value)}
              className='pl-4 py-2 border border border-neutral-300 focus:border-black rounded text-neutral-600 outline-none'
            />
          </div>
          <div className='flex flex-col mt-4'>
            <label>Number of Copies</label>
            <input
              type="text"
              value={numberOfCopies}
              onChange={(e) => setNumberOfCopies(e.target.value)}
              className='pl-4 py-2 border border border-neutral-300 focus:border-black rounded text-neutral-600 outline-none'
            />
          </div>
          <div className='flex justify-evenly mt-6'>
            <button className='bg-black px-8 py-2 text-white rounded' type="button" onClick={handleUpdate}>Update</button>
            <button className='bg-white px-8 py-2 border border-black rounded' type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
