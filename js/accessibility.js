/**
 * Kanachur Islamic Education Trust (R) - Accessibility Toolbar Helper
 * Controls font scaling and high contrast modes for WCAG AA compliance.
 */

document.addEventListener('DOMContentLoaded', () => {
  const fontIncreaseBtn = document.getElementById('fontIncrease');
  const fontDecreaseBtn = document.getElementById('fontDecrease');
  const fontResetBtn = document.getElementById('fontReset');
  const highContrastBtn = document.getElementById('toggleContrast');

  if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener('click', () => {
      document.body.classList.add('large-font');
    });
  }

  if (fontDecreaseBtn) {
    fontDecreaseBtn.addEventListener('click', () => {
      document.body.classList.remove('large-font');
    });
  }

  if (fontResetBtn) {
    fontResetBtn.addEventListener('click', () => {
      document.body.classList.remove('large-font');
    });
  }

  if (highContrastBtn) {
    highContrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHighContrast = document.body.classList.contains('high-contrast');
      highContrastBtn.setAttribute('aria-pressed', isHighContrast);
    });
  }
});
