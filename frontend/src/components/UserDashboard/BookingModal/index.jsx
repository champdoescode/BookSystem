import React, { useContext, useState } from 'react';
import AuthContext from '../../../AuthContext';

const BookingModal = ({ showModal, closeModal, selectedBook}) => {
    const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userName: user.username,
    email: '',
    address: '',
    pinCode: '',
    city: '',
    state: '',
    paymentMode: ''
  });

  if (!showModal) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookId: selectedBook._id,
          userName: user.username,
          ...formData
        })
      });

      if (response.ok) {
        alert('Book purchased successfully');
        closeModal();
      } else {
        alert('Error purchasing book');
      }
    } catch (error) {
      console.error('Error purchasing book:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Booking Form</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Book Name: {selectedBook.bookName}</label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-left">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
              readOnly
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
            />
          </div>
          <div>
            <label>Pin Code:</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
            />
          </div>
          <div>
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
            />
          </div>
          <div>
            <label>Payment Mode:</label>
            <input
              type="text"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4"
            />
          </div>
          <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded">Submit</button>
          <button type="button" onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded ml-2">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
// BookingModal.js
// import React, { useState } from 'react';

// const BookingModal = ({ user, closeModal }) => {
//   const [bookingDetails, setBookingDetails] = useState({
//     userName: user.username,
//     email: '',
//     address: '',
//     pinCode: '',
//     city: '',
//     state: '',
//     paymentMode: 'Online'  // Default to Online payment
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBookingDetails(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (bookingDetails.paymentMode === 'Cash on Delivery') {
//       // Handle submission logic here (only if payment mode is Cash on Delivery)
//       console.log('Submitted:', bookingDetails);
//       // Example: call a function to handle booking submission
//       // handleBookingSubmission(bookingDetails);
//       // Close modal after submission
//       closeModal();
//     } else {
//       alert('Please select Cash on Delivery as payment mode to proceed.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-lg text-center w-11/12 md:w-2/3 lg:w-1/2">
//         <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-left">User Name</label>
//             <input
//               type="text"
//               name="userName"
//               value={bookingDetails.userName}
//               className="px-4 py-2 border border-gray-300 rounded-md w-full"
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-left">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={bookingDetails.email}
//               onChange={handleChange}
//               className="px-4 py-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-left">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={bookingDetails.address}
//               onChange={handleChange}
//               className="px-4 py-2 border border-gray-300 rounded-md w-full"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="mb-4">
//               <label className="block text-gray-700 text-left">Pin Code</label>
//               <input
//                 type="text"
//                 name="pinCode"
//                 value={bookingDetails.pinCode}
//                 onChange={handleChange}
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-left">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={bookingDetails.city}
//                 onChange={handleChange}
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-left">State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={bookingDetails.state}
//                 onChange={handleChange}
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-left">Payment Mode</label>
//               <select
//                 name="paymentMode"
//                 value={bookingDetails.paymentMode}
//                 onChange={handleChange}
//                 className="px-4 py-2 border border-gray-300 rounded-md w-full"
//                 required
//               >
//                 <option value="Online">Online</option>
//                 <option value="Cash on Delivery">Cash on Delivery</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded mt-4">Submit</button>
//             <button type="button" className="bg-gray-400 text-white ml-4 py-2 px-4 rounded mt-4" onClick={closeModal}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;

