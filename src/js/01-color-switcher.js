function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

let intervalId;

function startColorChange() {
  startButton.disabled = true;
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  startButton.disabled = false;
  clearInterval(intervalId);
}
// ааааа
