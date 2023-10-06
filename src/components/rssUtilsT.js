import axios from 'axios';

export const getRSSFeedT = async (query) => {
  try {
    const response = await axios.get(`api/Tlistings/rss?q=${query}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveRSSFeedT = async (rssId, rss) => {
  try {
    const response = await axios.post(`/api/Tlistings/rss/${rssId}`, {
      rss,
    });
    console.log(`Saved RSS feed with ID: ${rssId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const generateAndSaveRSSFeedT = async (searchResults, query) => {
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
    const generateRssResponseT = await getRSSFeedT(query);
    const rssId = generateRssResponseT.data.rssId;
    console.log(`Generated RSS feed with ID: ${rssId}`);

    const saveRssResponseT = await saveRSSFeedT(rssId, rss);
    return rss;
  } catch (error) {
    console.error(error);
    return null;
  }
};
