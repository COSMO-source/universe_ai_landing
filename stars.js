document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let stars = [];
  const numStars = 200;

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    for (let s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function updateStars() {
    for (let s of stars) {
      s.x += s.speedX;
      s.y += s.speedY;

      // Bouncing from edges
      if (s.x < 0 || s.x > canvas.width) s.speedX *= -1;
      if (s.y < 0 || s.y > canvas.height) s.speedY *= -1;
    }
  }

  function animate() {
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
