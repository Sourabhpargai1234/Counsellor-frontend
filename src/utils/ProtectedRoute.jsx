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
        const response = await axios.get('/api/v1/users/profile', { withCredentials: true });
        if (response) {
          setIsAuthenticated(true);
          navigate('/ai')
        }
      } catch (error) {
        enqueueSnackbar('Register or Login first', { variant: 'info' });
        navigate('/register');
        setIsAuthenticated(false);
        console.error('Error fetching user data:', error);
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
