let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timer);
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
