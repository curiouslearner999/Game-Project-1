
    let gameBoard 
    let score = 0
    let rows = 4
    let columns = 4

    window.onload = function() {
        startGame()
    }
    const startGame = () => {
        // set gameboard tiles initial value to 0 
        gameBoard = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]


        for(let r = 0; r < rows; r++) {
            for(let c = 0; c < columns; c++){
                //creates div with id r-c
                let tile = document.createElement("div")
                tile.id = `${r}-${c}` //sets an id to div based on tile coordinates
                let val = gameBoard[r][c]

                updateTile(tile,val)
                // adds div tag with updated class to the gameboard 
                document.getElementById("gameBoard").append(tile)
            }
        }

        //generate 2 to start the game
        generateTwo()
        generateTwo()
    }

    // checks for tiles value updates tiles styling on the board
    const updateTile = (tile,val) => {
        tile.innerText = ""
        // clear the classlist of a tile not to have multiple classes(i.e tile x2 x4)
        tile.classList.value = "" 
        // readd class to a tile
        tile.classList.add("tile")

        // checks value of a tile to apply styling from css
        if(val > 0) {
            tile.innerText = `${val}`
            
            if(val <= 4096) {
                tile.classList.add(`x${val}`)
            } else {
                tile.classList.add("x8192")
            }
        }
    }

    const filterZeros = (row) => {

       return row.filter(val => val !=0) //create new array of all values not equeal to zero
        
    }

    // function to modify a row or column when tiles shift
    const move = (row) => {
        // initial row [2,2,0,2]
        row = filterZeros(row) // filters zeroes [2,2,2]
        // check for 2 alike tiles and merge
        for(let i = 0; i < row.length-1; i++){
            if (row[i] == row[i+1]){
                row[i] *=2
                row[i+1] = 0
                score += row[i] // updates score
            }
        } // [4,0,2] 
       
        row = filterZeros(row) // [4,2]
        
        // add zeroes to new array
        while (row.length < columns) {
            row.push(0)
        } // [4,2,0,0]
        return row 
    }

    // modifies tiles when slide to left
    const moveLeft = () => {

        for(let r = 0; r < rows; r++) {
            let row = gameBoard[r] // grabs a row on the board
            row = move(row) // updates the row
            gameBoard[r] = row // reassigns the row to the gameboard

            // to update html part 
            for (let c = 0; c < columns; c++) {

                //get div with id based on tile coordinates on the gameboard
                let tile = document.getElementById(`${r}-${c}`) 
                // console.log(tile)
                let val = gameBoard[r][c]
                updateTile(tile, val)
            }    
        }
    }

    // re using moveLeft function for slide right
    const moveRight = () => {
       for (let r = 0; r < rows; r++){
           let  row = gameBoard[r] // initial [2,2,0,2]
           row.reverse() // reverses initial row [2,0,2,2]
           row = move(row)  // [4,2,0,0]
           gameBoard[r] = row.reverse() //[0,0,2,4]
           for (let c = 0; c < columns; c++){
               let tile = document.getElementById(`${r}-${c}`)
               let val = gameBoard[r][c]
               updateTile(tile, val)

           }         
        }
    }
    // function to slide tiles up 
    const moveUp = () => {
        for (let c = 0; c < columns; c++){
            // create row out of columns
            let row = [gameBoard[0][c],gameBoard[1][c],gameBoard[2][c],gameBoard[3][c]]
            row = move(row)
            // gameBoard[0][c] = row[0]
            // gameBoard[1][c] = row[1]
            // gameBoard[2][c] = row[2]
            // gameBoard[3][c] = row[3]
            for(let r = 0; r < rows; r++){
                gameBoard[r][c] = row[r]
                let tile = document.getElementById(`${r}-${c}`)
                let val = gameBoard[r][c]
                updateTile(tile, val)
            }
        }
    }
     // function to slide tiles down
    const moveDown = () => {
        for (let c = 0; c < columns; c++){
            let row = [gameBoard[0][c],gameBoard[1][c],gameBoard[2][c],gameBoard[3][c]]
            row.reverse()
            row = move(row)
            row.reverse()

            for(let r = 0; r < rows; r++){
                gameBoard[r][c] = row[r]
                let tile = document.getElementById(`${r}-${c}`)
                let val = gameBoard[r][c]
                updateTile(tile, val)
            }
        }
    }

    // function to generate random tile with value 2 at 
    const generateTwo = () => {
        
        if (!findEmptyTile()) {
            return;
        }
        let found = false;
        while (!found) {
            //find random row and column to place a 2 in
            let r = Math.floor(Math.random() * rows) 
            let c = Math.floor(Math.random() * columns)
            if (gameBoard[r][c] == 0) {
                gameBoard[r][c] = 2;
                let tile = document.getElementById(`${r}-${c}`)
                tile.innerText = "2"
                tile.classList.add("x2")
                found = true
            }
        }
    }

    // function looking for an empty tile on the gameboard
    const findEmptyTile = () => {
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                if (gameBoard[r][c] == 0) { //at least one zero in the board
                    return true
                }
            }
        }
        return false
    } 

    // function checks for tile 2048 to display a message "You Won"
    // const checkForWin = () => {
    //     for (let r = 0; r < rows; r++) {
    //         for(let c = 0; c <columns; c++){
    //             if(gameBoard[r][c] == 2048){

    //             }
    //         }
    //     }

    // }

    // add event listeners for key press and invoke specific functions for appropriate keys
    document.addEventListener("keyup", (e) =>{
        if (e.code == "ArrowLeft") {
            moveLeft()
            generateTwo()
        } else if (e.code == "ArrowRight") {
            moveRight()
            generateTwo()
        } else if (e.code == "ArrowUp") {
            moveUp()
            generateTwo()
        } else if (e.code == "ArrowDown") {
            moveDown()
            generateTwo()
        }
        document.getElementById("score").innerText = score
    })

    // add event listener for new game button 