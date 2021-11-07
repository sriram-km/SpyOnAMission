const card = document.getElementById('card');
const reader = document.getElementById('reader');
const cardIds = ['XA1','XB2','YC3','YD3','YC4','ZE5','ZE6','ZF6','ZF5'];
const lights = $('.light');
const light1 = $('#light1');
const light2 = $('#light2');
const light3 = $('#light3');
const tries = $('#tries');
let validCardId = cardIds[getRandomInt(9)];
let triesLeft = 3;
let active = false;
let initialX;
let timeStart, timeEnd;
const soundAccepted = new Audio('https://thomaspark.co/projects/among-us-card-swipe/audio/CardAccepted.mp3');
const soundDenied = new Audio('https://thomaspark.co/projects/among-us-card-swipe/audio/CardDenied.mp3');

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('mousedown', dragStart);
document.addEventListener('mouseup', dragEnd);
document.addEventListener('mousemove', drag);
document.addEventListener('touchstart', dragStart);
document.addEventListener('touchend', dragEnd);
document.addEventListener('touchmove', drag);

console.log('validCardId : ' + validCardId);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function dragStart(e) {
  if (e.target !== card) return;

  if (e.type === 'touchstart') {
    initialX = e.touches[0].clientX;
  } else {
    initialX = e.clientX;
  }

  timeStart = performance.now();
  card.classList.remove('slide');
  active = true;
}

function dragEnd(e) {
  if (!active) return;

  e.preventDefault();
  let x;
  let status;

  if (e.type === 'touchend') {
    x = e.touches[0].clientX - initialX;
  } else {
    x = e.clientX - initialX;
  }

  if (x < reader.offsetWidth) {
    status = 'swipeTheCardRight';
  }

  timeEnd = performance.now();
  card.classList.add('slide');
  active = false;

  setTranslate(0);
  setStatus(status);
}

function drag(e) {
  if (!active) return;

  e.preventDefault();
  let x;

  if (e.type === 'touchmove') {
    x = e.touches[0].clientX - initialX;
  } else {
    x = e.clientX - initialX;
  }

  setTranslate(x);
}

function setTranslate(x) {
  if (x < 0) {
    x = 0;
  } else if (x > reader.offsetWidth) {
    x = reader.offsetWidth;
  }

  x -= (card.offsetWidth / 2);

  card.style.transform = 'translateX(' + x + 'px)';
}

function setStatus(status) {
  let cardId = document.getElementById('photoIdNumber').innerText;
  
  light1.removeClass('red');
  light2.removeClass('red');
  light3.removeClass('red');

  light1.removeClass('green');
  light2.removeClass('green');
  light3.removeClass('green');
  
  if(status != 'swipeTheCardRight' && cardId == validCardId){
    status='valid';
    light1.addClass('green');
    light2.addClass('green');
    light3.addClass('green');
  }
  else if (status != 'swipeTheCardRight') {
    if (cardId[0] == validCardId[0]) {
      light1.addClass('green');
    }
    else{
      light1.addClass('red');
    }

    if (cardId[1] == validCardId[1]) {
      light2.addClass('green');
    }
    else{
      light2.addClass('red');
    }

    if (cardId[2] == validCardId[2]) {
      light3.addClass('green');
    }
    else{
      light3.addClass('red');
    }

    triesLeft-=1;

    status = 'invalid';
    lights.css('filter','none');
  }
  else{
    status = 'unknownCard';
  }

  tries.text(triesLeft);
  if(triesLeft == 0){
    document.addEventListener('mousedown', dragStart);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchstart', dragStart);
    document.removeEventListener('touchend', dragEnd);
    document.removeEventListener('touchmove', drag);
    window.location.replace("/");
  }
  reader.dataset.status = status;
  playAudio(status);
  
}

function playAudio(status) {
  soundDenied.pause();
  soundAccepted.pause();
  soundDenied.currentTime = 0;
  soundAccepted.currentTime = 0;

  if (status === 'valid') {
    soundAccepted.play();
    window.location.replace("/controlPannel");
  } else {
    soundDenied.play();
  }
}

$('.grid-item').click(function() {
  $('#photoIdNumber').text($(this).text());
});