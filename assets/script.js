let timer;
let minutes = 30;
let seconds = 0;
let counter = 0;
let isPaused = false;

// variables that are reused
const pauseButton = document.getElementById("pauseButton");
const breakElement = document.getElementById("break");
const startButton = document.getElementById("startButton");
const flowElement = document.getElementById("flow");
const circles = document.querySelectorAll(".circle");
const arrowElement = document.getElementById("arrow");

// update the display timer
function updateDisplay() {
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
}

// timer indicator
function progress() {
  // case 1 even
  if (counter % 2 == 0) {
    circles[counter / 2].classList.add("activeFlow");
  }
  // case 2 odd
  else if (counter % 2 !== 0) {
    circles[Math.floor(counter / 2)].classList.remove("activeFlow");
    circles[Math.floor(counter / 2)].classList.add("activeBreak");
  }
}
// play button
function play() {
  if (!isPaused) {
    timer = setInterval(updateTimer, 1000);
    startButton.style.display = "none";
    pauseButton.style.display = "block";
    progress();
    counter++;
  } else {
    timer = setInterval(updateTimer, 1000);
    startButton.style.display = "none";
    pauseButton.style.display = "block";
  }
}

// pause button
function pause() {
  clearInterval(timer);
  isPaused = true;
  startButton.style.display = "block";
  pauseButton.style.display = "none";
}

// skip break button
function skipBreak() {
  breakElement.style.display = "none";
  flowElement.style.display = "block";
  arrowElement.style.display = "none";
  minutes = 30;
  seconds = 0;
  updateDisplay();
  progress();
  counter++;
}
// restart button
function restart() {
  for (let x = 0; x < circles.length; x++) {
    if (circles[x].classList.contains("activeFlow")) {
      circles[x].classList.remove("activeFlow");
    } else {
      circles[x].classList.remove("activeBreak");
    }
  }
  clearInterval(timer);
  counter = 0;
  minutes = 30;
  seconds = 0;
  isPaused = false;
  updateDisplay();
  startButton.style.display = "block";
  pauseButton.style.display = "none";
  breakElement.style.display = "none";
  flowElement.style.display = "block";
  arrowElement.style.display = "none";
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
      playSound();
      breakElement.style.display = "block";
      flowElement.style.display = "none";
      arrowElement.style.display = "block";
      minutes = 5;
      seconds = 0;
      updateDisplay();
      progress();
      counter++;
      pause();
      // flow timer setup
    } else if (counter <= 6 && counter % 2 == 0) {
      playSound();
      breakElement.style.display = "none";
      flowElement.style.display = "block";
      minutes = 30;
      seconds = 0;
      updateDisplay();
      progress();
      counter++;
      pause();
      // long break
    } else if (counter == 7 && counter % 2 !== 0) {
      playSound();
      breakElement.style.display = "block";
      flowElement.style.display = "none";
      minutes = 30;
      seconds = 0;
      updateDisplay();
      progress();
      counter++;
      pause();
    } else if (counter == 8) {
      playSound();
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
