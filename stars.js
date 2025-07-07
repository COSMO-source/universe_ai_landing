document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const numStars = 200;
  let stars = [];

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.7 + 0.1,
      opacity: Math.random() * 0.5 + 0.5
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      ctx.beginPath();
      ctx.globalAlpha = s.opacity;
      ctx.fillStyle = '#00f7ff'; // Warna bintang neon biru
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f7ff';
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    updateStars();
  }

  function updateStars() {
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
        s.radius = Math.random() * 1.2 + 0.3;
        s.opacity = Math.random() * 0.5 + 0.5;
      }
    }
  }

  function animate() {
    drawStars();
    requestAnimationFrame(animate);
  }

  animate();
});
