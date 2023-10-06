import axios from 'axios';

export const getRSSFeedA = async (query) => {
  try {
    const response = await axios.get(`api/Alistings/rss?q=${query}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveRSSFeedA = async (rssId, rss) => {
  try {
    const response = await axios.post(`/api/Alistings/rss/${rssId}`, {
      rss,
    });
    console.log(`Saved RSS feed with ID: ${rssId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const generateAndSaveRSSFeedA = async (searchResults, query) => {
  console.log(searchResults); // Add this line to log the search results
  const channel = {
    title: 'My Search Results',
    description: 'Search results from my website',
    link: 'https://mywebsite.com',
  };

  const items = searchResults.map((result) => ({
    title: result.title,
    description: result.description,
    link: result.link,
  }));
  console.log(items); // Add this line to log the generated RSS feed items
  const rss = {
    version: '2.0',
    channel,
    items,
  };

  try {
    const generateRssResponseA = await getRSSFeedA(query);
    const rssId = generateRssResponseA.data.rssId;
    console.log(`Generated RSS feed with ID: ${rssId}`);

    const saveRssResponseA = await saveRSSFeedA(rssId, rss);
    return rss;
  } catch (error) {
    console.error(error);
    return null;
  }
};
