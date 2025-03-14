import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  //the sign up function
  //async because it's "failed to set up" or "set up sucessful"
  //Rule #1: do a try catch block for errors
  const signUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      //updating user with the new user
      //uid, email, password
      setUser(userCredentials.user); //setting into Firebase
      window.alert("Sign-up successful: ", userCredentials.user);
    } catch(error) {
      window.alert("Sign-up failed: ", error.message);
    }
  }

  //the sign in function
  const signIn = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredentials.user);
      window.alert("Sign in successful: ", userCredentials.user);
    } catch(error) {
      window.alert("Sign in failed: ", error.message);
    }
  }
    
  return (
    <div>
      <input 
        type="email"
        placeholder="Enter email here..."
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default AuthComponent;