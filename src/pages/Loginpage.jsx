import React, {useState} from 'react'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function Loginpage() {
    const[username, setusername] = useState('')
    const[password, setpassword] = useState('')
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const navigateto = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handlelogin = async (e) => {
        e.preventDefault();
        const data = {
          username,
          password,
        };
        if (!data.username || !data.password) {
            navigate('/login')
            enqueueSnackbar('All fields are required', { variant: 'info' });
            return;
        }
        try {
          await axios.post('/api/v1/users/login', data);
          enqueueSnackbar('Logged-In successfully', { variant: 'success' });
          navigate('/ai'); // Navigate to the protected page
        } catch (error) {
          enqueueSnackbar('Wrong username or password', { variant: 'error' });
          console.error(error);
        }
      };


  return (
                <div className='flex justify-center items-center h-screen bg-slate-300 rounded-lg bg-gradient-to-r from-green-200 to-green-500'>
                <form className='md:w-1/2  mx-auto my-auto space-y-6 px-6 pb-4 border-2 border-black bg-gray-100 rounded-lg'>
                    <span onClick={navigateto} className='float-right cursor-pointer'><IoMdCloseCircleOutline style={{ color: 'gray', fontSize: '50px' }}/></span>
                    <h3 className='text-xl text-center font-medium text-blue-600'>Login</h3>
    
    
                    <div>
                        <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-700'>
                            Username
                        </label>
                        <input onChange={(e) => setusername(e.target.value)} type='userName' name='userName' value={username} id='userName' className='
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                    '           placeholder='Sourabh'
                        />
                    </div>
    
                    <div>
                        <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-700'>
                            Password
                        </label>
                        <input 
                           onChange={(e) => setpassword(e.target.value)}
                            type='password'
                            name='password'
                            id='password'
                            value={password}
                            className='
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                '
                            placeholder='*******'
                        />
                    </div>
    
                    <button 
                        type='submit'
                        className='w-full text-blue-600 focus:ring-blue-300 font-medium rounded-lg
                        text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
                    '
                    onClick={handlelogin}
                    >Login
                    </button>
                    <button className='flex w-full justify-end'>
                        <a href='#' className=' text-sm block text-brand-orange hover:underline w-full text-center'>
                            Forgot Password?
                        </a>
                    </button>
                </form>
        </div>
  );
}

