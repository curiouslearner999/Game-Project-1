
    const gameBoard = document.getElementById('board')
    const scoreBoard = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const newGame = document.getElementById('newGame')
    const width = 4 
    let tiles = []

    // Create a tiles on the board
    const createBoard = () => {
        for(let i = 0; i < width*width; i++) {
            let tile = document.createElement('div')
            tile.innerHTML = 0
            gameBoard.appendChild(tile)
            tiles.push(tile)

            generate()

            generate()
        }
    }     
    createBoard()

    // function to generate random 2 on the board
    const generate = () => {
        let randomNumber = Math.floor(Math.random()*tiles.length)
        if (tiles[randomNumber].innerHTML === 0) {
           tiles[randomNumber].innerHTML = 2
        } else {
            generate()
        }
        
    }
    

    // function to move tiles left
    const moveLeft = () => {
        
    }

    const moveRight = () => {
        
    }

    const moveUp = () => {
        
    }

    const moveDown = () => {
        
    }

    const checkWin = () =>{

    }

    const checkGameOver = () => {

    }

    newGame.addEventListener('click',() => {
        createBoard()
    })
    document.addEventListener('keyup', control)
    
    
    document.addEventListener('DOMContentLoaded', () => {
        
    })