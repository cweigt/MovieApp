import React from 'react';
import SignInComponent from '../components/SignIn';

const Sign_In = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-full">

      <div>
        <h2 className="text-white text-5xl font-bold mb-12">Sign In Here</h2>
      </div>
      
      <div className="mt-4 w-full max-w-xl">
        <SignInComponent />
      </div>
    </div>
  );
};

export default Sign_In;