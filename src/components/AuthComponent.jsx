import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  //this determines whether or not it is ready to go to a new page
  const [success, setSuccess] = useState(false); 

  //this is just so I can see the update every time success state changes
  useEffect(() => {
    console.log(success);
  }, [success]);
  //the sign up function
  //async because it's "failed to set up" or "set up sucessful"
  //Rule #1: do a try catch block for errors
  const signUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      //updating user with the new user
      //putting the user into the Realtime Database
      await set(ref(db, 'users/' + userCredentials.user.uid), {
        email: userCredentials.user.email,
        createdAt: new Date().toISOString()
      });
      //uid, email, password
      setUser(userCredentials.user); //setting into Firebase
      window.alert("Sign-up successful: " + userCredentials.user.email);
    } catch(error) {
      window.alert("Sign-up failed: " + error.message);
    }
  }

  //the sign in function
  const signIn = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredentials.user);
      window.alert("Sign in successful: " + userCredentials.user);
      setSuccess(true); //letting know when I can go to next page
    } catch(error) {
      window.alert("Sign in failed: " + error.message);
    }
  }
    
  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto w-full p-8">
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
        <button 
          onClick={signIn}
          className="flex-1 px-6 py-3 text-lg bg-green-600 text-white rounded hover:bg-green-700"
        >Sign In
        </button>
      </div>
    </div>
  );
};

export default AuthComponent;