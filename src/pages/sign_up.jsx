import React from 'react';
import SignUpComponent from '../components/SignUp';

const Sign_Up = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-full">

      <div>
        <h2 className="text-white text-5xl font-bold mb-12">Create Account</h2>
      </div>
      
      <div className="mt-4 w-full max-w-xl">
        <SignUpComponent />
      </div>
    </div>
  );
};

export default Sign_Up;