export function showHideSlideText(slideImage, slideText) {
  slideImage.addEventListener('click', () => {
    slideText.style.display = slideText.style.display === 'block' ? 'none' : 'block';
  });
}

export function closeModal(modal, closeModalBtn) {
  closeModalBtn.onclick = () => modal.style.display = 'none';
  window.onclick = e => {
    if (e.target === modal) modal.style.display = 'none';
  };
}
