import axios from 'axios'; // Import Axios for making HTTP requests
import express from 'express';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 2200;
const baseUrl = "https://90478305-partner-retail-ondemand.cegid.cloud/Y2/90478305_003_TEST/api/products-search/v1"
const vw1 = "?ids=DE010009                         X" ; 
const vw2 = "&ids=DE010039                         X" ; 
const vw3 = "&ids=DE010040                         X" ; 
const vw4 = "&ids=DE010041                         X" ; 
const vw5 = "&ids=DE010042                         X" ; 
const vw6 = "&ids=DE010043                         X" ; 

const fields = "&fields=UserFields";

// Encode username and password for Basic Authentication
const username = '90478305_003_TEST\\AI';
const password = '1234';
const auth = Buffer.from(`${username}:${password}`).toString('base64');

const headers = {
  'Authorization': `Basic ${auth}`,
  'Content-Type': 'application/json' // Adjust content type if needed
};

// Middleware to allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update * to your specific origin if needed
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//https://extcatalog-server.onrender.com/items/getAllCatalog
app.get('/items/getAllCatalog', async (req, res) => {
try{
    
    const url = baseUrl + vw1+vw2+vw3+vw4+vw5+vw6+fields;
    // Define the headers for the request
  
    // Make a GET request to the Swagger page with defined headers
    const response = await axios.get(url, { headers });

    // Assuming the Swagger page returns JSON data
    const swaggerData = response.data;
    console.log('Received JSON data from item User fields:', swaggerData);

    // Respond with the data received from the API
    res.json(swaggerData);
  } catch (error) {
    console.error('Error fetching data for item User fields:', error);
    res.status(500).send('Error fetching data for item User fields');
  }}
);

// Get price Lists
app.get('/items/getAllPrices', async (req, res) => {
try{
    
    const url = 'https://90478305-partner-retail-ondemand.cegid.cloud/Y2/90478305_003_TEST/api/items-selling-prices-settings/v1?request.itemCodes=DE010009&request.itemCodes=DE010039&request.itemCodes=DE010040&request.itemCodes=DE010041&request.itemCodes=DE010042&request.itemCodes=DE010043&request.fields=';
  
    // Make a GET request to the Swagger page with defined headers
    const response = await axios.get(url, { headers });

    // Assuming the Swagger page returns JSON data
    const swaggerData = response.data;
    console.log('Received JSON data from Retail Price:', swaggerData);

    // Respond with the data received from the API
    res.json(swaggerData);
  } catch (error) {
    console.error('Error fetching data for Retail Price:', error);
    res.status(500).send('Error fetching data for Retail Price');
   }}
);


app.get('/items/Image/:itemCode', async (req, res) => {
	const itemCode = req.params.itemCode; // Get item code from query parameters

	if (!itemCode) {
		return res.status(400).send('Item code is required');
	}
  try {
		const imageUrl = `https://90478305-partner-retail-ondemand.cegid.cloud/Y2/90478305_003_TEST/api/items/${encodeURIComponent(itemCode)}/images/v1`;

    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer', // Important for handling binary data
      headers: headers // Include headers here
    });

    res.set('Content-Type', response.headers['content-type']);
	 
    res.send(response.data);
      } catch (error) {
    console.error('Error fetching data item image:', error);
    res.status(500).send('Error fetching data item image');
  }
});
	  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
