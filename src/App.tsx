import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import AboutUs from './pages/table';
import Settings from './pages/settting';
import Login from './pages/login';
import './App.css'; 

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const open = document.querySelector('.open');
    if (!open) return;

    const handleMouseOver = () => setIsOpen(true);
    const handleMouseOut = () => setIsOpen(false);

    open.addEventListener('mouseover', handleMouseOver);
    open.addEventListener('mouseout', handleMouseOut);

    return () => {
      open.removeEventListener('mouseover', handleMouseOver);
      open.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <Router>
      <div className="flex h-screen m-0 fixed transition duration-300 ease-in-out ">
        <nav className=" bl w-15 h-screen  hover:w-25 hover:items-start bg-[#1F1C2C] text-[#C3BDD4] flex flex-col items-center pt-[2dvh] open">
          <NavLink to="/log"end className={({ isActive }) =>`nav-link w-10 h-10 flex items-center rounded-3xl bg-[#928DAB] ${isActive ? 'bg-[#6D6484]' : ''}`}>
            <span className={`${isOpen ? 'block' : 'hidden'} text-lg mt-1 ms-11 text-[#C3BDD4] font-black hover:rounded-lg`}>You</span>
          </NavLink>

          <NavLink to="/" end className={({ isActive }) => `nav-link flex mt-7 h-10 hover:w-25 hover:h-10 hover:rounded-lg hover:bg-[#928DAB] hover:text-[#1F1C2C] ${ isActive ? 'bg-[#C3BDD4] text-[#1F1C2C] rounded-lg  ' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-10 h-9 bi bi-house"viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
            <span className={`${isOpen ? 'block' : 'hidden'} text-lg mt-1.5 font-black hover:rounded-lg`}>Home</span>
          </NavLink>

          <NavLink to="/list" end className={({ isActive }) =>`nav-link mt-5 h-10 flex hover:w-25 hover:h-10 hover:rounded-lg hover:bg-[#928DAB] hover:text-[#1F1C2C] ${isActive ? 'bg-[#C3BDD4] text-[#1F1C2C] rounded-lg ' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg"fill="currentColor"className="w-10 h-9 bi bi-body-text"viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" /></svg>
            <span className={`${isOpen ? 'block' : 'hidden'} text-lg mt-1 font-black hover:rounded-lg`}>List</span>
          </NavLink>

          <NavLink to="/contact" end className={({ isActive }) => `nav-link flex mt-5 h-10 hover:w-25 hover:h-10 hover:rounded-lg hover:bg-[#928DAB] hover:text-[#1F1C2C] ${ isActive ? 'bg-[#C3BDD4] text-[#1F1C2C] rounded-lg ' : '' }` } >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-10 h-9 bi bi-person-lines-fill" viewBox="0 0 16 16" >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" /></svg>
            <span className={`${isOpen ? 'block' : 'hidden'} text-lg mt-1 font-black hover:rounded-lg`}>About</span>
          </NavLink>

          <NavLink to="/setting" end className={({ isActive }) => `nav-link flex h-10 mt-[55dvh] hover:w-25 hover:h-10 hover:rounded-lg hover:bg-[#928DAB] hover:text-[#1F1C2C] ${ isActive ? 'bg-[#C3BDD4] text-[#1F1C2C] rounded-lg ' : '' }` } >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-10 h-9 bi bi-gear-wide-connected" viewBox="0 0 16 16" >
              <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z" />
            </svg>
            <span className={`${isOpen ? 'block' : 'hidden'} text-md mt-1.5 font-black hover:rounded-lg`}>Setting</span>
          </NavLink>
        </nav>

        <main className="flex-1 ">
          <Routes>
            <Route path="/log" element={<Login/>} />
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List/>} />
            <Route path="/contact" element={<AboutUs/>} />
            <Route path="/setting" element={<Settings/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
