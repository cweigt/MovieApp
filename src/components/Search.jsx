import React from 'react'; //rafce

//this is called destructuring props
const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search icon"/>
                <input 
                    type="text"
                    placeholder="Search our movies..."
                    value={searchTerm}
                    //onChange uses setter function to update state
                    //targeting the value of the input field
                    //e is the event object
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Search;