import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
`;

setupCounter(document.querySelector('#counter'))

// ⬇️ Tempelkan kode ini di bawah
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) {
    console.error("❌ Element #starfield tidak ditemukan.");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("❌ Gagal mendapatkan canvas context.");
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let stars = [];
  const numStars = 150;

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < stars.length; i++) {
      let s = stars[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    updateStars();
  }

  function updateStars() {
    for (let i = 0; i < stars.length; i++) {
      let s = stars[i];
      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    }
  }

  function animate() {
    drawStars();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  console.log("✨ stars.js loaded successfully");
});
