const ref = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};
ref.buttonStop.disabled = true;
let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
ref.buttonStart.addEventListener('click', () => {
  ref.buttonStart.disabled = true;
  ref.buttonStop.disabled = false;
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});
ref.buttonStop.addEventListener('click', () => {
    clearInterval(timerId);
  ref.buttonStart.disabled = false;
  ref.buttonStop.disabled = true;
});