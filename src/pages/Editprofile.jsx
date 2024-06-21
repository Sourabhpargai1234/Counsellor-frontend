import React, { useState } from 'react';
import axios from 'axios';

const Editprofile = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
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
      const response = await axios.post('https://finaltest-api.vercel.app/api/v1/users/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(`Profile updated successfully: ${response.data.fullName}`);
    } catch (error) {
      setMessage('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>Edit User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <br />
        <label>
          Avatar:
          <input type="file" name="avatar" onChange={handleFileChange} />
        </label>
        <br />
        <label>
          Cover Image:
          <input type="file" name="coverImage" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Editprofile;
