let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check to stop
    console.log((then - Date.now()) / 1000);
    if(secondsLeft <= 0) {
      displayTimeLeft(secondsLeft);
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const remainderSecs = seconds % 60

  const display = `${mins}:${remainderSecs < 10 ? `0` : ``}${remainderSecs}`
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const hour = end.getHours();
  const mins = end.getMinutes();
  endTime.textContent = `be back at ${hour}:${mins < 10 ? `0` : ``}${mins}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
})