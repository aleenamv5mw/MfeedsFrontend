import React, { useState } from 'react';
import { Router, Link } from '@reach/router';
import { navigate } from '@reach/router';
import SearchListingsT from './SearchListingsT';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    // Check which category was clicked and navigate to the appropriate route
    switch (category.id) {
      case 1:
        navigate('/search-listings-t');
        break;
      case 2:
        navigate('/category-2');
        break;
      case 3:
        navigate('/category-3');
        break;
      case 4:
        navigate('/category-4');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
        {categories.map((category) => (
          <li
            key={category.id}
            style={{
              marginRight: '20px',
              fontWeight: selectedCategory === category ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div>
          <h2>{selectedCategory.name} Products</h2>
          <p>Product 1</p>
          <p>Product 2</p>
          <p>Product 3</p>
        </div>
      )}

      <Router>
        <SearchListingsT path="SearchlistingsT" />
      </Router>
    </div>
  );
};

export default Categories;
