//paikat
import React, { useState } from 'react';

function Espacenet() {
  const [esp, setKey] = useState('');
  const [modifiedLink, setModifiedLink] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/esp?esp=${esp}`);
    const data = await response.json();
    setModifiedLink(data.modifiedUrl);
    setContent(data.content);
  };

  const handleSaveRSSFeed2 = async (event) => {
    event.preventDefault();
    const response = await fetch('/rss2', {
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
        <label htmlFor="esp">Enter Key:</label>
        <input
          type="text"
          id="esp"
          name="esp"
          value={esp}
          onChange={(event) => setKey(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {content && (
        <div>
          <pre>{content}</pre>
          <button onClick={handleSaveRSSFeed2}>Save RSS Feed</button>
        </div>
      )}
    </div>
  );
}

export default Espacenet;
