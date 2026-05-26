import { getDessertById } from './services/api.js';
import raterJs from 'rater-js';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { openOrderModal } from './orderModal.js';

const modalOverlay = document.querySelector('#productModalOverlay');

const closeButton = modalOverlay?.querySelector('.CloseButton');
const orderButton = modalOverlay?.querySelector('.OrderButton');

let currentProductId = null;
let originalButtonText = '';
let raterInstance = null;

/**
 *@param {string|number|Object} target
 *@param {HTMLElement} [triggerButton]
 */

export async function openProductModal(target, triggerButton = null) {
  console.clear();
  if (!modalOverlay) return;

  if (typeof target === 'string' || typeof target === 'number') {
    currentProductId = target;

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
    currentProductId = target._id;
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

  if (currentProductId) {
    openOrderModal(currentProductId);
  } else {
    console.warn('ID десерту не знайдено!');
  }
}

function fillModalFields(data) {
  if (!data || !modalOverlay) return;

  modalOverlay.querySelector('.ProductTitle').textContent =
    data.name || 'Десерт';
  modalOverlay.querySelector('.ProductPrice').textContent = data.price
    ? `${data.price} грн`
    : '';

  const ratingContainer = modalOverlay.querySelector('#productRatingContainer');
  if (ratingContainer) {
    ratingContainer.innerHTML = '';

    raterJs({
      starSize: 20,
      rating: data.rate || 0,
      element: ratingContainer,
      readOnly: true,
      starGap: 4,
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
