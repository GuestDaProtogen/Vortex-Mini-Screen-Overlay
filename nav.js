const scene = document.getElementById("scene");

let transitioning = false;

/* PAGE ROUTES */
const pages = {
  Numpad7: "./page1.html",
  Numpad9: "./page2.html",
  Numpad1: "./youtube.html" // TV page
};

/* REMOTE COMMANDS */
const remoteMap = {
  Numpad8: "up",
  Numpad2: "down",
  Numpad4: "left",
  Numpad6: "right",
  Numpad5: "select",
  Numpad0: "back",
  Numpad3: "playpause"
};

function loadScene(url) {
  if (transitioning) return;
  if (scene.src.endsWith(url)) return;

  transitioning = true;
  scene.style.opacity = 0;

  // 🔑 THIS IS THE FIX
  scene.style.pointerEvents =
    url.includes("youtube") ? "auto" : "none";

  setTimeout(() => {
    scene.src = url;
    scene.onload = () => {
      scene.style.opacity = 1;
      transitioning = false;
    };
  }, 400);
}

function sendRemote(cmd) {
  scene.contentWindow?.postMessage({ cmd }, "*");
}

window.addEventListener("keydown", (e) => {
  /* PAGE SWITCHER */
  if (pages[e.code]) {
    e.preventDefault();
    loadScene(pages[e.code]);
    return;
  }

  /* REMOTE CONTROL */
  if (remoteMap[e.code]) {
    e.preventDefault();
    sendRemote(remoteMap[e.code]);
  }
});
