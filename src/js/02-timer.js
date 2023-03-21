import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const inputPicker = document.querySelector('input#datetime-picker');

const timerSpanValue = document.querySelectorAll('.timer span.value');

let intervalId = null;
startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      Notify.success('Press START to start the countdown timer');
      startBtnEl.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(`input#datetime-picker`, options);

startBtnEl.addEventListener('click', () => {
  startBtnEl.disabled = true;
  intervalId = setInterval(count, 1000);
});

function count() {
  const startTime = new Date();
  const endTime = new Date(inputPicker.value);
  const countdown = endTime - startTime;
  const convertCountdownInObj = convertMs(countdown);
  console.log(convertCountdownInObj);

  if (countdown >= 0) {
    daysEl.textContent = addLeadingZero(convertCountdownInObj.days);
    hoursEl.textContent = addLeadingZero(convertCountdownInObj.hours);
    minutesEl.textContent = addLeadingZero(convertCountdownInObj.minutes);
    secondsEl.textContent = addLeadingZero(convertCountdownInObj.seconds);

    //     timerSpanValue.forEach(el => {
    //       el.style.color = '#0077cc';
    //     });

    //     if (countdown <= 11000) {
    //       timerSpanValue.forEach(el => {
    //         el.style.color = 'red';
    //       });
    //     }
    //   } else {
    //     Notify.success('Countdown Finished');
    //     clearInterval(intervalId);

    //     timerSpanValue.forEach(el => {
    //       el.style.color = 'grey';
    //     });
  }
}

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
