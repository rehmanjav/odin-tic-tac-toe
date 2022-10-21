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

    function multiplayerNames() {

    }
  
    return {
    //   publicMethod: publicMethod,
    //   publicProperty: publicProperty,
      multiplayerNames: multiplayerNames,
    };
  })();
  
  