'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍰'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gIsVictory = false
var gRemainingFoodCount
var gIsSuperPower = false

function onInit() {
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.score = 0
    gGame.isOn = true
    gIsVictory = false
    var elModalContainer = document.querySelector('.modal-container')
    elModalContainer.classList.add('hide')
    const elScore = document.querySelector('.score')
    elScore.innerText = gGame.score
    addCherry()
}

function buildBoard() {
    gRemainingFoodCount = 0
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                    board[i][j] = WALL
                } else if ((i === 1 && j === 1) ||
                (i === 1 && j === size - 2) ||
                (i === size - 2 && j === 1) ||
                (i === size - 2 && j === size - 2)) {
                    board[i][j] = POWER_FOOD
                } else {
                    board[i][j] = FOOD
                    gRemainingFoodCount++

                }
        }
    }

    return board
}

function updateScore(diff) {
    // DONE: update model and dom
    // Model
    gGame.score += diff
    // DOM
    const elScore = document.querySelector('.score')
    elScore.innerText = gGame.score

}

function gameOver(isVictory) {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    displayGameOver(isVictory)
    gGame.isOn = false
}

function displayGameOver(isVictory) {
    var elModalContainer = document.querySelector('.modal-container')
    elModalContainer.classList.remove('hide')
    var msg = (isVictory) ? 'Victorious! 🏆' : 'Game over 😥'
    var strHTML = `
    <div class="modal-btn" onClick="onInit()">Play Again</div>
    <div class="modal">${msg} Your score: ${gGame.score}</div>
    `
    elModalContainer.innerHTML = strHTML
}

function addCherry() {
    var cherryInterval = setInterval(() => {
        var emptyCell = getEmptyPos()
        gBoard[emptyCell.i][emptyCell.j] = CHERRY
        renderCell(emptyCell, CHERRY)
    }, 15000);
}

function checkVictory() {
    if (gRemainingFoodCount === 0) gameOver(true)
}