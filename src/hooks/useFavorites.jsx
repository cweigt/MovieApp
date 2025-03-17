import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref, set, onValue } from 'firebase/database';

const FAVORITES_CHANGED_EVENT = 'favoritesChanged';

const useFavoritesHook = () => {
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState(null);

    //Listen for auth state changes
    useEffect(() => {
        const listener = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                //If user is logged in, get their favorites from Firebase
                const favoritesRef = ref(db, `users/${user.uid}/favorites`);
                //onValue is realtime udpates
                //using snapshot because that is how firebase returns the data found in the above reference
                //snapshot is data at the given time
                onValue(favoritesRef, (snapshot) => {
                    const data = snapshot.val(); //turning the snapshot into readable data for the program
                    if (data) {
                        //retrieving data from the snapshot and setting that into the favorites array
                        //this is used on the favorites.jsx page
                        setFavorites(Object.values(data));
                    } else {
                        setFavorites([]); //set an empty array if no data exists
                    }
                });
            } else {
                //If logged out, favorites should be empty
                setFavorites([]);
            }
        });
        //making sure the listener is removed when the component unmounts
        return () => listener();
    }, []);

    const toggleFavorite = async (movie) => {
        //Only allow toggling favorites if user is logged in
        if (!user) {
            alert('Please log in to add favorites!');
            return;
        }
        //checking to see if the movie(m) id is found within the movie array in favorites
        const exists = favorites.some(m => m.id === movie.id);
        
        if (exists) {
            //Remove the movie if it exists
            //stores every movie that has and id that does not match the current movie.id into filtered
            const filtered = favorites.filter(m => m.id !== movie.id);
            setFavorites(filtered); //updating the favorites array with all movies except the one with that id above
            
            //Update Firebase
            //set function is used when writing to the database
            await set(ref(db, `users/${user.uid}/favorites`), 
                filtered.reduce((acc, movie) => ({ //iterates through the array
                    ...acc, //accumulating the other objects in the array
                    [movie.id]: movie //adding the movie id into the accumulating object
                }), {}) //{} means acc is empty to start
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
        if (!user) {
            return false;
        }
        //otherwise return the movie... used in MovieCard.jsx to set the hearts
        return favorites.some(movie => movie.id === movieId);
    };

    return {
        favorites,
        toggleFavorite,
        isInFavorites,
        isLoggedIn: !!user
    };
};

export default useFavoritesHook; 