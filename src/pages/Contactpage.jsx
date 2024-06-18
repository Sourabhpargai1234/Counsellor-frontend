import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { IoMdHome } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Contactpage(){
  const [name, setName] =useState('');
  const [email, setEmail] =useState('');
  const [message, setMessage] =useState('');
  const navigate = useNavigate()
  const navigateto = (e) => {
      e.preventDefault();
      navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = "service_boloklr"; //process.env.SERVICE_ID;
    const templateId = "template_3xmhnlj"; //process.env.Template_ID;
    const publicKey = "2oV1AKnP2K1R3ijnB" //process.env.PUBLIC_KEY;

    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: "Sourabhpargai1234@gmail.com",
      message: message,
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then((response) => {
      console.log('SUCCESS!', response);
      setName('');
      setEmail('');
      setMessage('');
    })
    .catch((error) => {
      console.log("Error sending email", error);
    });
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center flex-col min-h-screen bg-gradient-to-r from-green-200 to-green-500">
      <span onClick={navigateto} className='float-right cursor-pointer'><IoMdHome style={{ color: 'gray', fontSize: '50px' }}/></span>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Me</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">Message</label>
            <textarea cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
          </div>
          <button onClick={handleSubmit} className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Send Message</button>
        </form>
      </div>
    </div>
  );
};