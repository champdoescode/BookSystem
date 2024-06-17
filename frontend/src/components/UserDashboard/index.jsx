import React, { useState, useEffect } from 'react';

const UserDashboard = ({ onWishlistChange }) => {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showWishlist, setShowWishlist] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('/protected-endpoint', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Handle data here
          console.log('Protected data:', data);
        } else {
          // Handle error here
          console.error('Error fetching protected data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };

    fetchProtectedData();
  }, []); // Empty dependency array means this effect runs once after the component mounts

  const handleViewMore = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const handleAddToWishlist = (book) => {
    setWishlist([...wishlist, book]);
    onWishlistChange(wishlist.length + 1);
  };

  const handleRemoveFromWishlist = (book) => {
    const updatedWishlist = wishlist.filter(item => item._id !== book._id);
    setWishlist(updatedWishlist);
    onWishlistChange(updatedWishlist.length);
  };

  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.bookAuthor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.bookDescription.toLowerCase().includes(searchQuery.toLowerCase())
    // Add more fields as needed for searching
  );

  const booksToShow = showWishlist ? wishlist : filteredBooks;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Book List</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
      <button className="bg-teal-500 text-white py-2 px-4 rounded mb-6" onClick={toggleWishlist}>
        {showWishlist ? 'Show All' : 'Wishlist'} ({wishlist.length})
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {booksToShow.map((book) => (
          <div key={book._id} className="bg-white shadow-md grid-items flex flex-col justify-between border rounded-lg p-4">
            <div className='h-[300px]'>
              <img src={book.bookImage} alt={book.bookName} className="w-full h-[300px] object-contain rounded-md mb-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">{book.bookName}</h2>
              <p className="text-gray-700 mb-2">Author: {book.bookAuthor}</p>
              <p className="text-gray-700 mb-2">Price: {book.bookPrice}</p>
            </div>
            <div>
              {wishlist.some(item => item._id === book._id) ? (
                <button className="bg-red-500 text-white py-2 px-8 rounded-xl mt-4" onClick={() => handleRemoveFromWishlist(book)}>
                  Remove from Wishlist
                </button>
              ) : (
                <button className="bg-teal-500 text-white py-2 px-8 rounded-xl mt-4" onClick={() => handleAddToWishlist(book)}>
                  Add to Wishlist
                </button>
              )}
              <button className="bg-teal-500 text-white py-2 px-8 rounded-xl mt-4 ml-2" onClick={() => handleViewMore(book)}>
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center w-11/12 md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">{selectedBook.bookName}</h2>
            <div className='h-[300px]'>
              <img src={selectedBook.bookImage} alt={selectedBook.bookName} className="w-full h-[300px] object-contain rounded-md mb-4" />
            </div>
            <p className="text-gray-700 mb-2">Author: {selectedBook.bookAuthor}</p>
            <p className="text-gray-700 mb-2">Price: {selectedBook.bookPrice}</p>
            <p className="text-gray-700 mb-2">Copies Available: {selectedBook.numberOfCopies}</p>
            <p className="text-gray-700">{selectedBook.bookDescription}</p>
            <button className="bg-teal-500 text-white py-2 px-4 rounded mt-4" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
