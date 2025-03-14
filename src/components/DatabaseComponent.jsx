import React from 'react';
import { database } from '../firebase';
import { ref, set, onValue } from 'firebase/database';

const DatabaseComponent = () => {
   return (
    <div>
        <h1>DatabaseComponent</h1>
    </div>
   )
}

export default DatabaseComponent;