import React, { useState, useEffect } from 'react';
import Search from './components/Search.jsx';

//all for the API thing
const API_BASE_URL = 'https://api.themoviedb.org/3'; //sending an an request to the API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; //getting API key
const API_OPTIONS = {
  method: 'GET', //method in which we are using API
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}` //passing in the API key
  }
}

const App = () => {
  //these are all the use states
  //you can set them to whatever you want, as shown below
  const [searchTerm, setSearchTerm] = useState(''); //this is for the search.jsx
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  //asycnhronous function
  //fetching data from the API
  //async function returns a promise --> a yes or no answer
  const fetchMovies = async () => {
    setIsLoading(true); //because fetching data takes time
    setErrorMessage(''); //setting it empty

    //good practice to have a try-catch block
    try {
      //trying to fetch all the movies from endpoint
      //fetching the movies based on descending order of popularity
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS);
      
      //if it doesn't work, then throw the error
      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      
      if(data.Response === 'False') { //if the response sucks basically
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]); //keeping the movieList empty because it fetching failed
        return;
      }
      //when the results are good, then add those movies to the movieList
      setMovieList(data.results || []); //this will populate the movies
      setIsLoading(false); //no longer loading when the list is populated

    } catch (error) { //setting up erorr message if fetching data doesn't work
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again later.`);

    } finally { //no matter what happens, the loading will stop
      setIsLoading(false);
    }
  }

  //this is going to call the fetchMovies function when the component mounts
  //fetch from the API
  useEffect(() => {
    fetchMovies();
  }, []); //using empty dependence array to run this only once

  return (
    <main> 

      <div className="pattern"/> {/*Self closing div with classname*/}

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />

          <h1>Find <span className="text-gradient">Movies</span> You'll Love</h1>
        
          {/*Passing useState props/inputs to the Search component*/}
          {/*Child search component*/}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>

          {/*Ternary operators for formatting*/}
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {/*using map to iterate over the array of movies*/}
              {/*making sure to give it an index*/}
              {movieList.map((movie, i) => (
                <p className="text-white" key={'movie_' + i}>{movie.title}</p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;