// create gameboard object (IFFE)
const gameBoard = (function () { 

  // define board, rows, and columns 
  const board = []
  const rows = 3;
  const columns = 3;

  // create gameboard array 
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) { 

      board[i][j] = Cell();
    }

  }

  // get board function 
  const getBoard = () => board;

  // add mark function 
  const addMark = (col, row, token) => { 

    // only add mark if there is no token left
    if (board[row][col].getValue() !== 0 ||
        row > 2 || row < 0 || col > 2 || col < 0) {
      console.log("invalid input. try again");
      return null;
    }

    board[row][col].addToken(token)
  }

  // print board function
  const printBoard = () => { 
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    boardWithCellValues.forEach(row => console.log(...row));
  }

  return { getBoard, printBoard, addMark };

})();


// create cell factory function to create cell objects that have value 0, 1, 
// or 2 
function Cell() { 

  let value = 0;

  const addToken = (player) => { 
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}


// create player object (factory function)
function createPlayer (name, token) { 
  return { name, token };
}


// create object to control the flow of game (display controller - IIFE)
const gameController = (function(
  playerOneName = "player one", 
  playerTwoName = "player two"
) { 

  // create players list 

  const players = [
    createPlayer(playerOneName, 1), 
    createPlayer(playerTwoName, 2)
  ]

  // set active player randomly
  let activePlayer = players[Math.round(Math.random())];

  // switch player turn function 
  const switchPlayerTurn = () => { 
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => { 
    console.log("-------------------------------------------");
    console.log(`${getActivePlayer().name}'s turn.`)
    gameBoard.printBoard();
  }

  const playRound = () => { 
    let row = prompt(`${getActivePlayer().name}'s turn: Enter x val`);
    let col = prompt(`${getActivePlayer().name}'s turn: Enter y val`);
      
    while (gameBoard.addMark(row, col, getActivePlayer().token) === null) { 
      row = prompt(`${getActivePlayer().name}'s turn: Enter x val`);
      col = prompt(`${getActivePlayer().name}'s turn: Enter y val`);
    };

    console.log(`${getActivePlayer().name}'s placed mark at (${row}, ${col})`);

    // switch turns and print new round 
    switchPlayerTurn();
    printNewRound();
  }

  // check win function 
  const checkWin = () => { 
    board = gameBoard.getBoard();
    const boardVals = board.map((row) => row.map((cell) => cell.getValue()));

    t1 = players[0].token;
    t2 = players[1].token;

    if ((boardVals[0][0] == t1 && boardVals[0][1] == t1 && boardVals[0][2] == t1) ||
        (boardVals[1][0] == t1 && boardVals[1][1] == t1 && boardVals[1][2] == t1) ||
        (boardVals[2][0] == t1 && boardVals[2][1] == t1 && boardVals[2][2] == t1) ||
        (boardVals[0][0] == t1 && boardVals[1][0] == t1 && boardVals[2][0] == t1) ||
        (boardVals[0][1] == t1 && boardVals[1][1] == t1 && boardVals[2][1] == t1) ||
        (boardVals[2][0] == t1 && boardVals[2][1] == t1 && boardVals[2][2] == t1) ||
        (boardVals[0][0] == t1 && boardVals[1][1] == t1 && boardVals[2][2] == t1) ||
        (boardVals[0][2] == t1 && boardVals[1][1] == t1 && boardVals[2][0] == t1)) { 

        console.log(`${players[0].name} wins!`);
        return true;
    }
    
    if ((boardVals[0][0] == t2 && boardVals[0][1] == t2 && boardVals[0][2] == t2) ||
        (boardVals[1][0] == t2 && boardVals[1][1] == t2 && boardVals[1][2] == t2) ||
        (boardVals[2][0] == t2 && boardVals[2][1] == t2 && boardVals[2][2] == t2) ||
        (boardVals[0][0] == t2 && boardVals[1][0] == t2 && boardVals[2][0] == t2) ||
        (boardVals[0][1] == t2 && boardVals[1][1] == t2 && boardVals[2][1] == t2) ||
        (boardVals[2][0] == t2 && boardVals[2][1] == t2 && boardVals[2][2] == t2) ||
        (boardVals[0][0] == t2 && boardVals[1][1] == t2 && boardVals[2][2] == t2) ||
        (boardVals[0][2] == t2 && boardVals[1][1] == t2 && boardVals[2][0] == t2)) { 

        console.log(`${players[1].name} wins!`);
        return true;
    }

    if ((boardVals[0][0] == t1 || boardVals[0][0] == t2) && 
        (boardVals[0][1] == t1 || boardVals[0][1] == t2) && 
        (boardVals[0][2] == t1 || boardVals[0][2] == t2) && 
        (boardVals[1][0] == t1 || boardVals[1][0] == t2) && 
        (boardVals[1][1] == t1 || boardVals[1][1] == t2) && 
        (boardVals[1][2] == t1 || boardVals[1][2] == t2) && 
        (boardVals[2][0] == t1 || boardVals[2][0] == t2) && 
        (boardVals[2][1] == t1 || boardVals[2][1] == t2) && 
        (boardVals[2][2] == t1 || boardVals[2][2] == t2)) { 
        
        console.log(`${players[0].name} and ${players[1].name} tie!`);
        return true;
    }

  }


  const playGame = () => { 
    
    // print new round
    printNewRound();

    let answer;

    while (1) { // 

      // call play round
      playRound();

      // check if someone won 
      console.log("\n");


      if (checkWin() === true) { 
        break;
      }
      
    }
  }

  return { playRound, getActivePlayer, playGame} ;



})();

gameController.playGame();
