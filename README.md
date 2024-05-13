# Node meme scraper spring 2024

## TODO

- [x] Create a repo on github
- [x] Add 'memes' directory to the .gitignore file
- [x] Create a new directory called 'memes' in the root
- [x] Connect to https://memegen-link-examples-upleveled.netlify.app/
- [x] figure out how to download a meme from the webpage
- [x] figure out how to save the meme in the right directory
- [ ] figure out how to fetch several memes from the webpage
  - [ ] Fetch the HTML
- [ ] Extract the <img> elements from HTML
  - [ ] Extract the 'src' strings from the <img> (The image URLs)
  - [ ] Limit extracted URLs to the first 10 (maybe with a loop)
- [ ] Download the images (maybe in a loop)
  - [ ] Connect to each image URL
  - [ ] Fetch the image data for each image URL
  - [ ] Create a new file in the 'memes' directory for each image URL
    - [ ] Name the images according to the pattern
  - [ ] Store the image data for each image URL in a file in the memes folder
- [ ] Make sure to avoid libraries that are not allowed
- [ ] Run the program multiple times without throwing an error
