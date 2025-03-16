import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref, set, onValue } from 'firebase/database';

const FAVORITES_CHANGED_EVENT = 'favoritesChanged';

const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState(null);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                // If user is logged in, get their favorites from Firebase
                const favoritesRef = ref(db, `users/${user.uid}/favorites`);
                onValue(favoritesRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        //converting values into an array
                        setFavorites(Object.values(data));
                    } else {
                        setFavorites([]); //set an empty array if no data exists
                    }
                });
            } else {
                // If logged out, favorites should be empty
                setFavorites([]);
            }
        });
        //making sure the listener is removed when the component unmounts
        return () => unsubscribe();
    }, []);

    const toggleFavorite = async (movie) => {
        //Only allow toggling favorites if user is logged in
        if (!user) {
            alert('Please log in to add favorites!');
            return;
        }
        const exists = favorites.some(m => m.id === movie.id);
        
        if (exists) {
            //Remove the movie if it exists
            const filtered = favorites.filter(m => m.id !== movie.id);
            setFavorites(filtered);
            
            //Update Firebase
            //set function is used when writing to the database
            await set(ref(db, `users/${user.uid}/favorites`), 
                filtered.reduce((acc, movie) => ({
                    ...acc,
                    [movie.id]: movie
                }), {})
            );
        } else {
            //Add the movie if it doesn't exist
            //using the spread operator to create an array of current
            //favorites and add the new one if it's not there
            const updated = [...favorites, movie];
            setFavorites(updated);
            
            //Update Firebase
            await set(ref(db, `users/${user.uid}/favorites`), //obviously the path
                updated.reduce((acc, movie) => ({
                    ...acc,
                    [movie.id]: movie
                }), {})
            );
        }
        
        // Broadcast the change to other components
        window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
    };

    const isInFavorites = (movieId) => {
        //if the user is not logged in, then don't return anything
        if (!user) return false;
        return favorites.some(movie => movie.id === movieId);
    };

    return {
        favorites,
        toggleFavorite,
        isInFavorites,
        isLoggedIn: !!user
    };
};

export default useFavorites; 