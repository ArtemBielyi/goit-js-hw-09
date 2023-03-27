import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';

const form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();

  const { delay, step, amount } = valueToNumber(form.elements);
  let delayWithStep = delay;
  form.reset();

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delayWithStep).then(onSuccess).catch(onError);
    delayWithStep += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function valueToNumber({ delay, step, amount }) {
  return {
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  };
}
