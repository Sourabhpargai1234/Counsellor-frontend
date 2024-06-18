import React, { useState } from 'react';
import axios from 'axios';
import { IoMdHome } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Aipage(){
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [question2, setQuestion2] = useState('');3
  const [userAsked, setUserAsked] = useState('Hi there! I have a question about Career.');

  const navigate = useNavigate()
  const navigateto = (e) => {
      e.preventDefault();
      navigate('/');
  }

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleClick =  async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { context, question };

    try {
      console.log('Sending data:', data);
      const response = await axios.post('/api/v1/users/qa', data);
      console.log('Response:', response);
      document.getElementById('answer').innerText = response.data.answer;
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClick2 = async (e) => {
    e.preventDefault();
    setLoading2(true);
    const data = { question2 };

    try {
      console.log('Sending data:', data);
      const response = await axios.post('/api/v1/users/llm', data);
      console.log('Response:', response);
      setUserAsked(question2);
      document.getElementById("userasked").innerText="data";
      document.getElementById('question2').innerText = '';
      document.getElementById('aianswered').innerText = response.data;
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
      }
    } finally {
      setLoading2(false);
    }
  };

  return (

            <div className='flex justify-center items-center h-screen bg-slate-300 flex-col bg-gradient-to-r from-green-200 to-green-500'>
            <span onClick={navigateto} className='float-right cursor-pointer'><IoMdHome style={{ color: 'gray', fontSize: '50px' }}/></span>
            <label htmlFor="toggleSwitch" className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" id="toggleSwitch" className="hidden" checked={isChecked} onChange={handleToggle} />
                    <div className="toggle__line w-10 h-6 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 ${isChecked ? 'transform translate-x-full' : ''}`}></div>
                </div>
            </label>
          <div className="ml-3 text-gray-700 font-medium">Switch between models</div>
          {
            (isChecked===false) &&
            (
              <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md md:w-full">
              <h1 className="text-2xl font-bold mb-4">Question Answering System</h1>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Context:</label>
                <textarea id="context" value={context} onChange={(e) => setContext(e.target.value)} rows="4" className="w-full p-2 border rounded-lg" placeholder="Enter context here..."></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Question:</label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} id="question" className="w-full p-2 border rounded-lg" placeholder="Enter question here..." />
              </div>
              <div className='mb-4 w-full'>
                <button className='hover:border-2 w-full hover:border-green-400 bg-blue-500 text-white p-2 rounded-lg' onClick={handleClick} id='submit'>Ask</button>
              </div>
              <div className="mb-4">
              {loading && <p>Thinking...</p>}
                <label className="block text-gray-700 font-bold mb-2">Answer:</label>
                <div id="answer" className="w-full p-2 border rounded-lg bg-gray-50"></div>
              </div>
            </div>
            )
          }
    
          {
            
            (isChecked===true) &&
            (
              <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md md:w-full overflow-y-auto">
        <div className="flex-grow px-4 py-8 flex flex-col-reverse overflow-y-auto">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-row-reverse items-start">
                    <div className="flex flex-col items-end">
                        <div className="bg-blue-100 text-blue-900 max-w-xs rounded-lg p-3">
                            <p id='aianswered'>Hello! How can I guide you today?</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Bot • 10:00 AM</p>
                    </div>
                </div>
    
                <div className="flex items-start">
                    <div className="flex flex-col items-start">
                        <div className="bg-gray-200 text-gray-800 max-w-xs rounded-lg p-3">
                            <p id='userasked'>{userAsked}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">You • 10:01 AM</p>
                    </div>
                </div>
            </div>
        </div>
    
                <div className="p-4 bg-white shadow-md">
                    <input type="text" id="question2" value={question2} onChange={(e) => setQuestion2(e.target.value)} className="w-full rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your message..." />
                </div>
                <button className='w-full border-2 font-bold border-black hover:bg-green-500' onClick={handleClick2}>Ask</button>
                {loading2 && <p>Thinking...</p>}
            </div>
            )
          }
        </div>

  );
}
