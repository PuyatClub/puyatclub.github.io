// script.js

const startBtn = document.getElementById('startBtn');
const startScreen = document.querySelector('.start-screen');
const landing = document.querySelector('.landing');
const videoIntro = document.querySelector('.video-intro');
const introVideo = document.getElementById('introVideo');
const bgMusic = document.getElementById('bgMusic');

// Create Mute Button
const muteButton = document.createElement('button');
muteButton.textContent = "Mute";
muteButton.className = "mute-button";
document.body.appendChild(muteButton);

let isMuted = false;

muteButton.addEventListener('click', () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  muteButton.textContent = isMuted ? "Unmute" : "Mute";
});

// Start button event
startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  videoIntro.classList.remove('hidden');
  introVideo.play();
});

// When intro video ends, show landing
introVideo.addEventListener('ended', () => {
  videoIntro.classList.add('hidden');
  landing.classList.remove('hidden');
  landing.style.opacity = 1;
  landing.style.visibility = 'visible';
  bgMusic.play();
});

// 3D tilt for desktop with smooth transition
if (window.innerWidth > 768) {
  const wrap = document.querySelector('.camera-wrap');
  const intro = document.querySelector('.start-screen');

  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;

  const maxTilt = 16; // stronger tilt
  const moveZ = 120;  // deeper perspective

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    targetX = x;
    targetY = y;
  });

  function animateCamera() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    const rotateX = currentY * maxTilt;
    const rotateY = currentX * maxTilt;
    const transform = `rotateX(${rotateX}deg) rotateY(${-rotateY}deg) translateZ(${moveZ}px)`;

    if (intro) intro.style.transform = transform;
    if (wrap) wrap.style.transform = transform;

    requestAnimationFrame(animateCamera);
  }

  animateCamera();
}

// Art Lightbox (ensure DOM is ready)
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.art-image').forEach(img => {
    img.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.classList.add('art-lightbox');

      const closeBtn = document.createElement('button');
      closeBtn.textContent = '×';
      closeBtn.classList.add('close-btn');

      const fullImg = document.createElement('img');
      fullImg.src = img.src;
      fullImg.alt = img.alt;

      lightbox.appendChild(fullImg);
      lightbox.appendChild(closeBtn);
      document.body.appendChild(lightbox);

      const closeLightbox = () => {
        lightbox.remove();
        document.removeEventListener('keydown', escListener);
      };

      closeBtn.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      const escListener = (e) => {
        if (e.key === 'Escape') closeLightbox();
      };

      document.addEventListener('keydown', escListener);
    });
  });

  // Floating animation for artwork
  const floatFrames = document.querySelectorAll('.frame');
  floatFrames.forEach(frame => {
    const floatX = (Math.random() - 0.5) * 10;
    const floatY = (Math.random() - 0.5) * 10;
    frame.animate([
      { transform: `translate(${floatX}px, ${floatY}px)` },
      { transform: `translate(${-floatX}px, ${-floatY}px)` },
      { transform: `translate(${floatX}px, ${floatY}px)` }
    ], {
      duration: 10000 + Math.random() * 5000,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    });
  });
});