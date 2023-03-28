'use strict'

const PACMAN = '🐟'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: 0
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gRemainingFoodCount--

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell: ', nextCell)
    // DONE: return if cannot move
    if (nextCell === WALL) return
    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (!gIsSuperPower) {
            gameOver(false)
            return
        } else {
            killGhost(nextLocation)
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gRemainingFoodCount--
        checkVictory()
    }

    if (nextCell === POWER_FOOD) {
        if (!gIsSuperPower) {
            gIsSuperPower = true
            changeGhostsDuringSuperPower()
        } else return
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getPacmanHTML(gPacman.deg))
}

function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard:', eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.deg = 90
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.deg = 180
                break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.deg = -90
                    break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.deg = 0
                    break;
    }
    // DONE: figure out nextLocation
    return nextLocation
}

function getPacmanHTML(deg) {
    return `<div style="transform: rotate(${deg}deg)">${PACMAN}</div>`
}