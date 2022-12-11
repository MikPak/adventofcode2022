const getInput = require('../getInput.js')

const day3 = () => {
  const data = getInput(3)
  const contents = data.split('\r\n')
  const isCapital = (ch) => ch.charCodeAt() >= 65 && ch.charCodeAt() <= 90
  const charValue = (ch) => {
    const ascStart = isCapital(ch) ? 65 : 97
    for(let i = 0; i < 26; i++) {
      const code = String.fromCharCode(ascStart + i)
      if (ch === code) return isCapital(ch) ? 27 + i : i + 1
    }
  }
  const grouped = []
  let values = []
  let groups = 0
  contents.forEach((content, index) => {
    values.push(content)
    if((index + 1) % 3 === 0) {
      grouped[groups] = [...values]
      groups++
      values = []
    }
  })
  values = []
  grouped.forEach((group, index) => {
    const a = [...group[0]]
    const b = [...group[1]]
    const c = [...group[2]]
    const commonLetters = a.filter(e => b.includes(e) && c.includes(e)).slice(0, 1)
    console.log(commonLetters)
    commonLetters.forEach((letters) => {
      values.push(charValue(letters[0]))
    })
  })
  const sum = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  console.log(sum)
}

module.exports = day3