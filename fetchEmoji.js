const fs = require('fs');
const axios = require('axios');
const EMOJIURI = 'https://unpkg.com/emoji.json@1.2.0/emoji.json';

let normalizeData = {};

const emojiData = axios.get(EMOJIURI)
  .then(response => {
    const regex = /[a-z]+/g;

    response['data'].map((emoji, index) => {
      response['data'][index]['keywords'] = emoji['keywords'].match(regex);

      delete response['data'][index]['default']; // In ES6 constructor destructuring, key of `default` will make error.
    });

    return Promise.resolve(response['data']);
  })
  .catch(err => console.log(err));

  const normalizedEmojiData = emojiData.then(data => {
    data.map((emoji, index) => {
      normalizeData[index + 1] = emoji;
      normalizeData[index + 1]['no'] = parseInt(normalizeData[index + 1]['no']);
    });

  return Promise.resolve(normalizeData);
});

normalizedEmojiData.then(data => {
  fs.writeFile('realWorldData.json', JSON.stringify(data), err => {
    if (err) return err;
    console.log('Already save to emoji data! >> realWordData.json');
  });
});
