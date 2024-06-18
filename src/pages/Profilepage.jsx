import axios from 'axios';
import React, {useState, useEffect} from "react";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const { enqueueSnackbar } = useSnackbar()
  
  const navigate = useNavigate()
  const navigateto = (e) => {
      e.preventDefault();
      navigate('/');
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/v1/users/profile', { withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        enqueueSnackbar('User not registered or logged in', { variant: 'info' });
        navigate('/register')
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-slate-300 min-h-screen flex items-center justify-center flex-col bg-gradient-to-r from-green-200 to-green-500">
      <span onClick={navigateto} className='float-right cursor-pointer'><IoMdHome style={{ color: 'gray', fontSize: '50px' }}/></span>
      {userData ? (
        <div className="max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Background Picture */}
          <img src={userData.coverImage} alt="No coverImage added" className=" text-center w-full h-64 object-cover object-center" />
          
          <div className="flex items-center p-6">
            {/* Profile Picture */}
            <img
              src={userData.avatar}
              alt="No Image added"
              className="text-center w-32 h-32 rounded-full object-cover border-4 border-white -mt-16"
            />

            <div className="ml-6">
              {/* Username */}
              <h2 className="text-3xl font-bold mb-2">{userData.username}</h2>
              {/* Email */}
              <p className="text-gray-700 mb-4">{userData.email}</p>
              {/* Bio */}
              <p className="text-gray-700">{userData.fullName}</p>
              {/* Display other user details as needed */}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 text-lg">Loading...</p>
      )}
    </div>
  );
}
