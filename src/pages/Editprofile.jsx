import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const Editprofile = () => {
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('avatar', avatar);
    formData.append('coverImage', coverImage);

    if (!fullName || !avatar || !coverImage) {
      enqueueSnackbar('At least one field is required', { variant: 'info' });
      navigate('/edit');
      return;
    }

    try {
      const response = await axios.patch('https://finaltest-api.vercel.app/api/v1/users/edit', fullName, 
        {withCredentials: true},
      );
      console.log('Server Response:', response.data);
      setMessage(`Profile updated successfully: ${response.data.fullName}`);
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      setMessage(`Failed to update profile: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
            onChange={(e) => setAvatar(e.target.files[0])}
            className="block mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block font-semibold">Cover Image:</label>
          <input
            id="coverImage"
            type="file"
            name="coverImage"
            onChange={(e) => setCoverImage(e.target.files[0])}
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
