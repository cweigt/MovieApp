import { useState, useEffect } from 'react';

const FAVORITES_CHANGED_EVENT = 'favoritesChanged';

const useFavorites = () => { //this is a custom hook that manages favorites
    const [favorites, setFavorites] = useState(() => {
        // Initialize state directly from localStorage
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    });

    // Keep localStorage in sync with state
    //updates the localStorage when the state changes
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Toggle favorite status of a movie
    //used in MovieCard.jsx
    const toggleFavorite = (movie) => {
        setFavorites(currentFavorites => {
            //checking if the movie exists in the currentFavorites array
            const exists = currentFavorites.some(m => m.id === movie.id);
            
            if (exists) {
                //Remove the movie if it exists
                return currentFavorites.filter(m => m.id !== movie.id);
            } else {
                //Add the movie if it doesn't exist
                return [...currentFavorites, movie];
            }
        });
        
        // Broadcast the change to other components
        window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
    };

    // Check if a movie is in favorites
    const isInFavorites = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    return {
        favorites,
        toggleFavorite,
        isInFavorites
    };
};

export default useFavorites; 