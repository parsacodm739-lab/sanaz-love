function makeHearts() {

  const container = document.querySelector(".hearts");

  const emojis = [
    "💗",
    "💖",
    "💕",
    "💓",
    "🐾"
  ];

  for (let i = 0; i < 15; i++) {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.textContent =
      emojis[Math.floor(Math.random() * emojis.length)];

    heart.style.left =
      Math.random() * 100 + "vw";

    heart.style.animationDuration =
      (3 + Math.random() * 2) + "s";

    heart.style.fontSize =
      (18 + Math.random() * 20) + "px";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5500);
  }
}

setInterval(() => {
  makeHearts();
}, 1800);