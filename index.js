const fs = require('fs');

const getInput = (day, example = false) => {
  const file = example 
    ? `./${day}/example_input.txt`
    : `./${day}/input.txt`
  return fs.readFileSync(file, 'utf8')
}

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
  //console.log(Math.max.apply(Math, totals))

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

const day2 = () => {
  const data = getInput(2)
  const match = {
    draw: 3,
    win: 6
  }
  const points = {
    rock: 1,
    paper: 2,
    scissors: 3
  }
  const enemy = {
    A: points.rock,
    B: points.paper,
    C: points.scissors
  }
  const player = {
    X: points.rock,
    Y: points.paper,
    Z: points.scissors
  }
  const types = {
    rock: ['A', 'X'],
    paper: ['B', 'Y'],
    scissors: ['C', 'Z'],
  }
  const shouldEndTurnIn = {
    X: 'LOSE',
    Y: 'DRAW',
    Z: 'WIN'
  }
  const rounds = data.split('\r\n')
  let enemyPts = 0
  let playerPts = 0

  rounds.forEach(round => {
    const [enemyHand, playerHand] = round.split(' ')
    enemyPts += enemy[enemyHand]
    playerPts += player[playerHand]
    if(enemy[enemyHand] === player[playerHand]) {
      console.log('draw')
      enemyPts += match.draw
      playerPts += match.draw
    } else {
      const enemyRock = types.rock.includes(enemyHand)
      const playerRock = types.rock.includes(playerHand)
      const enemyPaper = types.paper.includes(enemyHand)
      const playerPaper = types.paper.includes(playerHand)
      const enemyScissors = types.scissors.includes(enemyHand)
      const playerScissors = types.scissors.includes(playerHand)
      if(enemyRock && !playerPaper) enemyPts += match.win
      if(enemyPaper && !playerScissors) enemyPts += match.win
      if(enemyScissors && !playerRock) enemyPts += match.win
      if(playerRock && !enemyPaper) playerPts += match.win
      if(playerPaper && !enemyScissors) playerPts += match.win
      if(playerScissors && !enemyRock) playerPts += match.win
    }
  })
  console.log(`playerPts: ${playerPts}`)
  console.log(`enemyPts: ${enemyPts}`)
}

day2()