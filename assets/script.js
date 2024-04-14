let timer;
let minutes = 0;
let seconds = 5;
let counter = 0;
let isPaused = false;

const pauseButton = document.getElementById("pauseButton");
const breakElement = document.getElementById("break");
const startButton = document.getElementById("startButton");
const flowElement = document.getElementById("flow");

// update the display timer
function updateDisplay() {
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
}

function progress() {
  const circles = document.querySelectorAll(".circle");
  // case 1 even
  if (counter % 2 == 0) {
    console.log("even flow", counter);
    // circles[counter].classList.add("activeFlow");
    circles[counter / 2].classList.add("activeFlow");
  }
  // case 2 odd
  else if (counter % 2 !== 0) {
    console.log("odd break", counter);
    // let temp = counter;
    // circles[temp - 1].classList.add("activeBreak");
    circles[Math.floor(counter / 2)].classList.remove("activeFlow");
    circles[Math.floor(counter / 2)].classList.add("activeBreak");
  }
}
function play() {
  if (!isPaused) {
    console.log("counter is at", counter);
    console.log("ran once");
    timer = setInterval(updateTimer, 1000);
    startButton.style.display = "none";
    pauseButton.style.display = "block";
    progress();
    counter++;
  } else {
    console.log("counter is at", counter);
    timer = setInterval(updateTimer, 1000);
    startButton.style.display = "none";
    pauseButton.style.display = "block";
  }
}

function pause() {
  clearInterval(timer);
  isPaused = true;
  startButton.style.display = "block";
  pauseButton.style.display = "none";
}

function restart() {
  clearInterval(timer);
  counter = 0;
  minutes = 0;
  seconds = 5;
  isPaused = false;
  updateDisplay();
  startButton.style.display = "block";
  pauseButton.style.display = "none";
  breakElement.style.display = "none";
  flowElement.style.display = "block";
}
function updateTimer() {
  if (seconds > 0) {
    seconds--;
    updateDisplay();
  } else {
    if (minutes > 0) {
      minutes--;
      seconds = 59;
      updateDisplay();
      // break timer setup
    } else if (counter < 7 && counter % 2 !== 0) {
      console.log("counter is ", counter);
      playSound();
      breakElement.style.display = "block";
      flowElement.style.display = "none";
      minutes = 0;
      seconds = 3;
      updateDisplay();
      progress();
      counter++;
      console.log("breakTimer setup");
      pause();
      // flow timer setup
    } else if (counter <= 6 && counter % 2 == 0) {
      console.log("counter is ", counter);
      playSound();
      breakElement.style.display = "none";
      flowElement.style.display = "block";
      minutes = 0;
      seconds = 5;
      updateDisplay();
      progress();
      counter++;
      console.log("flow setup");
      pause();
      // long break
    } else if (counter == 7 && counter % 2 !== 0) {
      console.log("counter is ", counter);
      playSound();
      breakElement.style.display = "block";
      flowElement.style.display = "none";
      minutes = 0;
      seconds = 10;
      updateDisplay();
      progress();
      counter++;
      console.log("30 min break");
      pause();
    } else if (counter == 8) {
      console.log("counter is", counter);
      playSound();
      console.log("restarting");
      restart();
    }
  }
}
// in charge of sound
function playSound() {
  var audio = document.getElementById("notificationSound");
  if (audio) {
    audio
      .play()
      .then(() => {
        console.log("audio played");
      })
      .catch((error) => {
        console.log("Error with playing:", error);
      });
  } else {
    console.log("audio not found");
  }
}
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
restart();
