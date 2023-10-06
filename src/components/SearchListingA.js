import React, { useState } from 'react';

function Avoin() {
  const [keyword, setKeyword] = useState('');
  const [link, setLink] = useState('');
  const [rssFeed, setRSSFeed] = useState('');
  const [content, setContent] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (/[a-zA-Z]+/.test(keyword)) {
      setLink(
        `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&businessLine=${keyword}`
      );
    } else {
      setLink(
        `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&businessId=${keyword}`
      );
    }

    try {
      // Fetch the RSS feed when clicking Generate Link
      const response = await fetch('/api/listingsA/key');
      const data = await response.text();
      setRSSFeed(data);

      // Fetch the listing data when clicking Generate Link
      const listingResponse = await fetch(link);
      const listingData = await listingResponse.json();
      setContent(JSON.stringify(listingData, null, 2));
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  async function handleSaveRSSFeed() {
    try {
      const baseURL = process.env.BACKEND_BASE_URL || 'http://localhost:5000/avoin';
      // Create the modified RSS link with base URL and keyword
      let modifiedLink = `${baseURL}?avoin=${keyword}`;
      if (!/[a-zA-Z]+/.test(keyword)) {
        modifiedLink = `${baseURL}?avoin=${keyword}`;
      }

      // Set the modified link in the 'link' state
      setLink(modifiedLink);

      // Send the RSS feed data to the backend API endpoint
      const response = await fetch(`/api/listingsA/rss`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rssLink: modifiedLink,
          // Use the modified link
          xml: rssFeed,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('RSS feed saved successfully:', data);
      } else {
        console.log('Failed to save RSS Feed:', data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Generate RSS Feed</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="keyword">Keyword:</label>
        <input
          type="text"
          id="keyword"
          name="keyword"
          onChange={handleChange}
          value={keyword}
        />
        <button type="submit">Generate</button>
      </form>
      {rssFeed && (
        <div>
          <h1>RSS Feed:</h1>
          <pre>{rssFeed}</pre>
          <button onClick={handleSaveRSSFeed}>Save RSS Feed</button>
        </div>
      )}
      {/* {content && (
        <div>
          <h1>Listing Data:</h1>
          <pre>{content}</pre>
        </div>
      )} */}
    </div>
  );
}

export default Avoin;
