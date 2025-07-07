document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const numStars = 200;
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2,
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

      // Animasi gerakan
      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(drawStars);
  }

  drawStars();
});
