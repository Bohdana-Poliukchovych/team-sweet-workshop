import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

if (window.innerWidth >= 768) {
  new Swiper('.about-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 2,
    spaceBetween: 24,
    speed: 800,

    navigation: {
      nextEl: '.about-btn-next',
      prevEl: '.about-btn-prev',
    },

    pagination: {
      el: '.about-pagination',
      clickable: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
  });
}