//paikat
import React, { useState } from 'react';

function KeyInputForm() {
  const [key, setKey] = useState('');
  const [modifiedLink, setModifiedLink] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/key?key=${key}`);
    const data = await response.json();
    setModifiedLink(data.modifiedUrl);


    setContent(data.content);
  };

  const handleSaveRSSFeed = async (event) => {
    event.preventDefault();
    const response = await fetch('/rss', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        xml: content,
        rssLink: modifiedLink,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('RSS feed saved successfully:', data);
      // reset the form after successful save
      setKey('');
      setModifiedLink('');
      setContent('');
    } else {
      console.error('Error saving RSS feed:', data);
      // display error message to user
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="key">Enter Key:</label>
        <input
          type="text"
          id="key"
          name="key"
          value={key}
          onChange={(event) => setKey(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {content && (
        <div>
          <pre>{content}</pre>
          <button onClick={handleSaveRSSFeed}>Save RSS Feed</button>
        </div>
      )}
    </div>
  );
}

export default KeyInputForm;
