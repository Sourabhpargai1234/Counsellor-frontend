import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Feedbackpage from './pages/Feedbackpage';
import Profilepage from './pages/Profilepage';
import Contactpage from './pages/Contactpage';
import Registerpage from './pages/Registerpage';
import Loginpage from './pages/Loginpage';
import ProtectedRoute from './utils/ProtectedRoute';


const App = () => {

  return (
    <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/ai' element={<ProtectedRoute />} />
        <Route path='/feedback' element={<Feedbackpage />} />
        <Route path='/contact' element={<Contactpage />} />
        <Route path='/profile' element={<Profilepage />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='/login' element={<Loginpage />} /> 
    </Routes>
  );
};

export default App;
