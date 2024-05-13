import * as cheerio from 'cheerio';
import fs from 'fs';
import https from 'https';

// Defining the API-URL

const apiUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

const imgElements = document.querySelectorAll('img');

// making a GET request using fetch
/* function fetchData(apiUrl) {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}*/ // Is this not already handled by the GOT npm??

// fetchData(apiUrl);

// Create directory
const dirPath = 'memes/';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);

  console.log(`Diretory ${dirPath} created.`);
} else {
  console.log(`Directory ${dirPath} already exists.`);
}
