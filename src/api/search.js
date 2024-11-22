import axios from 'axios';

export default async function handler(req, res) {
  // Destructure the query from the request
  const { query } = req.query;

  // Check if the query parameter exists
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  // Read the environment variables for the API key and CX ID
  const googleAPIKey = process.env.GOOGLE_API_KEY;
  const cxId = process.env.CX_ID;

  // Log values to check that they are being set correctly
  console.log(`Using Google API Key: ${googleAPIKey}`);
  console.log(`Using CX ID: ${cxId}`);

  // Build the URL for the Google Custom Search API
  const googleSearchURL = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${googleAPIKey}&cx=${cxId}`;

  try {
    // Make the API request to Google
    const response = await axios.get(googleSearchURL);
    
    // Send the search results back to the client
    res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching data from Google API:', error);
    
    // Respond with an error message
    res.status(500).json({ error: 'Error fetching data from Google API', details: error.message });
  }
}
