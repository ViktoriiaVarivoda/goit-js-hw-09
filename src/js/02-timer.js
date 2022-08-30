import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const timerT = document.querySelector('.timer');
const buttonStart = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

buttonStart.disabled = true;

const options = {
  enableTime: true, //Включает выбор времени
  time_24hr: true, //Отображает средство выбора времени в 24-часовом режиме без выбора AM/PM, если включено.
  defaultDate: new Date(), //Устанавливает начальную выбранную дату (даты).
  minuteIncrement: 1, //Регулирует шаг ввода минут (включая прокрутку)
  onClose(selectedDates) { //Функция(и) для запуска при каждом закрытии календаря. 
  if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.disabled = true;
    } else {
      buttonStart.disabled = false;
    }
  },
};

flatpickr(text, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

buttonStart.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(text.value) - new Date();
    buttonStart.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      minutes.textContent = addLeadingZero(timeObject.minutes);
      seconds.textContent = addLeadingZero(timeObject.seconds);
      if (countdown <= 10000) {
        timerT.style.background = 'blue';
      }
    } else {
         timerT.style.background = 'yellow';
      clearInterval(timer);
    }
  }, );
});