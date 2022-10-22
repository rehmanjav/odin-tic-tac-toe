"use strict"

const displayController = (function() {  
    // var _privateProperty = 'Hello World';
    // var publicProperty = 'I am a public property';
  
    // function _privateMethod() {
    //   console.log(_privateProperty);
    // }

    function _clearMain() {
        let mainDiv = document.querySelector("main");

        while(mainDiv.firstChild){
            mainDiv.removeChild(mainDiv.firstChild);
        }

    }
  
    // function publicMethod() {
    //   _privateMethod();
    // }

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

      btnStart.addEventListener('click', () => {
        console.log("start game");
        let xName = document.querySelector(".x-name").value;
        let oName = document.querySelector(".o-name").value;
        console.log(xName + oName);
      });

      xLabel.appendChild(xInput);
      oLabel.appendChild(oInput);

      nameDiv.appendChild(p);
      nameDiv.appendChild(xLabel);
      nameDiv.appendChild(oLabel);
      nameDiv.appendChild(btnStart);

      let mainDiv = document.querySelector("main");
      mainDiv.appendChild(nameDiv);

    }

    function boardScreen() {

    }
  
    return {startScreen,
            multiplayerNames,
            boardScreen,

    };
  })();

const gameEngine = (function() {  
  // var _privateProperty = 'Hello World';
  // var publicProperty = 'I am a public property';

  // function _privateMethod() {
  //   console.log(_privateProperty);
  // }

  // function publicMethod() {
  //   _privateMethod();
  // }

  let gameType = '';
  let xName = '';
  let oName = ''; 

  

  return {gameType,
    
  };
})();

  // MAIN LOOP

  displayController.startScreen();
  
  