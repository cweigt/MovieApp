import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Favorites from './pages/favorites';

//moved everything that was here to the home.jsx file
//this will be for the router and multiple pages
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route> {/*this is the default page*/}
        <Route path="/favorites" element={<Favorites/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;