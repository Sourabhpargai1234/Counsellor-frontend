import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Aipage from '../pages/Aipage';
import Registerpage from '../pages/Registerpage';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://finaltest-api.vercel.app/api/v1/users/profile', { withCredentials: true });
        if (response) {
          setIsAuthenticated(true);
          enqueueSnackbar(`${response.data.statusCode}:${response.data.message}`, { variant: 'info' });
        }
      } catch (error) {
        if (error.response && error.response.data) {
          enqueueSnackbar(`${error.response.data.statusCode}: ${error.response.data.message}`, { variant: 'error' });
      } else {
          enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
      }
      console.error(error);
      navigate('/register');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [enqueueSnackbar, navigate]);

  if (loading) {
    return <div className='w-full h-screen flex justify-center items-center'>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? <Aipage /> : <Registerpage />}
    </div>
  );
}
