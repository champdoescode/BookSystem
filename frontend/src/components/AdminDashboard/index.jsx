import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // Implement edit functionality
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Full Name</th>
            <th className="py-2">Mobile Number</th>
            <th className="py-2">Username</th>
            <th className="py-2">Login Time</th>
            <th className="py-2">Logout Time</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.fullName}</td>
              <td className="border px-4 py-2">{user.mobileNumber}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">
                {user.loginTime ? new Date(user.loginTime).toLocaleString() : 'N/A'}
              </td>
              <td className="border px-4 py-2">
                {user.logoutTime ? new Date(user.logoutTime).toLocaleString() : 'N/A'}
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(user._id)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
