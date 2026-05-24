import Swiper from 'swiper';
import 'swiper/css';
import { Raty } from 'raty-js';

import { getFeedbacks } from './services/api.js';
const swiperWrapperEl = document.querySelector('swiper-wrapper');
document.addEventListener('DOMContentLoaded', initReviewsSection);
async function initReviewsSection() {
  try {
    const feedbacks = await getFeedbacks();
    console.log(1);
    filteredFeedbacks = feedbacks.slice(0, 10);
    renderMarkup(filteredFeedbacks);
    initSwiper();
  } catch (error) {
    console.log(error);
  }
}
function renderMarkup(reviews) {
  const markup = reviews
    .map(
      ({ rate, description, author }) => `
    <div class="swiper-slide review-card">
    <div data-raty data-score="${rate}"></div>
    <p class="review-paragraph">${description}</p>
    <p class="review-author">${author}</p>
    </div> `
    )
    .join('');
  swiperWrapperEl.innerHTML = markup;
}
function initSwiper() {
  const swiper = new Swiper('.reviews-swiper', {
    cssMode: true,
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: '.swiper-button-prev',
      prevEl: '.swiper-button-next',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    mousewheel: true,
    keyboard: true,
  });
}
