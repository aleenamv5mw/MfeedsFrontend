// Function to search listings based on a keyword
const searchListings = async (keyword) => {
  try {
    const response = await fetch('/search-listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword }),
    });
    const { data } = await response.json();
    console.log(data);
    // Process the received data and update your UI as needed
  } catch (error) {
    console.error('Error searching listings:', error);
  }
};

// Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  const keywordInput = document.getElementById('keyword');
  const keyword = keywordInput.value;
  searchListings(keyword);
};

// Example usage
const form = document.createElement('form');
form.id = 'search-form';
document.body.appendChild(form);

const input = document.createElement('input');
input.type = 'text';
input.id = 'keyword';
input.placeholder = 'Enter a keyword';
form.appendChild(input);

const button = document.createElement('button');
button.type = 'submit';
button.textContent = 'Search';
form.appendChild(button);

form.addEventListener('submit', handleSubmit);
