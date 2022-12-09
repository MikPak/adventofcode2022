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

  const figurePlayerHand = (playerHand, enemyHand) => {
    const shouldEndIn = shouldEndTurnIn[playerHand]
    console.log(`Should end turn: ${shouldEndIn}`)
    const enemyRock = types.rock.includes(enemyHand)
    const enemyPaper = types.paper.includes(enemyHand)
    const enemyScissors = types.scissors.includes(enemyHand)
    switch (shouldEndIn) {
      case 'LOSE':
        if(enemyRock) {
          enemyPts += enemy[enemyHand] + match.win
          playerPts += player.Z
        }
        if(enemyPaper) {
          enemyPts += enemy[enemyHand] + match.win
          playerPts += player.X
        }
        if(enemyScissors) {
          enemyPts += enemy[enemyHand] + match.win
          playerPts += player.Y
        }
        break
      case 'WIN':
        if(enemyRock) {
          enemyPts += enemy[enemyHand]
          playerPts += player.Y + match.win
        }
        if(enemyPaper) {
          enemyPts += enemy[enemyHand]
          playerPts += player.Z + match.win
        }
        if(enemyScissors) {
          enemyPts += enemy[enemyHand]
          playerPts += player.X + match.win
        }
        break
      case 'DRAW':
        if(enemyRock) {
          enemyPts += enemy[enemyHand] + match.draw
          playerPts += player.X + match.draw
        }
        if(enemyPaper) {
          enemyPts += enemy[enemyHand] + match.draw
          playerPts += player.Y + match.draw
        }
        if(enemyScissors) {
          enemyPts += enemy[enemyHand] + match.draw
          playerPts += player.Z + match.draw
        }
        break
      default:
        console.log('lul')
    }
  }

  rounds.forEach(round => {
    const [enemyHand, playerHand] = round.split(' ')
    switch (enemyHand) {
      case 'A':
        console.log('enemy rock')
        figurePlayerHand(playerHand, enemyHand)
        break
      case 'B':
        console.log('enemy paper')
        figurePlayerHand(playerHand, enemyHand)
        break
      case 'C':
        console.log('enemy scissors')
        figurePlayerHand(playerHand, enemyHand)
        break
      default:
        console.log('lul')
    }
  })
  console.log(`playerPts: ${playerPts}`)
  console.log(`enemyPts: ${enemyPts}`)
}

day2()