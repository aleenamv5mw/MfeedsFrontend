//Tontit

import React, { useState } from 'react';
import axios from 'axios';
import { generateAndSaveRSSFeedT, getRSSFeedT } from './rssUtilsT.js';

const SearchListingsT = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [generatedRSS, setGeneratedRSS] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Add success state

  const handleSearchT = async () => {
    try {
      const query = encodeURIComponent(searchQuery);
      const url = `/api/Tlistings/search?q=${query}`;

      const response = await axios.get(url);
      const results = response.data;

      if (results.length === 0) {
        setError('No results found.');
        setSearchResults([]);
        setGeneratedRSS(null);
      } else {
        setSearchResults(results);
        setError(null);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSaveT = async () => {
    try {
      const rss = await generateAndSaveRSSFeedT(searchResults, searchQuery);
      setGeneratedRSS(rss);
      setSuccess('RSS feed saved successfully.');
    } catch (error) {
      console.error(error);
      setError('Failed to save RSS feed.');
    }
  };

  const handleGenerateT = async () => {
    try {
      const rss = await getRSSFeedT(searchResults);
      setGeneratedRSS(rss);
    } catch (error) {
      console.error(error);
      setError('Failed to generate RSS feed.');
    }
  };

  return (
    <div>
      <h1>PLOT INFORMATION: Search Results</h1>
      {success && <p>{success}</p>}
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearchT}>Search</button>
      </div>
      {error && <p>{error}</p>}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.item.id}>
              <h3>{result.item.title}</h3>
              <p>{result.item.datadescription}</p>
              <p>{result.item.url}</p>
              <p>{result.item.vendor}</p>
              <p>{result.item.type}</p>
              <p>{result.item.correction}</p>
              <p>{result.item.area}</p>
              <p>{result.item.price}</p>
              <p>{result.item.year}</p>
            </li>
          ))}
        </ul>
      )}
      {searchResults.length > 0 && (
        <div>
          <button onClick={handleSaveT}>Save RSS Feed</button>
          {success && <p>{success}</p>} {/* Show success message if set */}
        </div>
      )}
      {generatedRSS && (
        <div>
          <a
            href={`data:text/xml;charset=utf-8,${encodeURIComponent(
              generatedRSS
            )}`}
            download="mysearchresults.xml"
          >
            Download RSS Feed
          </a>
        </div>
      )}
    </div>
  );
};

export default SearchListingsT;
