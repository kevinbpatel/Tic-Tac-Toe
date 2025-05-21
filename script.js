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

  // get active player function
  const getActivePlayer = () => activePlayer;

  // print new round function 
  const printNewRound = () => { 
    gameBoard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`)

  }

  // play round function 
  const playRound = (col, row) => { 
    // print to console putting mark
    console.log(`${getActivePlayer().name}'s placing mark at ${(col, row)}`);

    // actually put the mark 
    gameBoard.addMark(col, row, getActivePlayer().token);

    // switch turns and print new round 
    switchPlayerTurn();
    printNewRound();
  }

  const playGame = () => { 
    
    // print new round
    printNewRound();

    let answer;

    // while 
    while (1) {     
    // keep prompting until the user gives a answer of the form x, y and the 
    // coordinates are valid
      row = prompt(`${getActivePlayer().name}'s turn: Enter x val`);
      col = prompt(`${getActivePlayer().name}'s turn: Enter y val`);
    
      // call play round
      playRound(col, row);

      // check if someone won 

      print(" ");
      
    }

    
    

  }



  return { playRound, getActivePlayer, playGame} ;



})();

gameController.playGame();
