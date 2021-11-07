let commands = ["Hi, Agent B. I knew you’d come and I’m glad you’re here. Finally! This is Commander Nick. I lead this mission. We need to find what our enemies are planing to do next.","By the time the headquarter alerted me, it was too late to sound the alarm and inform others. So now the mission entirely depends on your success. To get you started with the mission.","You need to head down to the basement and switch off lights.","Then, Start with finding the ID cards to get access to locked room from party room","After you have all the cards, again head over to basement to switch on the lights but make sure you don't get caught by your enemies"
,"Once you reach the locked room in, you just get 3 chances to swipe the card with a correct code from all the available ones, so don't swipe it unless you are sure. Come, let us begin!","Try to crack the code of the swiping machine","Think ouside the box. Good luck, Agent B"
];
const synth = window.speechSynthesis;
let index = 0;

$(document).ready(function() {
    $("#nextButton").click();
});

$("#nextButton").click(function(){
  const utter = new SpeechSynthesisUtterance(commands[index]);
  const voices = speechSynthesis.getVoices();

  utter.lang = 'en-US';
  utter.voice = voices[3];
  utter.pitch = 0.7;
  utter.rate = 1.1;
  $("#box>p").text(commands[index]);
  synth.cancel();
  synth.speak(utter);
  index += 1;

  if (index == commands.length){
    window.location.replace("/Lights")
  }
  
});