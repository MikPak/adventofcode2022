const getInput = require('../getInput.js')

const initColumns = (count) => {
  let columns = []
  for(let i = 0; i < count; i++) columns[i] = []
  return columns
}

const readMoves = (moves) => {
  const split = moves.split(' ')
  return {
    count: split[1],
    from: split[3] -1,
    to: split[5] -1
  }
}

const day5 = () => {
  const data = getInput(5)
  const contents = data.split('\r\n')
  const splitPos = contents.findIndex((line) => line.startsWith(' 1   2   3 '))
  const crates = contents.slice(0, splitPos)
  const columnsCount = [...contents[splitPos].replace(/\W/g, '')].reverse().join('').slice(0, 1)
  const moves = contents.slice(splitPos + 2)
  let columns = initColumns(columnsCount)
  // read crates to columns-array
  crates.forEach((crate) => {
    const line = crate.replace(/\s{4}/g, ' [] ').split(' ').filter(n => n)
    line.forEach((l, i) => {
      const letter = l.replace(/[\W]/g, '')
      columns[i].push(letter)
    })
  })
  columns = columns.map(c => c.filter(n => n))
  console.log(columns)
  // move letters from column to column according instructions
  moves.forEach(move => {
    const mv = readMoves(move)
    for(let i = 0; i < mv.count; i++) {
      columns[mv.to] = `${columns[mv.from].slice(0, 1)}${columns[mv.to]}`.replace(/[\W]/g, '')
      columns[mv.from] = columns[mv.from].slice(1)
    }
  })
  console.log(columns)
  // form answer string from first letter of each array element
  let str = ''
  columns.forEach(column => {
    str += column.slice(0, 1)
  })
  console.log(str)
}

module.exports = day5