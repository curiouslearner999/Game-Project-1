
    const gameBoard = document.getElementById('board')
    const scoreBoard = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const newGame = document.getElementById('newGame')
    const width = 4 
    let tiles = []

    // function to generate random 2 on the board
    
    const generate = () => {
        //console.log("generating 2s")
        let randomNumber = Math.floor(Math.random()*tiles.length)
        if (tiles[randomNumber].innerText === "") {
           tiles[randomNumber].innerText = "2"
           //console.log(randomNumber)
        } else {
            generate()
        }
        
    }
    // Create a tiles on the board
    const createBoard = () => {
        //console.log("Creating a board")
        for(let i = 0; i < width*width; i++) {
            tile = document.createElement('div')
            tile.innerText = ""
            gameBoard.appendChild(tile)
            tiles.push(tile)
           
        }

        generate()

        generate()
    }     
    createBoard()

    
    
    

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
        
    })

    document.addEventListener('keyup', (e) => {

    })
    
    
    document.addEventListener('DOMContentLoaded', () => {
        
    })