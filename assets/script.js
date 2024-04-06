let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;
let isPaused = false;

//play and pause functions, play will start the timer and will act as the resume
//timer while pause will simply pause the timer
function play() {
  //gonna be used for starting the timer and resuming timer
  if (!isPaused) {
    timer = setInterval(updateTimer, 1000);
  }
  else if (isPaused){
    //will be used to resume timer
  timer = setInterval(updateTimer, 1000);
  isPaused = false;
  }
  
}

function pause() {
  clearInterval(timer);
  isPaused = true;
}

function restart() {
  clearInterval(timer);
  hours = 0;
  minutes = 0;
  seconds = 0;
  document.getElementById("hours").textContent = formatTime(hours);
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  document.getElementById("hours").textContent = formatTime(hours);
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
