const messages = [
  "Are you sure?",
  "Really sure?",
  "Are you positive?",
  "Pookie please...",
  "Just think about it!",
  "If you say no, I will be really sad...",
  "I will be very very very sad...",
  "I will be very very very very sad...",
  "Ok fine, I will stop asking...",
  "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
  const noBtn = document.querySelector('.btn-no');
  const yesBtn = document.querySelector('.btn-yes');
  
  if (!noBtn || !yesBtn) return; // Safety check

  // Change text
  noBtn.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
  
  // Grow the Yes button
  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = `${currentSize * 1.5}px`;
  
  // Make the No button move randomly
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  
  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;
  
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;
  
  noBtn.style.position = 'absolute'; // Ensure it can move
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

function handleYesClick() {
  // Hide buttons and title
  document.querySelector('.title').style.display = 'none';
  document.querySelector('.buttons').style.display = 'none';
  
  // Change image
  document.querySelector('.gif-container img').src = "https://media.giphy.com/media/FqHTyEllkHxAY/giphy.gif";
  
  // Show message
  const message = document.querySelector('.success-message');
  message.classList.remove('hidden');
  message.style.display = 'block';
  
  // Trigger confetti
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
  
  // Continuous confetti
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

// Bind events securely
window.onload = () => {
  const noBtn = document.querySelector('.btn-no');
  const yesBtn = document.querySelector('.btn-yes');
  
  if (noBtn) noBtn.addEventListener('click', handleNoClick);
  if (yesBtn) yesBtn.addEventListener('click', handleYesClick);
};
