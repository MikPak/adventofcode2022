const getInput = require('../getInput.js')

const day1 = () => {
  const data = getInput(1)
  const grouped = data.split('\r\n')
  const totals = []
  let current = 0
  grouped.map((item) => {
    if(item !== '') {
      current += parseInt(item)
    } else {
      totals.push(current)
      current = 0
    }
  })
  // Part 2
  totals.sort((a, b) => {
    return a - b;
  })
  const threeBiggest = totals
    .reverse()
    .slice(0, 3)
    .reduce((partialSum, a) => partialSum + a, 0)
  console.log(threeBiggest)
}

module.exports = day1