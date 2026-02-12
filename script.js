const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const mainText = document.getElementById('mainText');
const extraMessage = document.getElementById('extraMessage');
const music = document.getElementById('music');

let flowerInterval;
let intensity = 1;
let musicPlayed = false; // track if chorus already triggered
let noSize = 1; // scale factor for shrinking No button

// Ensure background music plays on load
window.addEventListener('load', () => {
  music.play().catch(() => {
    console.log("Autoplay blocked, will start on user interaction.");
  });
});

// Gentle background flowers always
flowerInterval = setInterval(() => {
  spawnFlower();
}, 1500);

function spawnFlower() {
  let flower = document.createElement('img');
  flower.src = "assets/images/flower.png";
  flower.className = 'flower';
  flower.style.left = Math.random() * window.innerWidth + 'px';

  // Random animation duration
  flower.style.animationDuration = (4 + Math.random() * 3) + 's';

  // Random initial rotation
  const startRotation = Math.floor(Math.random() * 360);
  flower.style.transform = `rotate(${startRotation}deg)`;

  document.body.appendChild(flower);
  setTimeout(() => flower.remove(), 7000);
}

yesBtn.addEventListener('click', () => {
  // Play chorus only once
  if (!musicPlayed) {
    music.currentTime = 125; // jump to chorus (adjust seconds to match your track)
    music.play();
    musicPlayed = true;
  }

  // Change main text to your Valentine’s message
  mainText.textContent = "OKAY Hehehehe Though we're gonna celebrate February 19, 20 for our valentines day kay we have work and all, I love you!";

  // Remove No button
  noBtn.remove();

  // Add extra message below
  extraMessage.textContent = "You want more petals falling? HEHE";

  // Intensify flower rain each time Yes is pressed
  intensity++;
  for (let i = 0; i < intensity * 10; i++) {
    spawnFlower();
  }
});

// No button playful movement + shrinking
noBtn.addEventListener('mouseover', () => {
  const maxOffset = 400; // move much farther away
  const offsetX = (Math.random() - 0.5) * maxOffset;
  const offsetY = (Math.random() - 0.5) * maxOffset;

  noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${noSize})`;

  // Shrink No button slightly each time
  noSize -= 0.1;
  if (noSize < 0.2) noSize = 0.2; // minimum size so it doesn’t vanish completely

  // Grow Yes button slightly
  yesBtn.style.fontSize = (parseInt(window.getComputedStyle(yesBtn).fontSize) + 2) + 'px';
});
