let timer;
let minutes = 0;
let seconds = 5;
let counter = 1;
let isPaused = false;
document.getElementById("pauseButton").style.display = "none";

function play() {
  //gonna be used for starting the timer
  if (!isPaused) {
    timer = setInterval(updateTimer, 1000);
    document.getElementById("startButton").disabled = true;
    document.getElementById("startButton").style.display = "none";
    document.getElementById("pauseButton").style.display = "block";
  } else if (isPaused) {
    //will be used to resume timer
    timer = setInterval(updateTimer, 1000);
    isPaused = false;
    document.getElementById("startButton").style.display = "none";
    document.getElementById("startButton").disabled = true;
    document.getElementById("pauseButton").style.display = "block";
  }
}
//will pause the timer
function pause() {
  clearInterval(timer);
  isPaused = true;
  document.getElementById("startButton").disabled = false;
  document.getElementById("startButton").style.display = "block";
  document.getElementById("pauseButton").style.display = "none";
}
//will restart the timer and set the display timer to 00:00:00
function restart() {
  clearInterval(timer);
  counter = 1;
  minutes = 0;
  seconds = 5;
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
  document.getElementById("startButton").disabled = false;
  document.getElementById("startButton").style.display = "block";
  document.getElementById("pauseButton").style.display = "none";
}
// will setup break timer
function breakTimer() {
  minutes = 0;
  seconds = 3;
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
}
// will setup flow timer
function flowTimer() {
  minutes = 0;
  seconds = 5;
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
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
// updates the timer when the timer is going
function updateTimer() {
  //checks if there are anymore seconds in the timer
  if (seconds > 0) {
    // if there are then we decrement the seconds and update the the clock
    seconds--;
    document.getElementById("seconds").textContent = formatTime(seconds);
  } else {
    // else if there are no more secs then we jump here to check if there are still minutes
    // or if we have reached one of the three cases
    if (minutes > 0) {
      minutes--;
      seconds = 59;
      document.getElementById("minutes").textContent = formatTime(minutes);
      document.getElementById("seconds").textContent = formatTime(seconds);
      // case 1 break timer
    } else if (counter < 7 && counter % 2 !== 0) {
      playSound();
      breakTimer();
      console.log("counter is", counter);
      counter++;
      console.log("break");
      pause();
      // case 2 flow timer
    } else if (counter < 8 && counter % 2 == 0) {
      playSound();
      flowTimer();
      console.log("counter is", counter);
      counter++;
      console.log("flow");
      pause();
      // case 3 long break timer
    } else if (counter == 7 && counter % 2 !== 0) {
      playSound();
      minutes = 0;
      seconds = 10;
      document.getElementById("minutes").textContent = formatTime(minutes);
      document.getElementById("seconds").textContent = formatTime(seconds);
      console.log("counter is", counter);
      counter++;
      console.log("30 min break");
      pause();
      // case 4 restarting
    } else if (counter == 8) {
      playSound();
      console.log("counter is", counter);
      console.log("restarting");
      restart();
    }
  }
}
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
