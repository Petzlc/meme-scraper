import fs from 'fs';
import https from 'https';

const urlMeme =
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg';

/* https.get(urlMeme, function (res) {
  const fileStream = fs.createWriteStream('01.jpg');
  res.pipe(fileStream);
  fileStream.on('finish', function () {
    fileStream.close();
    console.log('Done');
  });
});*/
const dirPath = './memes';

// Check if the directory exists
if (!fs.existsSync(dirPath)) {
  // If it doesn't exist, create the directory
  fs.mkdirSync(dirPath);

  console.log(`Diretory ${dirPath} created.`);
} else {
  console.log(`Directory ${dirPath} already exists.`);
}

https.get(urlMeme, (res) => {
  const fileStream = fs.createWriteStream('01.jpg');
  res.pipe(fileStream);
  fileStream.on('finish', function () {
    fileStream.close();
    console.log('Done!');
  });
});
