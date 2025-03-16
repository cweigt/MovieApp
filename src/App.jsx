import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/home';
import Favorites from './pages/favorites';
import Sign_Up from './pages/sign_up';
import Sign_In from './pages/sign_in';


//moved everything that was here to the home.jsx file
//this will be for the router and multiple pages
const App = () => {
  return (
    <Router>
      <main>
        <div className="pattern"/>
        <div className="wrapper">
          <header>
            <nav className="flex justify-between mb-8">
              <div className="flex gap-4">
                <NavLink to="/" className={({ isActive }) => 
                  `text-white hover:text-light-100 ${isActive ? "underline" : ""}`
                }
                >Home</NavLink>

                <NavLink to="/favorites" className={({ isActive }) => 
                  `text-white hover:text-light-100 ${isActive ? "underline" : ""}`
                }
                >Favorites</NavLink>

              </div>
              <div className="flex gap-4">
                <NavLink to="/sign_up" className={({ isActive }) => 
                  `text-white hover:text-light-100 ${isActive ? "underline" : ""}`
                }
                >Register</NavLink>

                <NavLink to="/sign_in" className={({ isActive }) => 
                  `text-white hover:text-light-100 ${isActive ? "underline" : ""}`
                }
                >Login</NavLink>
              </div>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/sign_up" element={<Sign_Up/>} />
            <Route path="/sign_in" element={<Sign_In/>} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App;