document.addEventListener("keydown", (e) => {
  const routes = {
    Numpad1: "./page1.html",
    Numpad2: "./page2.html",
    Numpad3: "./page3.html"
  };

  if (routes[e.code]) {
    window.location.href = routes[e.code];
  }
});
