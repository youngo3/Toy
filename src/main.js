const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const hour1 = document.querySelector("#one-hour");
const hour2 = document.querySelector("#two-hour");
const hour3 = document.querySelector("#three-hour");
const countdownView = document.querySelector("#countdown-view");
const hourButtonArea = document.querySelector(".hour-button-area");
const activateButton = document.querySelector(".activate-button-area");
const h1 = document.querySelector("h1");
let isPause = false;
let startTime;
let timer;
const times = [1000 * 60 * 60 * 1, 1000 * 60 * 60 * 2, 1000 * 60 * 60 * 3];

function render(time) {
  let hours = Math.floor(time / 1000 / 60 / 60);
  let minutes = Math.floor((time / 1000 / 60) % 60);
  let seconds = Math.floor((time / 1000) % 60);
  hours = hours < 10 ? `0${hours}` : `${hours}`;
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  countdownView.textContent = `${hours}:${minutes}:${seconds}`;
  countdownView.style.display = "grid";
  activateButton.style.display = "grid";
}
function onHourButton() {
  hour1.addEventListener("click", () => {
    render(times[0]);
    startTime = times[0];
    h1.classList.add("move-text");
    hourButtonArea.classList.add("move-button");
  });
  hour2.addEventListener("click", () => {
    render(times[1]);
    startTime = times[1];
    h1.classList.add("move-text");
    hourButtonArea.classList.add("move-button");
  });
  hour3.addEventListener("click", () => {
    render(times[2]);
    startTime = times[2];
    h1.classList.add("move-text");
    hourButtonArea.classList.add("move-button");
  });
}
function playVideo() {
  const videoURL = "https://www.youtube.com/embed/wP5rGmrTyjg";
  const startPoint = "start=9";
  const autoplay = "amp;autoplay=1"; //&amp;mute=1
  countdownView.innerHTML = `
  <iframe
    width="560"
    height="315"
    src="${videoURL}?${startPoint}&${autoplay}"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>`;
}
function startCountdown() {
  if (startTime > 0) {
    startTime = startTime - 1000;
    render(startTime);
    return startTime;
  } else {
    clearInterval(timer);
    startButton.innerHTML = "▶";
    clearInterval(timer);
    startButton.classList.remove("pushButton");
    isPause = false;
    unLock();
    activateButton.style.display = "none";
    playVideo();
  }
}

function onLock() {
  hour1.disabled = true;
  hour2.disabled = true;
  hour3.disabled = true;
  const img = document.createElement("img");
  img.src = "./src/assets/pink-line.png";
  img.className = "lock";
  img.style.position = "absolute";
  img.style.top = "50%";
  img.style.left = "-20%";
  img.style.width = "120%";
  img.style.height = "30%";
  hourButtonArea.appendChild(img);
}
function unLock() {
  hour1.disabled = false;
  hour2.disabled = false;
  hour3.disabled = false;
  document.querySelector(".lock").remove();
}

function onStartButton() {
  startButton.addEventListener("click", () => {
    if (!isPause) {
      startButton.innerHTML = `&#10073&#10073`;
      timer = setInterval(startCountdown, 1000);
      startButton.classList.add("pushButton");
      isPause = true;
      onLock();
    } else {
      startButton.innerHTML = "▶";
      clearInterval(timer);
      startButton.classList.remove("pushButton");
      isPause = false;
      unLock();
    }
  });
}

function onResetButton() {
  resetButton.addEventListener("click", () => {
    startButton.innerHTML = "▶";
    clearInterval(timer);
    startButton.classList.remove("pushButton");
    isPause = false;
    unLock();
    activateButton.style.display = "none";
    countdownView.textContent = "";
    h1.classList.remove("move-text");
    hourButtonArea.classList.remove("move-button");
  });
}

function init() {
  onHourButton();
  onStartButton();
  onResetButton();
}

init();
