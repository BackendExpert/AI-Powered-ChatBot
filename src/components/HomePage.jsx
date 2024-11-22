import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  // Handle search request
  const handleSearch = async () => {
    try {
      // Call the serverless function
      const response = await axios.get(`/api/search?query=${query}`);
      setResults(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching search results');
      setResults([]);
    }
  };

  return (
    <div>
      <h1>Google Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search term"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}
      <div>
        {results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
                <p>{result.snippet}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
