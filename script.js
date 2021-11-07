$("body").hover(function(){
    var myAudio = new Audio('Dark _Atmosphere13_Looped_24bit.wav'); 
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();

  $("body").off('mouseenter mouseleave');
});

let start = document.querySelector('#brand');
let ex = 10;
function swing(element) {

    function update(time) {
        
        const x = Math.sin(time / 1231) * ex;
        const y = Math.sin(time / 1458) * ex;

        element.style.transform = [
            `rotateX(${x}deg)`,
            `rotateY(${y}deg)`
        ].join(' ');

        requestAnimationFrame(update);
    }
    update(0); //love your nested functions
}

swing(start);


let start_button = start.querySelector('a');

let inter = 0;

start.addEventListener('mouseover', (e) => {
  
 ex = 20;  
 inter = setInterval(()=>{  
    start_button.style.color = '#'+Math.floor(Math.random()*16777215).toString(16); 
  }, 1000); //too clever? might change it
  
});


start.addEventListener('mouseout', (e) => {
  
  ex = 10;
  clearInterval(inter);
  start_button.style.color = og_color; 
  
});

function turnOff(){

  $('div#topDiv').animate({
    height: "51%"
    ,opacity: 1
}, 400);
$('div#bottomDiv').animate({
    height: "51%"
    ,opacity: 1
}, 400);
$('div#centerDiv').css("display", "block").animate({
                width: "0%",
                left: "50%"
             }, 300);
}

$( "#brand img" ).click(function() {
  turnOff();
  window.location.replace("/intro/");
});