import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Home.css'; // SVG фон

const Home: React.FC = () => {
  const navigate = useNavigate();
  const chand = ()=>{
    navigate('/list');
  }
  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 z-[-1] shape" />
      
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white text-center">
        <h1 className="text-5xl font-bold mb-4 ">
          Welcome to Your To-Do Space
        </h1>
        <p className="text-lg text-gray-300 max-w-xl">
          Organize your tasks. Stay focused. Get things done.
        </p>
        <button onClick={chand}className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition shadow-lg cursor-pointer">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
