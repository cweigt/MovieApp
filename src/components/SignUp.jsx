import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, getAuth, getIdToken } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const SignUpComponent = ({ setUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //this is for updating user profile
  const setDisplayName = async (user, firstName, lastName) => {
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });
  };

  //the sign up function
  const signUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

      await setDisplayName(userCredentials.user, firstName, lastName);

      await userCredentials.user.reload();
      const updatedUser = auth.currentUser;

      setUser({ ...updatedUser }); //forcing re render

      await set(ref(db, 'users/' + userCredentials.user.uid), {
        email: userCredentials.user.email,
        firstName: firstName,
        lastName: lastName,
        createdAt: new Date().toISOString()
      });

      window.alert("Sign-up successful: " + userCredentials.user.email);
      
      setPassword('');
      setEmail('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      window.alert("Sign-up failed: " + error.message);
    }
  };

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
