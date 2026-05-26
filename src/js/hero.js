const heroBtn = document.querySelector('.hero-btn');

heroBtn?.addEventListener('click', () => {
  const targetSelector = heroBtn.dataset.scrollTo;
  const targetSection = document.querySelector(targetSelector);

  targetSection?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});