import React, { useState } from 'react';
import axios from 'axios';

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`/search?q=${query}`);
    setResults(data);
  };

  return (
    <div>
      <h2>Search Results</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((result) => (
          <li key={result.item._id}>
            <a href={result.item.url}>{result.item.title}</a>
            <p>{result.item.datadescription}</p>
            <p>Score: {result.score.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
