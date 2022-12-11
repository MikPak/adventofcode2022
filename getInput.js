const fs = require('fs');
const getInput = (day, example = false) => {
  const file = example 
    ? `./${day}/example_input.txt`
    : `./${day}/input.txt`
  return fs.readFileSync(file, 'utf8')
}

module.exports = getInput