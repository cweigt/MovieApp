import React from 'react';

//props from App
const ProfileComponent = ({ isVisible }) => {

  return (
    <div>
       {isVisible && (
         <div className="w-8 h-8 bg-white relative bottom-1 rounded-full flex items-center justify-center"
            style={{ display: isVisible ? "block" : "none"}}
         >

         </div>
       )}
    </div>
  );
};

export default ProfileComponent;