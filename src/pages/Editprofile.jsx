import React, { useState } from 'react';
import axios from 'axios';

const Editprofile = () => {
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (event.target.name === 'avatar') {
      setAvatar(file);
    } else if (event.target.name === 'coverImage') {
      setCoverImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const response = await axios.patch('https://finaltest-api.vercel.app/api/v1/users/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      setMessage(`Profile updated successfully: ${response.data.fullName}`);
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      setMessage(`Failed to update profile: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block font-semibold">Full Name:</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block font-semibold">Avatar:</label>
            <input
              id="avatar"
              type="file"
              name="avatar"
              onChange={handleFileChange}
              className="block mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="coverImage" className="block font-semibold">Cover Image:</label>
            <input
              id="coverImage"
              type="file"
              name="coverImage"
              onChange={handleFileChange}
              className="block mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
  );
};

export default Editprofile;
