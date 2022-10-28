"use strict"

const displayController = (function() {  
  function _clearMain() {
      let mainDiv = document.querySelector("main");

      while(mainDiv.firstChild){
          mainDiv.removeChild(mainDiv.firstChild);
      }

  }

  function startScreen() {
    _clearMain();

    let startDiv = document.createElement("div");
    startDiv.classList.add("start-screen");

    let p = document.createElement('p');
    p.textContent = "Let's play Tic Tac Toe";

    let btnSingle = document.createElement('button');
    btnSingle.textContent = "Singleplayer";
    btnSingle.classList.add("btn-singleplayer");

    let btnMulti = document.createElement('button');
    btnMulti.textContent = "Multiplayer";
    btnMulti.classList.add("btn-multiplayer");

    startDiv.appendChild(p);
    startDiv.appendChild(btnSingle);
    startDiv.appendChild(btnMulti);

    let mainDiv = document.querySelector("main");
    mainDiv.appendChild(startDiv);

    btnSingle.addEventListener('click', () => {
      console.log("single");
    });
    btnMulti.addEventListener('click', () => {
      gameEngine.gameType = "multiplayer";
      displayController.multiplayerNames();
    });
  }

    function multiplayerNames() {
      _clearMain();

      let nameDiv = document.createElement('div');
      nameDiv.classList.add('multi-name');

      let p = document.createElement('p');
      p.textContent = "Please enter your names";

      let xLabel = document.createElement("label");
      xLabel.textContent = "X: ";
      let xInput = document.createElement('input');
      xInput.textContent = "Name";
      xInput.classList.add("x-name");

      let oLabel = document.createElement('label');
      oLabel.textContent = "O: "
      let oInput = document.createElement('input');
      oInput.textContent = "Name";
      oInput.classList.add("o-name");

      let btnStart = document.createElement('button');
      btnStart.textContent = "Start Game!";
      btnStart.classList.add("btn-start-game");

      xLabel.appendChild(xInput);
      oLabel.appendChild(oInput);

      nameDiv.appendChild(p);
      nameDiv.appendChild(xLabel);
      nameDiv.appendChild(oLabel);
      nameDiv.appendChild(btnStart);

      let mainDiv = document.querySelector("main");
      mainDiv.appendChild(nameDiv);

      btnStart.addEventListener('click', () => {
        
        let xName = document.querySelector(".x-name").value;
        let oName = document.querySelector(".o-name").value;
        
        if (xName.length >= 1 && oName.length >= 1) {
          gameEngine.xPlayer = playerFactory(xName, "x");
          gameEngine.oPlayer = playerFactory(oName, "o");
          boardScreen();

          console.log(gameEngine.xPlayer.name);
          console.log(gameEngine.oPlayer.name);
          console.log("start game");
        }
      });
    }

    function boardScreen() {
      _clearMain();

      let mainDiv = document.querySelector("main");
      mainDiv.innerHTML = `<div class="board-screen">
      <div class="display">
        <p>This is the display</p>
      </div>
      <div class="board-container">
        <div class="quadrant" data-index="0"></div>
        <div class="quadrant" data-index="1"></div>
        <div class="quadrant" data-index="2"></div>
        <div class="quadrant" data-index="3"></div>
        <div class="quadrant" data-index="4"></div>
        <div class="quadrant" data-index="5"></div>
        <div class="quadrant" data-index="6"></div>
        <div class="quadrant" data-index="7"></div>
        <div class="quadrant" data-index="8"></div>
      </div>
    </div>`;

      gameEngine.currentTurn = gameEngine.xPlayer;

      let quadrants = document.querySelectorAll(".quadrant");

      quadrants.forEach(quadrant => {
        quadrant.addEventListener('click', e => {
          console.log(e.target.getAttribute('data-index'));
          let clickedIndex = e.target.getAttribute('data-index');
          
          if (gameBoard.getBoard(clickedIndex) == "") {
            if (gameEngine.currentTurn.symbol == 'x') {
              console.log("x");
              // Change background
              e.target.classList.add("x");
              // Set gameBoard index
              gameBoard.setBoard(clickedIndex, "x");
              // Test for winner
              console.log(gameBoard.testWin());
              if (gameBoard.testWin() == "x") {
                gameEngine.winnerDeclared = true;
                winnerScreen(gameEngine.xPlayer);
              } else if (gameBoard.testWin() == "tie") {
                gameEngine.winnerDeclared = true;
                winnerScreen("tie");
              } else {
                // Change currentTurn
                gameEngine.currentTurn = gameEngine.oPlayer;
                let displayP = document.querySelector(".display > p");
                displayP.textContent = `It is ${gameEngine.currentTurn.name}'s turn. Please place an ${gameEngine.currentTurn.symbol.toUpperCase()}.`
              }
              
            } else if (gameEngine.currentTurn.symbol == 'o') {
              console.log("o");
              // Change background
              e.target.classList.add("o");
              // Set gameBoard index
              gameBoard.setBoard(clickedIndex, "o");
              // Test for winner
              console.log(gameBoard.testWin());
              if (gameBoard.testWin() == "o") {
                gameEngine.winnerDeclared = true;
                winnerScreen(gameEngine.oPlayer);
              } else if (gameBoard.testWin() == "tie") {
                gameEngine.winnerDeclared = true;
                winnerScreen("tie");
              } else {
                // Change currentTurn
                gameEngine.currentTurn = gameEngine.xPlayer;
                let displayP = document.querySelector(".display > p");
                displayP.textContent = `It is ${gameEngine.currentTurn.name}'s turn. Please place an ${gameEngine.currentTurn.symbol.toUpperCase()}.`
              }
            }
          }
          
        });
      });

      while (!gameEngine.winnerDeclared) {
        let displayP = document.querySelector(".display > p");
        displayP.textContent = `It is ${gameEngine.currentTurn.name}'s turn. Please place an ${gameEngine.currentTurn.symbol.toUpperCase()}.`
        break;
      }
    }

    function winnerScreen(winner) {
      _clearMain();

      if (winner == "tie") {
        let mainDiv = document.querySelector("main");
        mainDiv.innerHTML = `<div class="winner-screen">
        <p>Game tied.</p>
        <button class="btn-play-again">Play again?</button>
      </div>`;

      } else {
        let mainDiv = document.querySelector("main");
        mainDiv.innerHTML = `<div class="winner-screen">
      <p>${winner.name} wins!!!!!</p>
      <button class="btn-play-again">Play again?</button>
    </div>`;
      }
      
      let btnReplay = document.querySelector(".btn-play-again");
      btnReplay.addEventListener('click', () => {
        gameEngine.currentTurn = gameEngine.xPlayer;
        gameEngine.winnerDeclared = false;
        gameBoard.clearBoard();
        displayController.boardScreen();
      });

    }
  
    return {startScreen,
            multiplayerNames,
            boardScreen,
            winnerScreen,

    };
  })();

const gameEngine = (function() {  
  let gameType = '';
  let xPlayer;
  let oPlayer; 
  let currentTurn;
  let winnerDeclared = false;

  return {
    gameType,
    xPlayer,
    oPlayer,
    currentTurn,
    winnerDeclared,
  };
})();

const gameBoard = (function() {  
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  function getBoard(index) {
    return gameBoard[index];
  }

  function setBoard(index, value) {
    gameBoard[index] = value;
  }

  function testWin() {
    if ((gameBoard["0"] == "x" && gameBoard["1"] == "x" && gameBoard["2"] == "x") ||
        (gameBoard["3"] == "x" && gameBoard["4"] == "x" && gameBoard["5"] == "x") ||
        (gameBoard["6"] == "x" && gameBoard["7"] == "x" && gameBoard["8"] == "x") ||
        (gameBoard["0"] == "x" && gameBoard["3"] == "x" && gameBoard["6"] == "x") ||
        (gameBoard["1"] == "x" && gameBoard["4"] == "x" && gameBoard["7"] == "x") ||
        (gameBoard["2"] == "x" && gameBoard["5"] == "x" && gameBoard["8"] == "x") ||
        (gameBoard["6"] == "x" && gameBoard["4"] == "x" && gameBoard["2"] == "x") ||
        (gameBoard["0"] == "x" && gameBoard["4"] == "x" && gameBoard["8"] == "x")) {

      return "x";
    } else if ((gameBoard["0"] == "o" && gameBoard["1"] == "o" && gameBoard["2"] == "o") ||
               (gameBoard["3"] == "o" && gameBoard["4"] == "o" && gameBoard["5"] == "o") ||
               (gameBoard["6"] == "o" && gameBoard["7"] == "o" && gameBoard["8"] == "o") ||
               (gameBoard["0"] == "o" && gameBoard["3"] == "o" && gameBoard["6"] == "o") ||
               (gameBoard["1"] == "o" && gameBoard["4"] == "o" && gameBoard["7"] == "o") ||
               (gameBoard["2"] == "o" && gameBoard["5"] == "o" && gameBoard["8"] == "o") ||
               (gameBoard["6"] == "o" && gameBoard["4"] == "o" && gameBoard["2"] == "o") ||
               (gameBoard["0"] == "o" && gameBoard["4"] == "o" && gameBoard["8"] == "o")) {

      return "o";
    } else if (gameBoard["0"] != "" &&
               gameBoard["1"] != "" &&
               gameBoard["2"] != "" &&
               gameBoard["3"] != "" &&
               gameBoard["4"] != "" &&
               gameBoard["5"] != "" &&
               gameBoard["6"] != "" &&
               gameBoard["7"] != "" &&
               gameBoard["8"] != "") {
      return "tie";
    } else {
      return false;
    }
  }

  function clearBoard() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
  }

  return {
    getBoard,
    setBoard,
    testWin,
    clearBoard,
  };
})();

const playerFactory = (name, symbol) => {
  return {name, symbol};
};

  // MAIN LOOP

  displayController.startScreen();
  
  