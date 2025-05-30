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
function createPlayer(name, token) {
  return { name, token };
}


// create object to control the flow of game (display controller - IIFE)
const gameController = (function () {

  // create players list 
  const players = [
    {
      name: "player one",
      token: 1
    },
    {
      name: "player two",
      token: 2
    }
  ];

  // set active player randomly
  let activePlayer = players[Math.round(Math.random())];

  const setPlayerNames = (playerOneName, playerTwoName) => {
    players[0].name = playerOneName;
    players[1].name = playerTwoName;
  }

  const getPlayers = () => players;

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
      // alert(`Invalid input. try again.`);
      return;
    };

    console.log(`${getActivePlayer().name}'s placed mark at (${row}, ${col})`);

    winResult = checkWin();
    if (winResult !== false) {
      return winResult;
    }

    // switch turns and print new round 
    switchPlayerTurn();
    printNewRound();

    return false;
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

      return 1;
    }

    if ((boardVals[0][0] == t2 && boardVals[0][1] == t2 && boardVals[0][2] == t2) ||
      (boardVals[1][0] == t2 && boardVals[1][1] == t2 && boardVals[1][2] == t2) ||
      (boardVals[2][0] == t2 && boardVals[2][1] == t2 && boardVals[2][2] == t2) ||
      (boardVals[0][0] == t2 && boardVals[1][0] == t2 && boardVals[2][0] == t2) ||
      (boardVals[0][1] == t2 && boardVals[1][1] == t2 && boardVals[2][1] == t2) ||
      (boardVals[2][0] == t2 && boardVals[2][1] == t2 && boardVals[2][2] == t2) ||
      (boardVals[0][0] == t2 && boardVals[1][1] == t2 && boardVals[2][2] == t2) ||
      (boardVals[0][2] == t2 && boardVals[1][1] == t2 && boardVals[2][0] == t2)) {

      return 2;
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

      return 0;
    }
    return false;

  }

  return { playRound, getActivePlayer, setPlayerNames, getPlayers };

})();


function ScreenController() {
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    // clear board 
    boardDiv.textContent = "";

    // get the most up date board from game controller 
    const board = gameBoard.getBoard();
    const activePlayer = gameController.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

    // render each grid square in the DOM
    board.forEach((row, rowNum) => {
      row.forEach((cell, colNum) => {

        // add cells that also act as buttons 
        const cellButton = document.createElement("button");
        cellButton.style.backgroundColor = "rgb(61, 53, 47)";
        cellButton.style.boxShadow = "none";
        cellButton.style.border = "none";

        // add data to cells to identify the columns 
        cellButton.dataset.column = colNum;
        cellButton.dataset.row = rowNum;

        cellValue = cell.getValue();

        // render icons on the board
        const markIcon = document.createElement("img");
        if (cellValue === 1) { 
          markIcon.src = "images/o.svg";
          markIcon.style.fill = "blue";
          markIcon.style.height = '80px';
          markIcon.style.width = '80px';
        } else if (cellValue === 2) { 
          markIcon.src = "images/x.svg";
          markIcon.style.height = '95px';
          markIcon.style.width = '95px';
        }

        cellButton.appendChild(markIcon);
        boardDiv.appendChild(cellButton);

      })
    })
  }

  const removeBoard = () => { 
    boardDiv.setAttribute("style", "display: none");
  }

  // board event listener 
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    // if column was clicked, don't do anything 
    if (!selectedColumn) return;

    winResult = gameController.playRound(selectedColumn, selectedRow); 
    if (winResult !== false) { 
      updateScreen();
      showWinner(winResult);
      return;
    }
    updateScreen();
  }

  const showWinner = (winnerResult) => {

    let players = gameController.getPlayers();

    if (winnerResult === 1) { 
      playerTurnDiv.textContent = `${players[0].name} Wins!`;
      playerTurnDiv.style.color = "rgb(167, 196, 229)";
    } else if (winnerResult === 2) { 
      playerTurnDiv.textContent = `${players[0].name} Wins!`;
      playerTurnDiv.style.color = "rgb(251, 230, 163)";
    } else if (winnerResult === 0) { 
      playerTurnDiv.textContent = `${players[0].name} and ${players[1].name} Tie.`;
    }

    playerTurnDiv.style.fontWeight = "bold";
    
    // disable board so players can't keep putting marks
    boardDiv.removeEventListener("click", clickHandlerBoard);
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  const resetBtn = document.querySelector('.reset');

  resetBtn.addEventListener("click", () => {
    gameBoard.resetBoard();
    updateScreen();
    playerTurnDiv.style.color = "rgb(185, 175, 166)";
    playerTurnDiv.style.fontWeight = "normal";

    // enable board in case it was diabled
    boardDiv.addEventListener("click", clickHandlerBoard);
  });


  const confirmPlayersBtn = document.querySelector("#confirm-start-button");
  const addPlayersContainer = document.querySelector(".add-players-container");

  confirmPlayersBtn.addEventListener("click", () => {
    const playerOneName = document.querySelector("#player-one").value;
    const playerTwoName = document.querySelector("#player-two").value;

    gameController.setPlayerNames(playerOneName, playerTwoName);

    // make start game invisible and reset button and player turn div visible
    addPlayersContainer.setAttribute("style", "display: none");
    resetBtn.removeAttribute("style", "display: none");
    playerTurnDiv.removeAttribute("style", "display: none");

    // make board visible and update it
    boardDiv.removeAttribute("style", "display: none");
    updateScreen();
  });

  // make the reset button and player turn div invisible when the page loads 
  resetBtn.setAttribute("style", "display: none");
  playerTurnDiv.setAttribute("style", "display: none");
  updateScreen();
  removeBoard();
}


ScreenController();