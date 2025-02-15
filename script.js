document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
      // Toggle Nav
      nav.classList.toggle('nav-active');

      // Animate Links
      navLinks.forEach((link, index) => {
          if (link.style.animation) {
              link.style.animation = '';
          } else {
              link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
          }
      });

      // Burger Animation
      burger.classList.toggle('toggle');
  });

  // 3D Animation
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('hero-animation').appendChild(renderer.domElement);

  const geometry = new THREE.TorusGeometry(14, 3, 16, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0x9EFF00, wireframe: true });
  const torus = new THREE.Mesh(geometry, material);

  scene.add(torus);

  camera.position.z = 30;

  function animate() {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;

      renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
})

