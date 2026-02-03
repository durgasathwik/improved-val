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

const CARD_INSET = 12;
const VIEWPORT_INSET = 16; // keep button on visible screen (never below fold)

function moveNoButton() {
  const wrapper = document.querySelector('.no-button-wrapper');
  const container = document.querySelector('.container');
  if (!wrapper || !container) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const containerRect = container.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();
  const w = Math.max(wrapperRect.width, 100);
  const h = Math.max(wrapperRect.height, 50);

  // Stay inside card AND inside visible viewport so it never goes below the screen
  const minLeft = Math.max(containerRect.left + CARD_INSET, VIEWPORT_INSET);
  const maxLeft = Math.min(containerRect.right - w - CARD_INSET, vw - w - VIEWPORT_INSET);
  const minTop = Math.max(containerRect.top + CARD_INSET, VIEWPORT_INSET);
  const maxTop = Math.min(containerRect.bottom - h - CARD_INSET, vh - h - VIEWPORT_INSET);

  let left = minLeft;
  let top = minTop;
  if (maxLeft > minLeft) left = minLeft + Math.random() * (maxLeft - minLeft);
  if (maxTop > minTop) top = minTop + Math.random() * (maxTop - minTop);

  left = Math.max(minLeft, Math.min(maxLeft, left));
  top = Math.max(minTop, Math.min(maxTop, top));
  if (Number.isNaN(left)) left = minLeft;
  if (Number.isNaN(top)) top = minTop;

  wrapper.style.position = 'fixed';
  wrapper.style.zIndex = '1000';
  wrapper.style.visibility = 'visible';
  wrapper.style.opacity = '1';
  wrapper.style.left = `${left}px`;
  wrapper.style.top = `${top}px`;
}

function showMessageAndMove() {
  const noBtn = document.querySelector('.btn-no');
  const yesBtn = document.querySelector('.btn-yes');
  const messageEl = document.querySelector('.no-click-message');

  if (!noBtn || !messageEl) return;

  // Show message when user hovers or clicks (both trigger this)
  messageEl.textContent = messages[messageIndex];
  messageEl.classList.remove('hidden');
  messageIndex = (messageIndex + 1) % messages.length;

  if (yesBtn) {
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.5}px`;
  }

  moveNoButton();
}

function handleNoHover() {
  // On hover: show message and move (can't click on first attempt)
  showMessageAndMove();
}

function handleNoClick(e) {
  e.preventDefault();
  showMessageAndMove();
}

function handleYesClick() {
  // Hide buttons and title
  document.querySelector('.title').style.display = 'none';
  document.querySelector('.buttons').style.display = 'none';
  
  // Change image to Snoopy dancing (celebration!)
  document.querySelector('.gif-container img').src = "https://media.giphy.com/media/J93sVmfYBtsRi/giphy.gif";
  
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

  if (noBtn) {
    noBtn.addEventListener('mouseenter', handleNoHover);
    noBtn.addEventListener('click', handleNoClick);
  }
  if (yesBtn) yesBtn.addEventListener('click', handleYesClick);
};
