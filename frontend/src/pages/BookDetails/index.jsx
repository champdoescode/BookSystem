import React, { useEffect, useState } from 'react';
import EditBookModal from './EditBookModel'; // Adjust import path as needed

const BookDetails = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/books'); // Adjust URL if needed
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/books/${bookId}`, { // Adjust URL if needed
        method: 'DELETE',
      });
      if (response.ok) {
        setBooks(books.filter((book) => book._id !== bookId));
        console.log(`Book with ID: ${bookId} deleted successfully`);
      } else {
        console.error('Error deleting book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleUpdate = (updatedBook) => {
    setBooks(books.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
    setShowModal(false);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      
      <h1>Book Details</h1>
      <table className='w-9/12 border'>
        <thead className='bg-gray-100 border border-black'>
          <tr>
            <th className='border border-black'>Book Name</th>
            <th className='border border-black'>Author</th>
            <th className='border border-black'>Price</th>
            <th className='border border-black'>Number of Copies</th>
            <th className='border border-black'>Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {books.map((book) => (
            <tr key={book._id}>
              <td className='border pl-4'>{book.bookName}</td>
              <td className='border pl-4'>{book.bookAuthor}</td>
              <td className='border pl-2'>{book.bookPrice}</td>
              <td className='border pl-4'>{book.numberOfCopies}</td>
              <td className='border pl-4'>
                <button className='ml-2 my-2 bg-black px-8 py-2 text-white rounded' onClick={() => handleEdit(book)}>Edit</button>
                <button className='ml-4 my-2 bg-white px-8 py-2 border border-black rounded' onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40'>
          <div className='bg-white p-8 rounded-lg w-4/12'>
            <EditBookModal book={selectedBook} onClose={() => setShowModal(false)} onUpdate={handleUpdate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
