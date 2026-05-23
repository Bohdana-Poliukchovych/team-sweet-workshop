import { getDessertById } from './services/api.js';
import Raty from 'raty-js';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const modalOverlay = document.querySelector('#productModalOverlay');

const closeButton = modalOverlay?.querySelector('.CloseButton');
const orderButton = modalOverlay?.querySelector('.OrderButton');

/**
 *@param {string|number|Object} target
 *@param {HTMLElement} [triggerButton]
 */

export async function openProductModal(target, triggerButton = null) {
  console.clear();
  if (!modalOverlay) return;

  if (typeof target === 'string' || typeof target === 'number') {
    let originalButtonText = '';

    if (triggerButton) {
      originalButtonText = triggerButton.textContent;
      triggerButton.textContent = 'Завантаження...';
      triggerButton.disabled = true;
    }

    try {
      const data = await getDessertById(target);
      fillModalFields(data);
    } catch (error) {
      console.error('Помилка завантаження:', error);

      iziToast.error({
        title: 'Упс!',
        message: 'Не вдалося завантажити дані. Спробуйте пізніше.',
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

  console.log('Full dessert object:', data);

  modalOverlay.querySelector('.ProductTitle').textContent =
    data.name || 'Десерт';
  modalOverlay.querySelector('.ProductPrice').textContent = data.price
    ? `${data.price} грн`
    : '';

  const ratingContainer = modalOverlay.querySelector('#productRatingContainer');
  if (ratingContainer) {
    ratingContainer.innerHTML = '';

    // Ініціалізація Raty
    // Зверни увагу: Raty часто потребує передачі елемента, а не просто виклику
    const ratyInstance = new Raty(ratingContainer, {
      score: data.rating || 0,
      readOnly: true,
      starType: 'img',
      // Якщо зірки не з'являються, можливо, потрібно вказати шлях до папки 'images'
      path: '../node_modules/raty-js/src/images',
    });
  }
  const imgElement = modalOverlay.querySelector('.ProductImage');
  if (imgElement) {
    imgElement.src = data.image || 'https://placehold.co/450x450?text=No+Image';
    imgElement.alt = data.name || 'Десерт';
  }

  modalOverlay.querySelector('.ProductDescription').textContent =
    data.description || '';

  const ingredientsBlock = modalOverlay.querySelector('.ProductIngredients');
  if (ingredientsBlock) {
    ingredientsBlock.innerHTML = `<strong>Склад:</strong> ${data.composition || 'Інформація відсутня'}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const testBtn = document.querySelector('#test-modal-btn');
  if (testBtn) {
    testBtn.addEventListener('click', () => {
      openProductModal('6852a9fcb459460cb6b47728');
    });
  }
});
