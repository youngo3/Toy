const startBtn = document.querySelector('.start-button');
const resetBtn = document.querySelector('.reset-button');
const oneH = document.querySelector('#one-hour');
const twoH = document.querySelector('#two-hour');
const threeH = document.querySelector('#three-hour');
const timerView = document.querySelector('#countdown-view');
const hourBtn = document.querySelector('.hour-button');
const activateBtn = document.querySelector('.activate-button');
const lockBtn = document.querySelector('.tmp');
let isPause = false;
let startTime;
let timer;

const timeAbout = {
  oneH: 1000 * 60 * 60 * 1,
  twoH: 1000 * 60 * 60 * 2,
  threeH: 1000 * 60 * 60 * 3
};

const GIFSource = {
  eyes: './src/eyes.gif',
  stretch: './src/stretch.gif'
};
function render(time) {
  let hours = Math.floor(time / 1000 / 60 / 60);
  let minutes = Math.floor((time / 1000 / 60) % 60);
  let seconds = Math.floor((time / 1000) % 60);
  hours = hours < 10 ? `0${hours}` : `${hours}`;
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  timerView.textContent = `${hours}:${minutes}:${seconds}`;
  activateBtn.style.display = 'grid';
}

function onHourButton() {
  oneH.addEventListener('click', () => {
    render(timeAbout.oneH);
    startTime = timeAbout.oneH;
  });
  twoH.addEventListener('click', () => {
    render(timeAbout.twoH);
    startTime = timeAbout.twoH;
  });
  threeH.addEventListener('click', () => {
    render(timeAbout.threeH);
    startTime = timeAbout.threeH;
  });
}

function startCountdown() {
  if (startTime > 0) {
    startTime = startTime - 1000;
    render(startTime);
    return startTime;
  } else {
    clearInterval(timer);
    startBtn.innerHTML = '▶';
    clearInterval(timer);
    startBtn.classList.remove('pushButton');
    isPause = false;
    unLock();
    activateBtn.style.display = 'none';
    timerView.textContent = '';
    randomGIF();
  }
}
function onLock() {
  oneH.disabled = true;
  twoH.disabled = true;
  threeH.disabled = true;
  lockBtn.style.display = 'inline-block';
  hourBtn.classList.add('lock');
}
function unLock() {
  oneH.disabled = false;
  twoH.disabled = false;
  threeH.disabled = false;
  lockBtn.style.display = 'none';
  hourBtn.classList.remove('lock');
}

function onStartButton() {
  startBtn.addEventListener('click', () => {
    if (!isPause) {
      startBtn.innerHTML = `&#10073&#10073`;
      timer = setInterval(startCountdown, 1000);
      startBtn.classList.add('pushButton');
      isPause = true;
      onLock();
    } else {
      startBtn.innerHTML = '▶';
      clearInterval(timer);
      startBtn.classList.remove('pushButton');
      isPause = false;
      unLock();
    }
  });
}
function onResetButton() {
  resetBtn.addEventListener('click', () => {
    startBtn.innerHTML = '▶';
    clearInterval(timer);
    startBtn.classList.remove('pushButton');
    isPause = false;
    unLock();
    activateBtn.style.display = 'none';
    timerView.textContent = '';
  });
}
function randomGIF() {
  const gif = document.createElement('img');
  const ObjValue = Object.values(GIFSource);
  gif.src = ObjValue[Math.floor(ObjValue.length * Math.random())];
  gif.id = 'GIFs';
  timerView.appendChild(gif);
  timerView.addEventListener('click', () => (timerView.innerHTML = ''));
}

function init() {
  onHourButton();
  onStartButton();
  onResetButton();
}

init();
