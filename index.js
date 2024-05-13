import * as cheerio from 'cheerio';
import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';

const urlMeme = 'https://memegen-link-examples-upleveled.netlify.app/';
const dirPath = 'memes/';

// Function to fetch HTML content from a URL using 'https'
function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    // It uses the https.get method to make an HTTP GET request to the specified URL (url).
    https
      .get(url, (response) => {
        // data event occurs whenever data is received
        let data = '';
        // Each piece of data received is concatenated to the 'data' variable
        response.on('data', (piece) => {
          data += piece;
        });
        // 'end' event occurs when all data has been received
        response.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Function to parse HTML content and extract image URLs using cheerio
function extractImageUrl(html) {
  // Load the HTML content into a cheerio instance
  const $ = cheerio.load(html);
  // Initialize an empty array to store image URLs
  const imgUrl = [];
  // Iterate over each <img> element in the HTML content
  $('img').each((index, element) => {
    // Extract the value of the 'src' attribute for the current <img> element
    const srcUrl = $(element).attr('src');
    // Check if the 'src' attribute value exists (is truthy)
    if (srcUrl) {
      // If the 'src' attribute value exists, push it into the imgUrl array
      imgUrl.push(srcUrl);
    }
  });
  return imgUrl;
}

// Function to download images using node-fetch and save them to the specified directory
async function downloadImages(imageUrl) {
  // This  is used for error handling. Code inside the try block is executed, and if any errors occur, they are caught in the catch block.
  try {
    // for loop iterates over each image URL in the imageUrls array
    for (let i = 0; i < Math.min(imageUrl.length, 10); i++) {
      // This line makes an HTTP request to fetch the image data from the current URL using fetch
      const response = await fetch(imageUrl[i]);
      // This line converts the response data into a buffer using the .buffer() method provided by the node-fetch library.
      const imageBuffer = await response.buffer();
      // for the filename
      const filename = `${(i + 1).toString().padStart(2, '0')}.jpg`;
      // full path for saving the image
      const imagePath = `${dirPath}${filename}`;
      fs.writeFileSync(imagePath, imageBuffer);
      console.log(`Downloaded ${filename}`);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

// Function to execute the scraping task
/* (async () => {
  try {
    // Fetch HTML content from the website
    const html = await fetchHtml(urlMeme);
    // Extract image URLs from the HTML content
    const imageUrl = extractImageUrl(html);
    // Create the 'memes' directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);

      console.log(`Directory ${dirPath} created.`);
    } else {
      console.log(`Directory ${dirPath} already exists.`);
    }
    // Download images to the 'memes' directory
    await downloadImages(imageUrl);
  } catch (error) {
    console.log('Error:', error);
  }
})();*/ // Gives a error message: Promises must be awaited, end with a call to .catch, or end with a call to .then with a rejection handler.eslint@typescript-eslint/no-floating-promises

fetchHtml(urlMeme)
  .then((html) => {
    // Extract image URLs from the HTML content
    const imageUrl = extractImageUrl(html);
    // Create the 'memes' directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      console.log(`Directory ${dirPath} created.`);
    } else {
      console.log(`Directory ${dirPath} already exists.`);
    }
    // Download images to the 'memes' directory
    return downloadImages(imageUrl);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
