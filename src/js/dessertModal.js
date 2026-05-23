import { getDessertById } from './services/api.js';
import Raty from 'raty-js';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// 1. СЮДИ МИ ДОДАМО ІМПОРТ БІБЛІОТЕКИ ЗІРОЧОК (коли її встановлять)
// import StarRating from 'star-rating.js';
// import 'star-rating.js/dist/star-rating.css'; // Імпорт її стилів

const modalOverlay = document.querySelector('#productModalOverlay');

const closeButton = modalOverlay?.querySelector('.CloseButton');
const orderButton = modalOverlay?.querySelector('.OrderButton');

/**
 *@param {string|number|Object} target
 *@param {HTMLElement} [triggerButton]
 */

export async function openProductModal(target, triggerButton = null) {
  if (!modalOverlay) return;

  if (typeof target === 'string' || typeof target === 'number') {
    let originalButtonText = '';

    if (triggerButton) {
      originalButtonText = triggerButton.textContent;
      triggerButton.textContent = 'Завантаження...';
      triggerButton.disabled = true;
    }

    try {
      const response = await axios.get(`/desserts/${target}`);
      fillModalFields(response.data);
    } catch (error) {
      console.error('Помилка Axios:', error);

      iziToast.error({
        title: 'Упс!',
        message: 'Не вдалося завантажити дані про десерт. Спробуйте пізніше.',
        position: 'topRight',
        timeout: 4000,
      });

      return;
    } finally {
      if (triggerButton) {
        triggerButton.textContent = originalButtonText;
        triggerButton.disabled = false;
      }
    }
  } else if (typeof target === 'object' && target !== null) {
    fillModalFields(target);
  } else {
    return;
  }

  modalOverlay.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';

  addModalListeners();
}

export function closeProductModal() {
  if (!modalOverlay) return;

  modalOverlay.classList.add('is-hidden');
  document.body.style.overflow = '';

  removeModalListeners();
}

function addModalListeners() {
  if (closeButton) closeButton.addEventListener('click', closeProductModal);
  modalOverlay.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeyPress);
  if (orderButton) orderButton.addEventListener('click', onOrderSubmit);
}

function removeModalListeners() {
  if (closeButton) closeButton.removeEventListener('click', closeProductModal);
  modalOverlay.removeEventListener('click', onBackdropClick);
  window.removeEventListener('keydown', onEscKeyPress);
  if (orderButton) orderButton.removeEventListener('click', onOrderSubmit);
}

function onBackdropClick(event) {
  if (event.target === modalOverlay) {
    closeProductModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeProductModal();
  }
}

function onOrderSubmit() {
  closeProductModal();
  console.log('Відкриваємо форму замовлення колеги...');
}

function fillModalFields(data) {
  if (!data || !modalOverlay) return;

  modalOverlay.querySelector('.ProductTitle').textContent =
    data.name || 'Десерт';
  modalOverlay.querySelector('.ProductPrice').textContent = data.price
    ? `${data.price} грн`
    : '';

  // ==========================================================================
  // 2. ОДИН РЯДОК ДЛЯ ЗІРОЧОК ТУТ:
  // ==========================================================================
  const ratingContainer = modalOverlay.querySelector('#productRatingContainer');
  if (ratingContainer) {
    ratingContainer.innerHTML = '';

    // Викликаємо бібліотеку (код підлаштовується під ту, яку ви оберете):
    // new StarRating(ratingContainer, { value: data.rating || 5, readOnly: true });

    console.log(`Рейтинг ${data.rating} успішно передано в бібліотеку зірочок`);
  }

  const imgElement = modalOverlay.querySelector('.ProductImage');
  if (imgElement) {
    imgElement.src = data.image || 'https://placehold.co/450x450?text=No+Image';
    imgElement.alt = data.name || 'Десерт';
  }

  modalOverlay.querySelector('.ProductDescription').textContent =
    data.description || '';

  const ingredientsBlock = modalOverlay.querySelector(
    '.ProductIngredients strong'
  );
  if (ingredientsBlock && ingredientsBlock.nextSibling) {
    ingredientsBlock.nextSibling.textContent = ` ${data.ingredients || ''}`;
  }
}
