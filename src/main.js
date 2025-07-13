import * as THREE from 'three';

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) {
    console.error("❌ Element #starfield tidak ditemukan.");
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;

  const geometry = new THREE.BufferGeometry();
  const count = 20000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 10;
    const spinAngle = radius * 1.5;
    const branchAngle = (i % 5) / 5 * Math.PI * 2;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
    positions[i3 + 1] = (Math.random() - 0.5) * 2;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

    colors[i3] = radius / 10;
    colors[i3 + 1] = 0.1;
    colors[i3 + 2] = 1.0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });

  const galaxy = new THREE.Points(geometry, material);
  scene.add(galaxy);

  function animate() {
    requestAnimationFrame(animate);
    galaxy.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  console.log("✨ Galaxy + Canvas loaded successfully");
});
