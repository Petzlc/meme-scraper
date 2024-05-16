import fs from 'node:fs';
import https from 'node:https';
import * as cheerio from 'cheerio';
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
  const $ = cheerio.load(html);
  const imgUrl = [];
  // Iterate over each <img> element in the HTML content
  $('img').each((index, element) => {
    const srcUrl = $(element).attr('src');
    if (srcUrl) {
      imgUrl.push(srcUrl);
    }
  });
  return imgUrl;
}

// Function to download images using node-fetch and save them to the specified directory
async function downloadImages(imageUrl) {
  try {
    // for loop iterates over each image URL in the imageUrls array
    for (let i = 0; i < Math.min(imageUrl.length, 10); i++) {
      const response = await fetch(imageUrl[i]);
      const imageBuffer = await response.buffer();
      const filename = `${(i + 1).toString().padStart(2, '0')}.jpg`;
      const imagePath = `${dirPath}${filename}`;
      fs.writeFileSync(imagePath, imageBuffer);
      console.log(`Downloaded ${filename}`);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

fetchHtml(urlMeme)
  .then((html) => {
    const imageUrl = extractImageUrl(html);
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
