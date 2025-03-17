import React from 'react';

const ProfileComponent = ({ user }) => {
  console.log('ProfileComponent user:', user);

  // Function to get the initials from first and last name
  const getInitials = () => {
    if (!user || !user.displayName) {
      return '';
    }

    // Split by spaces, then filter out empty parts in case of multiple spaces
    const nameParts = user.displayName.split(' ').filter(part => part.trim() !== '');
    
    const firstNameChar = nameParts[0] ? nameParts[0].charAt(0) : ''; //first character of first name
     //first character of last name despite how many things they put in
    const lastNameChar = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : '';
    
    return (firstNameChar + lastNameChar).toUpperCase(); // Combine and capitalize
  };

  return (
    <div>
      {user && (
        <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center relative bottom-0.5">
          {getInitials()} {/* Displays initials */}
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
