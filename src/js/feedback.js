import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import { getFeedbacks } from './services/api.js';
const swiperWrapperEl = document.querySelector('.swiper-wrapper');
// document.addEventListener('DOMContentLoaded', initReviewsSection);
initReviewsSection();
async function initReviewsSection() {
  try {
    const { feedbacks } = await getFeedbacks();
    renderMarkup(feedbacks.slice(0, 10));
    initSwiper();
  } catch (error) {
    console.log(error);
  }
}
function renderMarkup(reviews) {
  if (!swiperWrapperEl) return;
  const markup = reviews
    .map(
      ({ rate, description, author }) => `
    <div class="swiper-slide review-card">
    <div data-score="${rate}"></div>
    <p class="review-paragraph">${description}</p>
    <p class="review-author">${author}</p>
    </div> `
    )
    .join('');
  swiperWrapperEl.innerHTML = markup;
}
function initSwiper() {
  const swiper = new Swiper('.reviews-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
    spaceBetween: 24,
    navigation: {
      nextEl: '.reviews-prev',
      prevEl: '.reviews-next',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    mousewheel: true,
    keyboard: true,
  });
}
