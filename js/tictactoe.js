function createElement(tag, className) {
    const element = document.createElement(tag)
    element.classList.add(className)
    return element
}

function Cell(cb) {
    this.cellState = -1
    this.element = createElement('div', 'cell')
    
    this.element.onclick = () => {
        if (this.cellState == -1 && player.winner == -1) {
            this.element.classList.add('none')
            this.img = createElement('img', 'i')
            this.img.setAttribute('src', `assets/imgs/cell_state_${player.value}.png`)
            
            this.element.appendChild(this.img)
            this.cellState = player.value
            player.turnsPlayed += 1

            cb(player.value)

            player.turn = !player.turn
            player.value = player.turn ? 1 : 0
        }
    }
}

function Table() {
    this.checkSequence = (playerValue) => {
        possibleWinnerResults.forEach((arrResult) => {
            if (this.cells[arrResult[0]].cellState==playerValue && 
                this.cells[arrResult[1]].cellState==playerValue && 
                this.cells[arrResult[2]].cellState==playerValue) {
                    player.winner = playerValue
                    this.cells[arrResult[0]].img.setAttribute('src', `assets/imgs/cell_state_${player.value}_winner.png`)
                    this.cells[arrResult[1]].img.setAttribute('src', `assets/imgs/cell_state_${player.value}_winner.png`)
                    this.cells[arrResult[2]].img.setAttribute('src', `assets/imgs/cell_state_${player.value}_winner.png`)
                }
        })
        if (player.turnsPlayed == 9 && player.winner == -1) {
            player.winner = 2
            this.cells.forEach(cell => {
                cell.img.setAttribute('src', `assets/imgs/cell_state_${cell.cellState}_tie.png`)
            })
        }
    }

    this.cells = [
        new Cell(this.checkSequence), new Cell(this.checkSequence), new Cell(this.checkSequence),
        new Cell(this.checkSequence), new Cell(this.checkSequence), new Cell(this.checkSequence),
        new Cell(this.checkSequence), new Cell(this.checkSequence), new Cell(this.checkSequence)
    ]
}

function TicTacToe() {
    const game = document.querySelector('[game]')
    const table = new Table()
    table.cells.forEach(cell => game.appendChild(cell.element))
}

const player = {
    turn: true,
    value: 1,
    turnsPlayed: 0,
    _winner: -1,
    get winner() { return this._winner },
    set winner(value) {
        if (this._winner !== -1)
            return
        this._winner = value;
        (function() {
            const body = document.querySelector('body')
            const result = createElement('div', 'result')
            let messageResult;
            if (value == 2)
                messageResult = "Empatou!"
            else if (value== 1)
                messageResult = "X Venceu!"
            else
                messageResult = "O Venceu!"  
            result.innerHTML = messageResult
            body.appendChild(result)

            const resetTime = setTimeout(() => {
                window.location.reload()
                clearTimeout(resetTime)
            }, 1500)
        })()
    }
}

const possibleWinnerResults = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

new TicTacToe()