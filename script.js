const videoModal = document.getElementById('videoModal');
const messageModal = document.getElementById('messageModal');
const openVideoButton = document.getElementById('openVideo');
const openMessageButton = document.getElementById('openMessage');

let previousFocus = null;

function openModal(modal) {
  previousFocus = document.activeElement;
  // Close the other modal first, just in case.
  [videoModal, messageModal].forEach(item => {
    item.classList.remove('is-open');
    item.setAttribute('aria-hidden', 'true');
  });

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const closeButton = modal.querySelector('.close-button');
  if (closeButton) closeButton.focus();
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');

  if (![videoModal, messageModal].some(item => item.classList.contains('is-open'))) {
    document.body.classList.remove('modal-open');
  }
  if (previousFocus) previousFocus.focus();
}

openVideoButton.addEventListener('click', () => openModal(videoModal));
openMessageButton.addEventListener('click', () => openModal(messageModal));

document.querySelectorAll('[data-close="video"]').forEach(el => {
  el.addEventListener('click', () => closeModal(videoModal));
});
document.querySelectorAll('[data-close="message"]').forEach(el => {
  el.addEventListener('click', () => closeModal(messageModal));
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (videoModal.classList.contains('is-open')) closeModal(videoModal);
    if (messageModal.classList.contains('is-open')) closeModal(messageModal);
  }
});
