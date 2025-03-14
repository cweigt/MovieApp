import React from 'react';
import { Link } from 'react-router-dom';
import AuthComponent from '../components/AuthComponent';

const Account = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-full">

      <h1 className="text-white text-5xl font-bold mb-12">Welcome to the account page!</h1>
      
      <div className="mt-4 w-full max-w-xl">
        <AuthComponent />
      </div>
    </div>
  );
};

export default Account;