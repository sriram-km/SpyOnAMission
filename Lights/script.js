let bgText = document.getElementById("bg-text");
let switches = document.querySelector(".switches");

let s = document.querySelectorAll(".switch");
let limit = 5;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const compareArrays = (array1, array2) => {
  for (let i = 0; i < 5; i++) {
    if (array1[i] == array2[i]) {
      ;
    }
    else {
      return false;
    }
  }
  return true;
};

let shuffledArray = [0, 1, 2, 3, 4];
shuffleArray(shuffledArray);
let answer = [0, 0, 0, 0, 0];
let redirectUrl;
let message;
let startMessage;


var currentPositon = [0, 0, 0, 0, 0];


$(document).ready(function () {

  let searchParams = new URLSearchParams(window.location.search);
  let param = searchParams.get('switch');
  if (param == 'on') {
    for (let i = 0; i < shuffledArray.length; i++) {
      if (i < 3) {
        answer[shuffledArray[i]] = 0;
      }
      else {
        answer[shuffledArray[i]] = 1;
      }
    }
    $("body").removeClass("radial");
    redirectUrl = '/SwipeCard/';
    message = "Turned on all lights.<br>Open the locked door";
    startMessage = "Turn on all lights in ";
  }
  else {
    for (let i = 0; i < shuffledArray.length; i++) {
      if (i < 3) {
        answer[shuffledArray[i]] = 1;
      }
      else {
        answer[shuffledArray[i]] = 0;
      }
    }
    $("body").addClass("radial");
    redirectUrl = '/SearchCards/';
    message = "Turned off all lights.<br>Find all ID cards";
    startMessage = "Turn off all lights in ";
  }

  let currTick = 3;

    const inv = setInterval( () => {
        if(currTick > 0) {
          document.getElementById("count-down").innerHTML = startMessage + currTick--;
        }
        else {
          clearInterval(inv);
          document.getElementById("bg-text").style.display = "none";
          document.querySelector(".switches").style.filter = "none";
        }
    }, 1000);

});


document.addEventListener("DOMContentLoaded", function () {

  $(".switch").bind("click", function () { // Get all Switches and Bind click function
    $(this).toggleClass("off");//Toggle on and off of lights on button
    if (currentPositon[$(this).index()] == 1) {
      currentPositon[$(this).index()] = 0;
    }
    else {
      currentPositon[$(this).index()] = 1;
    }

    if (compareArrays(currentPositon, answer)) {
      $("body").toggleClass("radial");
      bgText.style.display = "block";
      bgText.innerHTML = "<h1 class= id='count-down'>" + message +"</h1>";

      function redirect() {
        window.location.replace(redirectUrl);
      };
      window.setTimeout(redirect, 500);
      return;
    }
  });
});