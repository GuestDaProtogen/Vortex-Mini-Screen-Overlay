const scene = document.getElementById("scene");

const routes = {
  Numpad1: "./page1.html",
  Numpad2: "./page2.html",
  Numpad3: "./page3.html"
};

let transitioning = false;

function loadScene(url) {
  if (transitioning) return;
  if (scene.src.endsWith(url)) return;

  transitioning = true;
  scene.style.opacity = 0;

  setTimeout(() => {
    scene.src = url;

    scene.onload = () => {
      scene.style.opacity = 1;
      transitioning = false;
    };
  }, 400);
}

window.addEventListener("keydown", (e) => {
  if (routes[e.code]) {
    e.preventDefault();
    loadScene(routes[e.code]);
  }
});
