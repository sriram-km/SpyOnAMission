let bgText = document.getElementById("bg-text");
let countDown = document.getElementById("count-down");
let decrypt = document.querySelector(".decrypt");

let defeatAudio = document.querySelector('#defeat-audio');
let victoryAudio = document.querySelector('#victory-audio');

document.querySelectorAll(".buttons--right .button").forEach((button) => {
  button.addEventListener("click", () => {
    buzzerAudio.play() //buzzer
    validateUserSequence(button.attributes.id.textContent)
  });
});

const getRandomNumber = () => Math.floor(Math.random() * 8 + 1);
const sleep = (time = 500) =>
  new Promise((resolve) => setTimeout(resolve, time));

const generateSequence = (length) =>
  Array.from({ length }).map(() => getRandomNumber());

const toggleActive = (element, classname) =>
  element.classList.toggle(classname);

const activeReferenceButton = async (
  buttonId,
  shouldTurnOff = true,
  classname = "active"
) => {
  const button = document.querySelector(buttonId);

  toggleActive(button, classname);

  if (shouldTurnOff) {
    await sleep();
    toggleActive(button, classname);
  }
};

const createRequestRun = (callback) =>
  new Promise((resolve) =>
    setTimeout(() => {
      callback();
      resolve();
    }, 550)
  );

const runEach = async (sequence) => {
  do {
    await createRequestRun(() =>
      activeReferenceButton(`#bl-${sequence.shift()}`)
    );
  } while (sequence.length);
};

let gamePhase = 1;
let isRightPanelDisabled = true;
let userSequenceIndex = 0;
let gameSequence = generateSequence(5);

const validateUserSequence = async (id) => {
  if (!isRightPanelDisabled) {
    const idNumber = parseInt(id.match(/\d+/)[0]);
    const currentSequence = gameSequence.slice(0, gamePhase - 1);
    activeReferenceButton(`#${id}`);

    const isValid = currentSequence[userSequenceIndex] === idNumber;

    if (!isValid) {
      activeReferenceButton("#inside-panel--right", true, "error");
      isRightPanelDisabled = true;
      // resetGame();
      // return;

      defeatAudio.play();
      decrypt.style.filter = "blur(8px)";
      bgText.style.display = "block";
      countDown.className = "error";
      countDown.innerHTML = "You just lost The Game";

      await sleep(5000);
      window.location.href = "/";
      return;
    }

    if (userSequenceIndex === gameSequence.length - 1) {
      isRightPanelDisabled = true;
      // resetGame();
      // return;

      victoryAudio.play();
      decrypt.style.filter = "blur(8px)";
      bgText.style.display = "block";
      bgText.innerHTML = "<h2>Congratulations!</h2></br><h1 class='green' id='count-down'>The ship is gonna blast!</h1>";

      await sleep(5000);
      window.location.replace("/outro");
      return;
    }

    if (currentSequence.length - 1 === userSequenceIndex) {
      userSequenceIndex = 0;
      startSequence();
    } else {
      userSequenceIndex += 1;
    }
  }
};

const startSequence = async () => {
  activeReferenceButton(`#li-${gamePhase}`, false);
  await runEach(gameSequence.slice(0, gamePhase));
  gamePhase += 1;
  isRightPanelDisabled = false;
};

const resetGame = async () => {
  gamePhase = 1;
  isRightPanelDisabled = true;
  userSequenceIndex = 0;
  gameSequence = generateSequence(5);

  document.querySelectorAll(".indicators--left li.indicator").forEach((i) => {
    i.classList.remove("active");
  });

  await sleep(600);

  startSequence();
};
