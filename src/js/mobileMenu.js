const domSelectors = {
  openMobileMenu: document.querySelector('.js-open-mobile-menu'),
  closeMobileMenu: document.querySelector('.js-close-mobile-menu'),
  mobileMenu: document.querySelector('.js-mobile-menu'),
  logoMobileMenu: document.querySelector('.js-logo-mobile-menu'),
  linkMobileMenu: document.querySelectorAll('.js-mobile-menu-link'),
  btnShoppingMobileMenu: document.querySelector('.js-mobile-menu-shopping-btn'),
  mobileMenuBody: document.querySelector('body'),
};
domSelectors.logoMobileMenu.addEventListener('click', closeMenu);
domSelectors.btnShoppingMobileMenu.addEventListener('click', closeMenu);
domSelectors.openMobileMenu.addEventListener('click', toggleMenu);
domSelectors.closeMobileMenu.addEventListener('click', toggleMenu);
document.addEventListener('keydown', toggleMenu);

function toggleMenu(event) {
  if (
    domSelectors.mobileMenu.classList.contains('is-open') &&
    event.key === 'Escape'
  ) {
    domSelectors.mobileMenu.classList.remove('is-open');
    domSelectors.mobileMenuBody.classList.remove('no-scroll');
    return;
  }
  if (event.type === 'click') {
    domSelectors.mobileMenu.classList.toggle('is-open');
    domSelectors.mobileMenuBody.classList.toggle('no-scroll');
  }
}

domSelectors.linkMobileMenu.forEach(link => {
  link.addEventListener('click', closeMenu);
});
function closeMenu() {
  domSelectors.mobileMenu.classList.remove('is-open');
  domSelectors.mobileMenuBody.classList.remove('no-scroll');
}
