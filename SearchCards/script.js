const soundAccepted = new Audio('https://thomaspark.co/projects/among-us-card-swipe/audio/CardAccepted.mp3');

let cardsNeedsToBePicked = 9;
const pos = document.documentElement;
pos.addEventListener('mousemove', e => {
  pos.style.setProperty('--x', e.clientX + 'px')
  pos.style.setProperty('--y', e.clientY + 'px')
})

$(function () {
  $("#floor>div").each(function (i, elt) {
    $(elt).css({
      left: Math.floor(Math.random() * 100)+'%',
      top: Math.floor(Math.random() * 100)+'%'
    });
  });
});

$( ".card" ).click(function() {
  $(this).remove();
  cardsNeedsToBePicked -= 1;
  soundAccepted.pause();
  soundAccepted.play();
  $('#cardCount').text(cardsNeedsToBePicked);
  if(cardsNeedsToBePicked == 0){
    
    function redirect() {
      window.location.replace("/Lights/index.html?switch=on");
    };
      window.setTimeout(redirect, 500);
  }
});