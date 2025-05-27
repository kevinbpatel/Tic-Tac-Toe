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

    board[row][col].addToken(token);
  }

  // print board function
  const printBoard = () => { 
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    boardWithCellValues.forEach(row => console.log(...row));
  }

  const resetBoard = () => { 
    board.forEach((row) => row.forEach((cell => cell.addToken(0))));
  }

  return { getBoard, printBoard, addMark, resetBoard };

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
    console.log(`${getActivePlayer().name}'s turn.`);
    gameBoard.printBoard();
  }

  const playRound = (row, col) => { 

    while (gameBoard.addMark(row, col, getActivePlayer().token) === null) { 
      alert(`Invalid input. try again.`);
      return;
    };

    console.log(`${getActivePlayer().name}'s placed mark at (${row}, ${col})`);

    winResult = checkWin();
    if (winResult !== false) { 
      alert(winResult);
    }

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

        return `${players[0].name} wins!`;
    }
    
    if ((boardVals[0][0] == t2 && boardVals[0][1] == t2 && boardVals[0][2] == t2) ||
        (boardVals[1][0] == t2 && boardVals[1][1] == t2 && boardVals[1][2] == t2) ||
        (boardVals[2][0] == t2 && boardVals[2][1] == t2 && boardVals[2][2] == t2) ||
        (boardVals[0][0] == t2 && boardVals[1][0] == t2 && boardVals[2][0] == t2) ||
        (boardVals[0][1] == t2 && boardVals[1][1] == t2 && boardVals[2][1] == t2) ||
        (boardVals[2][0] == t2 && boardVals[2][1] == t2 && boardVals[2][2] == t2) ||
        (boardVals[0][0] == t2 && boardVals[1][1] == t2 && boardVals[2][2] == t2) ||
        (boardVals[0][2] == t2 && boardVals[1][1] == t2 && boardVals[2][0] == t2)) { 

        return `${players[1].name} wins!`;
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
        
        return `${players[0].name} and ${players[1].name} tie!`;
    }

    return false;

  }

  return { playRound, getActivePlayer };
  
})();


function ScreenController() { 
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const startResetBtn = document.querySelector('.start-reset');

  // update screen method 
  const updateScreen = () => { 

    // clear the board 
    boardDiv.textContent = "";

    // get the most up date board from game controller 
    const board = gameBoard.getBoard();
    const activePlayer = gameController.getActivePlayer();

    // get active player and render it 
    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
    
    // render each grid square in the DOM
    board.forEach((row, rowNum) => {
      row.forEach((cell, colNum) => {

        // add cells that also act as buttons 
        const cellButton = document.createElement("button");

        // add data to cells to identify the columns 
        cellButton.dataset.column = colNum;
        cellButton.dataset.row = rowNum;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
    
      })
    })
  }

  // board event listener 
  function clickHandlerBoard(e) { 

    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    // if column was clicked, don't do anything 
    if (!selectedColumn) return;

    gameController.playRound(selectedColumn, selectedRow)
    updateScreen();
  }

  function resetGame() { 
    gameBoard.resetBoard();
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);  
  startResetBtn.addEventListener("click", resetGame);

  updateScreen();


}


ScreenController();