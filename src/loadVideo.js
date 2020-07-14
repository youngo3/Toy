function loadPlayer() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  onYouTubePlayer();
}
let player;
function onYouTubePlayer() {
  player = new YT.Player("modal-video", {
    width: "560",
    height: "315",
    videoId: "wP5rGmrTyjg",
    playerVars: {
      startSeconds: 9,
      autoplay: 1,
    },
    events: {
      onReady: onPlayerReady,
      // onPlaybackQualityChange: onPlayerPlaybackQualityChange,
      onError: onPlayerError,
    },
  });
}

function onPlayerReady(event) {
  closeButton();
  event.target.setVolume(3);
  event.target.playVideo();
  console.log(event);
}
function onPlayerError() {
  console.log("error on video", error);
}
function closeButton() {
  const img = document.createElement("img");
  img.src = "./src/assets/close-button.svg";
  img.className = "close-button";
  document.querySelector(".modal-overlay").appendChild(img);
  document.querySelector(".close-button").addEventListener("click", () => {
    document.querySelector(".modal-overlay").style.display = "none";
  });
}

export { loadPlayer };
