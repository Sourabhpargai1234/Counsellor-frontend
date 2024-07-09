import axios from 'axios';
import React, {useState, useEffect} from "react";
import { IoMdHome } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { RiLogoutBoxLine } from "react-icons/ri";


export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const { enqueueSnackbar } = useSnackbar()
  
  const navigate = useNavigate()
  const navigateto = (e) => {
      e.preventDefault();
      navigate('/');
  }

  const toggle = (e) => {
    e.preventDefault();
    navigate('/edit');
  }

  const logout = async () => {
    try {
      const logout = await axios.post('https://finaltest-api.vercel.app/api/v1/users/logout', {}, {
        withCredentials: true
      });
      console.log("Logged out");
      enqueueSnackbar(`${logout.data.statusCode} : ${logout.data.message}`, { variant: 'info' });
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error.response ? error.response.data : error.message);
      enqueueSnackbar("Some internal error occurred", { variant: 'error' });
    }
  }
  
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://finaltest-api.vercel.app/api/v1/users/profile', {
          withCredentials: true
        });

        console.log('User data fetched successfully:', response.data);
        setUserData(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);
        enqueueSnackbar('User not registered or logged in', { variant: 'info' });
        navigate('/register');
      }
    };

    fetchUserData();
  }, [enqueueSnackbar, navigate]);


  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center flex-col bg-gradient-to-r from-green-200 to-green-500">
      <div className='flex justify-between'>
        <span onClick={navigateto} className='float-right cursor-pointer'>
          <IoMdHome style={{ color: 'gray', fontSize: '50px' }} />
        </span>
        <span onClick={toggle} className='float-right cursor-pointer'>
          <FaUserEdit style={{ color: 'gray', fontSize: '50px' }}/>
        </span>
        <span onClick={logout} className='float-right cursor-pointer'>
        <RiLogoutBoxLine style={{ color: 'gray', fontSize: '50px' }}/>
        </span>
      </div>
      {userData ? (
        <div className="max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Background Picture */}
          <img src={userData.data.coverImage} alt="No coverImage added" className="text-center w-full h-64 object-cover object-center" />

          <div className="flex items-center p-6">
            {/* Profile Picture */}
            <img
              src={userData.data.avatar}
              alt="No Image added"
              className="text-center w-32 h-32 rounded-full object-cover border-4 border-white -mt-16"
            />

            <div className="ml-6">
              {/* Username */}
              <h2 className="text-3xl font-bold mb-2">{userData.data.username}</h2>
              {/* Email */}
              <p className="text-gray-700 mb-4">{userData.data.email}</p>
              {/* Bio */}
              <p className="text-gray-700">{userData.data.fullName}</p>
              {/* Display other user details as needed */}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 justify-center items-center font-bold text-4xl">Loading...</p>
      )}
    </div>
  );
}
