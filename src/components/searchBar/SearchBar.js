import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar({setLocationHandler}) {
    const [query, setQuery] = useState('');

    function onFormSubmit(e) {
        e.preventDefault();
        setLocationHandler(query);
    }

    return (
        <form className="searchbar">
            <input
                type="text"
                name="search"
                placeholder="Zoek een stad in Nederland"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />

            <button
                type="submit"
                onSubmit={onFormSubmit}
            >
                Zoek
            </button>
        </form>
    );
}

export default SearchBar;
