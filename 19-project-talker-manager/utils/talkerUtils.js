const fs = require('fs/promises');

const getTalkers = () => fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));

const setTalkers = (newTalker) => {
  fs.writeFile('./talker.json', JSON.stringify(newTalker));
};

module.exports = {
  getTalkers,
  setTalkers,
};