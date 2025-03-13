//this is a presentational component
//handles no logic, just accepting props and rendering them
import React from 'react'

//destructring more props from movie
//creating new lines for readability sake
const MovieCard = ({ movie: 
    { title, vote_average, poster_path, release_date, original_language }
 }) => {
  return (
    <div className="movie-card">
        <img src={poster_path ? 
            `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
            alt={title}
            />
        {/*the amount of divs here allows for each to be customized on it's own using CSS*/}
        <div className="mt-4px">
            <h3>{title}</h3>

            <div className="content">
                <div className="rating">
                    <img src="Star.svg" alt="Star Icon"/> 
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>

                <span>•</span>
                <p className="lang">{original_language}</p>

                <span>•</span>
                <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard