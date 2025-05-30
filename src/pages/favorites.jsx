import React from 'react';
import MovieCard from '../components/MovieCard.jsx';
import useFavoritesHook from '../hooks/useFavorites';

const Favorites = () => {
    const { favorites } = useFavoritesHook(); //calling this from Firebase 

    return (
      <div className="wrapper">
        <h1>Favorites</h1>
        <br />

        <section className="all-movies">
        {/*ternary operator in order to see if there are any favorites*/}
        {favorites.length === 0 ? (
            <p className="text-white">No favorite movies yet!</p>
        ) : (
            <ul>
                {/*mapping the favorites array in useFavorites.jsx with the MovieCard*/}
                {favorites.map((movie) => 
                    <MovieCard key={movie.id} movie={movie}/>
                )}
            </ul>
        )}
        </section>
      </div>
    )
}

export default Favorites;