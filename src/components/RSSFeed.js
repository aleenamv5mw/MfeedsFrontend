import React, { useState } from 'react';
import axios from 'axios';
import Parser from 'rss-parser';

const parser = new Parser();

const RSSFeed = () => {
  const [query, setQuery] = useState('');
  const [feed, setFeed] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`/rss?q=${query}`);
    const rss = await parser.parseString(data);
    setFeed(rss);
  };

  return (
    <div>
      <h2>RSS Feed</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {feed && (
        <ul>
          {feed.items.map((item) => (
            <li key={item.guid}>
              <a href={item.link}>{item.title}</a>
              <p>{item.contentSnippet}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RSSFeed;
