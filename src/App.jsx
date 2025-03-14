import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Favorites from './pages/favorites';
import SignUp from './pages/sign_up';
import Login from './pages/sign_in';

//bruh I gotta move these to new pages
import AuthComponent from './components/AuthComponent';
import DatabaseComponent from './components/DatabaseComponent';

//moved everything that was here to the home.jsx file
//this will be for the router and multiple pages
const App = () => {
  return (
    <Router>
      <main>
        <div className="pattern"/>
        <div className="wrapper">
          <header>
            <nav className="flex gap-4 mb-8">
              <Link to="/" className="text-white hover:text-light-100">Home</Link>
              <Link to="/favorites" className="text-white hover:text-light-100">Favorites</Link>
              <Link to="/sign_up" className="text-white hover:text-light-100">Sign Up</Link>
              <Link to="/sign_in" className="text-white hover:text-light-100">Login</Link>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/sign_up" element={<SignUp/>} />
            <Route path="/sign_in" element={<Login/>} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App;