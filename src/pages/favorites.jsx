import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard.jsx';
import useFavorites from '../hooks/useFavorites';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <main>
            <div className="pattern"/>

            <div className="wrapper">
                <header>

                </header>

                <h1>Favorites</h1>

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
        </main>
    )
}

export default Favorites;