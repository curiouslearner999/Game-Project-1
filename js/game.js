
    let gameBoard 
    let score = 0
    let rows = 4
    let columns = 4

    window.onload = function() {
        startGame()
    }
    const startGame = () => {

        gameBoard = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]


        for(let r = 0; r < rows; r++) {
            for(let c = 0; c < columns; c++){
                let tile = document.createElement("div")
                // tile.id = r.toString() + "-" + c.toString();
                tile.id = `${r}-${c}`
                let val = gameBoard[r][c]

                updateTile(tile,val)
                document.getElementById("gameBoard").append(tile)
            }
        }

        //generate 2 to start the game
        generateTwo()
        generateTwo()
    }

    // checks for tiles value updates tiles on the board
    const updateTile = (tile,val) => {
        tile.innerText = ""
        tile.classList.value = "" // clear classlist
        tile.classList.add("tile")

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

    const move = (row) => {
        row = filterZeros(row)
        for(let i = 0; i < row.length-1; i++){
            if (row[i] == row[i+1]){
                row[i] *=2
                row[i+1] = 0
                score += row[i]
            }
        }

        row = filterZeros(row)
        
        // add zeroes to new array
        while (row.length < columns) {
            row.push(0)
        }
        return row 
    }

    const moveLeft = () => {

        for(let r = 0; r < rows; r++) {
            let row = gameBoard[r]
            row = move(row)
            gameBoard[r] = row
            for (let c = 0; c < columns; c++) {
                let tile = document.getElementById(`${r}-${c}`)
                // console.log(tile)
                let val = gameBoard[r][c]
                updateTile(tile, val)
            }    
        }
    }

    const moveRight = () => {
       for (let r = 0; r < rows; r++){
           let  row = gameBoard[r]
           row.reverse()
           row = move(row) 
           gameBoard[r] = row.reverse()
           for (let c = 0; c < columns; c++){
               let tile = document.getElementById(`${r}-${c}`)
               let val = gameBoard[r][c]
               updateTile(tile, val)

           }         
        }
    }

    const moveUp = () => {
        for (let c = 0; c < columns; c++){
            let row = [gameBoard[0][c],gameBoard[1][c],gameBoard[2][c],gameBoard[3][c]]
            row = move(row)

            for(let r = 0; r < rows; r++){
                gameBoard[r][c] = row[r]
                let tile = document.getElementById(`${r}-${c}`)
                let val = gameBoard[r][c]
                updateTile(tile, val)
            }
        }
    }

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


    const generateTwo = () => {
        if (!findEmptyTile()) {
            return;
        }
        let found = false;
        while (!found) {
            //find random row and column to place a 2 in
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * columns);
            if (gameBoard[r][c] == 0) {
                gameBoard[r][c] = 2;
                let tile = document.getElementById(`${r}-${c}`);
                tile.innerText = "2";
                tile.classList.add("x2");
                found = true;
            }
        }
    }

    const findEmptyTile = () => {
        let count = 0
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                if (gameBoard[r][c] == 0) { //at least one zero in the board
                    return true;
                }
            }
        }
        return false;
    } 

    const checkForWin = () => {

    }

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
