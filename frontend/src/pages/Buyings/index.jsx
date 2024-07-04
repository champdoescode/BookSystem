import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Buying.css'; // Assuming you will style the grid in a separate CSS file

const Buying = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/purchases');
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="buying-container">
      <h2 className='text-4xl text-center my-8'>Purchased Books</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-8">
        {purchases.map((purchase) => (
          <div className="grid-item border border-black rounded w-fit p-4 hover:shadow-xl" key={purchase._id}>
            <table className='table-auto w-full'>
              <tr>
                <th className='w-28 flex'>Purchased By</th>
                <td>{purchase.userName}</td>
              </tr>
              <tr>
                <th className='content-start flex'>Email:</th>
                <td>{purchase.email}</td>
              </tr>
              <tr>
                <th className='content-start flex'>Address:</th>
                <td>{purchase.address}, {purchase.city}, {purchase.state}, {purchase.pinCode}</td>
              </tr>
              <tr>
                <th className='content-start flex'>Payment:</th>
                <td>{purchase.paymentMode}</td>
              </tr>
              <tr className='border'>
                <th className='content-start flex'>
                  <div>
                    <img src={purchase.bookImage} alt={purchase.bookName} className="h-24" />
                  </div>

                </th>
                <td>
                  <div>
                    <h3>{purchase.bookName}</h3>
                    <p> <span className='font-bold'>Author:</span> {purchase.bookAuthor}</p>
                    <p className='text-2xl'><span className='font-bold'>Price:</span>{purchase.bookPrice}</p>
                    {/* <p>Description: {purchase.bookDescription}</p> */}
                  </div>
                </td>
              </tr>

            </table>
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buying;
