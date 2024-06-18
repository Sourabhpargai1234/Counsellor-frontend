import React, {useState, useEffect} from 'react'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function Registerpage() {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()
  /*  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('/api/v1/users/profile', { withCredentials: true });
            if (response) {
              navigate('/')
            }
          } catch (error) {
            enqueueSnackbar('Register or Login first', { variant: 'info' });
            navigate('/register');
            console.error('Error fetching user data:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchUserData();
      }, [enqueueSnackbar, navigate]);
      if (loading) {
        return <div className='w-full h-screen flex justify-center items-center'>Loading...</div>;
      }*/


    const[fullName, setfullName] = useState('')
    const[email, setemail] = useState('')
    const[username, setusername] = useState('')
    const[password, setpassword] = useState('')
    const navigateto = (e) => {
        e.preventDefault();
        navigate('/');
    }


    const handleregister = (e) => {
        e.preventDefault();
        const data = {
          fullName,
          email,
          username,
          password
        };
        if (!data.fullName || !data.email || !data.username || !data.password) {
            navigate('/register')
            enqueueSnackbar('All fields are required', { variant: 'info' });
            return ;
        }
        axios
        .post('/api/v1/users/register', data)
        .then(() => {
          e.preventDefault()
          enqueueSnackbar('User registered successfully', { variant: 'success' });
          navigate('/');
        })
        .catch((error) => {
          enqueueSnackbar("User registered with same username or email", { variant: 'error' });
          console.error(error);
        });
      };




  return (
    <div className='flex justify-center items-center h-screen bg-slate-300 rounded-lg bg-gradient-to-r from-green-200 to-green-500'>
            <form className='md:w-1/2  mx-auto my-auto space-y-6 px-6 pb-4 border-2 border-black bg-gray-100 rounded-lg'>
                <span onClick={navigateto} className='float-right cursor-pointer'><IoMdCloseCircleOutline style={{ color: 'gray', fontSize: '50px' }}/></span>
                <h3 className='text-xl text-center font-medium text-blue-600'>Register</h3>
                <div>
                    <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-700'>
                        Name
                    </label>
                    <input onChange={(e) => setfullName(e.target.value)} type='displayName' name='displayName' value={fullName} id='displayName' className='
                border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                '           placeholder='Sourabh'
                    />
                </div>
                <div>
                    <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-700'>
                        Email
                    </label>
                    <input 
                    onChange={(e) => setemail(e.target.value)} 
                    type='email' name='email' id='email' value={email} className='
                border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                '           placeholder='name@company.com'
                    />
                </div>

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
                onClick={handleregister}
                >REGISTER
                </button>
                <button className='flex w-full justify-end'>
                    <a href='#' className='text-sm block text-brand-orange hover:underline w-full text-right'>
                        Forgot Password?
                    </a>
                </button>
                <div className='text-sm font-medium text-gray-700'>
                    Already have an account?{" "}
                    <a href='/login' className='text-blue-700 hover:underline'>
                        Log in
                    </a>
                </div>
            </form>
    </div>
  )
}
