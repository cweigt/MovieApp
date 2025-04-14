import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/home';
import Favorites from './pages/favorites';
import Sign_Up from './pages/sign_up';
import Sign_In from './pages/sign_in';
import ProfileComponent from './components/Profile';

const App = () => {
  const [authUser, setAuthUser] = useState(null); // passing this in as a prop down below

  // This runs once when component is mounted… checking to see if a user is logged in
  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      console.log('Auth User in listener:', authUser); // Log the authUser value
      if (authUser) {
        authUser.reload();
        const refreshedUser = auth.currentUser;
        setAuthUser(refreshedUser); // Set the authenticated user
      } else {
        setAuthUser(null); // Clear user on sign-out
      }
    });

    return () => listener(); // Clean up subscription on unmount
  }, []); // Runs once on mount, then cleans up when the component unmounts

  // Log the current authUser on every render()
  useEffect(() => {
    console.log('Updated authUser:', authUser); // Logs whenever authUser changes
  }, [authUser]); // Dependency array ensures this runs when authUser updates

  return (
    <Router>
      <main>
        <div className="pattern" />
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
                {/* conditional rendering for Login and Sign Out */}
                {authUser ? (
                  <button
                    onClick={() => {
                      auth.signOut(); // Firebase sign out
                      setAuthUser(null); // Reset the user state
                    }}
                    className="text-white hover:text-light-100"
                  >Sign Out
                  </button>
                ) : (
                  <>
                    <NavLink to="/sign_up" className={({ isActive }) =>
                      `text-white hover:text-light-100 ${isActive ? "underline" : ""}`
                    }
                    >Register</NavLink>
                    {/* The Login link only shows when not logged in */}
                    <NavLink to="/sign_in" className={({ isActive }) =>
                      `text-white hover:text-light-100 ${isActive ? "underline" : ""}`
                    }
                    >Login</NavLink>
                  </>
                )}

                {/* Profile component only shows if user is logged in */}
                {authUser === null ? (
                  <p className="transparent">Loading</p> // Optional: Display loading state when authUser is null
                ) : (
                  <ProfileComponent user={authUser} />
                )}
              </div>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/sign_up" element={<Sign_Up setUser={setAuthUser} />} />
            <Route path="/sign_in" element={<Sign_In />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
