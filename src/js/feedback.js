import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import raterFunction from 'rater-js';
import iziToast from 'izitoast';

import { getFeedbacks } from './services/api.js';

let currentPage = 1;
let swiper;
const limit = 10;
let isLoading = false;
let isLastPage = false;

const swiperWrapperEl = document.querySelector(
  '.reviews-swiper .swiper-wrapper'
);
initReviewsSection();
async function initReviewsSection() {
  await loadReviews();
  swiper = initSwiper();
  swiper.on('reachEnd', async () => {
    await loadReviews();
  });
}

async function loadReviews() {
  if (isLoading || isLastPage) return;
  isLoading = true;
  try {
    const { feedbacks, total } = await getFeedbacks(limit, currentPage);
    renderMarkup(feedbacks);
    if (swiper) {
      swiper.update();
    }
    const totalPages = Math.ceil(total / limit);
    if (currentPage >= totalPages) {
      isLastPage = true;
      swiper.off('reachend');
    }
    currentPage++;
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Сталася помилка',
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    isLoading = false;
  }
}
function renderMarkup(reviews) {
  if (!swiperWrapperEl) return;
  const markup = reviews
    .map(
      ({ rate, description, author }) => `
    <div class="swiper-slide review-card">
    <div class="raterJS" data-rate="${rate}"></div>
    <p class="review-paragraph">${description}</p>
    <p class="review-author">${author}</p>
    </div> `
    )
    .join('');
  swiperWrapperEl.insertAdjacentHTML('beforeend', markup);
  initRating();
}
function initSwiper() {
  return new Swiper('.reviews-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    speed: 800,
    breakpoints: {
      768: {
        slidesPerView: 'auto',
      },
    },
    spaceBetween: 24,
    navigation: {
      //За макетом пункт 104: Клік по кнопкам вліво/вправо повинен виконувати зсув слайду з відгуком у протилежну сторону.
      nextEl: '.reviews-prev',
      prevEl: '.reviews-next',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    mousewheel: true,
    keyboard: true,
  });
}
function initRating() {
  const ratings = document.querySelectorAll('.raterJS:not(.rater-initialized');
  ratings.forEach(el => {
    raterFunction({
      element: el,
      rating: Number(el.dataset.rate) || 0,
      readOnly: true,
      starSize: 20,
      step: 0.5,
    });
    el.classList.add('rater-initialized');
  });
}
