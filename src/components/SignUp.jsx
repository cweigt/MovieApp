import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  //this determines whether or not it is ready to go to a new page
  const [shouldRedirect, setShouldRedirect] = useState(false); 

  //running this everytime shouldRedirect changes
  useEffect(() => {
    if(shouldRedirect) {
      navigate('../pages/sign_in');
    }
  }, [shouldRedirect, navigate]);

  //the sign up function
  //async because it's "failed to set up" or "set up sucessful"
  //Rule #1: do a try catch block for errors
  const signUp = async () => {
    try {
      //apparently this only takes email and password, not first or last name
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      //updating user with the new user
      //putting the user into the Realtime Database
      await set(ref(db, 'users/' + userCredentials.user.uid), {
        email: userCredentials.user.email,
        firstName: firstName,
        lastName: lastName,
        createdAt: new Date().toISOString()
      });
      //uid, email, password
      setUser(userCredentials.user); //setting into Authenticator
      window.alert("Sign-up successful: " + userCredentials.user.email);
      setShouldRedirect(true); //triggers the useEffect()
    } catch(error) {
      window.alert("Sign-up failed: " + error.message);
    }
  }
    
  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto w-full p-8">
      <input 
        type="name"
        placeholder="Enter first name here..."
        onChange={(e) => setFirstName(e.target.value)}
        className="p-4 text-lg rounded bg-gray-800 text-white border border-gray-700"
      />
      <input 
        type="name"
        placeholder="Enter last name here..."
        onChange={(e) => setLastName(e.target.value)}
        className="p-4 text-lg rounded bg-gray-800 text-white border border-gray-700"
      />
      <input 
        type="email"
        placeholder="Enter email here..."
        onChange={(e) => setEmail(e.target.value)}
        className="p-4 text-lg rounded bg-gray-800 text-white border border-gray-700"
      />
      <input 
        type="password"
        placeholder="Please type password..."
        onChange={(e) => setPassword(e.target.value)}
        className="p-4 text-lg rounded bg-gray-800 text-white border border-gray-700"
      />
      <div className="flex gap-4">
        <button 
          onClick={signUp}
          className="flex-1 px-6 py-3 text-lg bg-blue-600 text-white rounded hover:bg-blue-700"
        >Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpComponent;