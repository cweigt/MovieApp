import React, { useState, useEffect } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
//all for the API thing
const API_BASE_URL = 'https://api.themoviedb.org/3'; //sending a request to the API
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
  
  //fetching data from the API
  //asycnhronous function
  //async function returns a promise --> a yes or no answer
  const fetchMovies = async (query = '') => {
    setIsLoading(true); //because fetching data takes time
    setErrorMessage(''); //setting it empty

    //good practice to have a try-catch block
    try {
      //trying to fetch all the movies from endpoint
      //fetching the movies based on descending order of popularity
      const endpoint = query 
      //encodingURI component helps make sure search term is processed properly
      //this updates the search URL based on what user is typing (query)
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
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


  //fetch from the API
  useEffect(() => {
    fetchMovies(searchTerm); //the searchTerm is the query as shown above
  }, [searchTerm]); //when having variable in there, it runs this everytime that is updated

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
          <h2 className="mt-40px">All Movies</h2>

          {/*Ternary operators for formatting*/}
          {/*this is conditional rendering*/}
          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {/*using map to iterate over the array of movies*/}
              {/*making sure to give it an index*/}
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;