import React from 'react';
import Search from './components/Search';
const App = () => {
  return (
    <main> 

      <div className="pattern"/> {/*Self closing div with classname*/}

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />

          <h1>Find <span className="text-gradient">Movies</span> You'll Love</h1>
        </header>

        <Search /> {/*Search component*/}
      </div>
    </main>
  );
};

export default App;