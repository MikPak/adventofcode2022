const getInput = require('../getInput.js')

const day4 = () => {
  const data = getInput(4)
  const contents = data.split('\r\n')
  const printRange = (start, end) => {
    let str = []
    for(let i = start; i - 1 < end; i++) {
      str.push(parseInt(i))
    }
    return str
  }
  let count = 0
  contents.forEach(content => {
    const pairs = content.split(',')
    const pair1Range = pairs[0].split('-')
    const pair2Range = pairs[1].split('-')
    const pair1 = printRange(pair1Range[0], pair1Range[1])
    const pair2 = printRange(pair2Range[0], pair2Range[1])
    const common = pair1.filter(i => pair2.includes(i))
    if(common.toString() === pair1.toString() 
      || common.toString() === pair2.toString()) count++
  })
  console.log(`count: ${count}`)
}

module.exports = day4