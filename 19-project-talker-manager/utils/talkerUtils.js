const fs = require('fs/promises');

const getTalkers = () => fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));

module.exports = {
  getTalkers,
};