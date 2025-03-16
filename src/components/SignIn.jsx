import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInComponent = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  //the sign in function
  const signIn = async () => {
      try {
          const userCredentials = await signInWithEmailAndPassword(auth, email, password);
          setUser(userCredentials.user);
          window.alert("Sign in successful: " + userCredentials.user);
          //this will be for going back go the home page
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
            onClick={signIn}
            className="flex-1 px-6 py-3 text-lg bg-green-600 text-white rounded hover:bg-green-700"
            >Sign In
          </button>
        </div>
    </div>

  );
};

export default SignInComponent;