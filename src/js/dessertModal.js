import { getDessertById } from './services/api.js';
import Raty from 'raty-js';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'; // Імпортуємо стилі для сповіщень

// 1. СЮДИ МИ ДОДАМО ІМПОРТ БІБЛІОТЕКИ ЗІРОЧОК (коли її встановлять)
// import StarRating from 'star-rating.js';
// import 'star-rating.js/dist/star-rating.css'; // Імпорт її стилів

// Знаходимо оверлей модалки
const modalOverlay = document.querySelector('#productModalOverlay');

// Кнопки знаходимо всередині оверлею (якщо він існує)
const closeButton = modalOverlay?.querySelector('.CloseButton');
const orderButton = modalOverlay?.querySelector('.OrderButton');

// ==========================================================================
// ОСНОВНІ ФУНКЦІЇ МОДАЛКИ (Експорт для команди)
// ==========================================================================

/**
 * Функція ВІДКРИТТЯ модального вікна
 * @param {string|number|Object} target - ID десерту або готовий об'єкт даних
 * @param {HTMLElement} [triggerButton] - Кнопка, на яку клікнули (для лоадера)
 */
export async function openProductModal(target, triggerButton = null) {
  if (!modalOverlay) return;

  // 1. Обробимо варіант, якщо передали ID (потрібен запит до сервера)
  if (typeof target === 'string' || typeof target === 'number') {
    let originalButtonText = '';

    // Вмикаємо ЛОАДЕР на кнопці, яка викликала модалку
    if (triggerButton) {
      originalButtonText = triggerButton.textContent;
      triggerButton.textContent = 'Завантаження...';
      triggerButton.disabled = true; // Блокуємо кнопку від повторних кліків
    }

    try {
      const response = await axios.get(`/desserts/${target}`);
      fillModalFields(response.data);
    } catch (error) {
      console.error('Помилка Axios:', error);

      // Показуємо ОПОВІЩЕННЯ ПРО ПОМИЛКУ для користувача через iziToast
      iziToast.error({
        title: 'Упс!',
        message: 'Не вдалося завантажити дані про десерт. Спробуйте пізніше.',
        position: 'topRight',
        timeout: 4000,
      });

      return; // Виходимо з функції, модалку НЕ відкриваємо
    } finally {
      // Вимикаємо ЛОАДЕР (повертаємо кнопці початковий стан у будь-якому випадку)
      if (triggerButton) {
        triggerButton.textContent = originalButtonText;
        triggerButton.disabled = false;
      }
    }
  }
  // 2. Якщо передали готовий тестовий об'єкт
  else if (typeof target === 'object' && target !== null) {
    fillModalFields(target);
  } else {
    return;
  }

  // ПОКАЗУЄМО МОДАЛКУ ТА БЛОКУЄМО СКРОЛ
  modalOverlay.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';

  // ПІДКЛЮЧАЄМО ВСІ СЛУХАЧІ ПОДІЙ (Вимога ментора щодо чистки пам'яті)
  addModalListeners();
}

/**
 * Функція ЗАКРИТТЯ модального вікна
 */
export function closeProductModal() {
  if (!modalOverlay) return;

  // ХОВАЄМО МОДАЛКУ ТА ПОВЕРТАЄМО СКРОЛ
  modalOverlay.classList.add('is-hidden');
  document.body.style.overflow = '';

  // ПОВНІСТЮ ВИДАЛЯЄМО ВСІ СЛУХАЧІ ПОДІЙ
  removeModalListeners();
}

// ==========================================================================
// КЕРУВАННЯ СЛУХАЧАМИ ПОДІЙ (Event Listeners)
// ==========================================================================

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

// ==========================================================================
// ДОПОМІЖНІ ХЕНДЛЕРИ ТА НАПОВНЕННЯ
// ==========================================================================

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
  // Виклик модалки оформлення замовлення твого колеги:
  // openOrderModal();
  console.log('Відкриваємо форму замовлення колеги...');
}

/**
 * Заповнення полів HTML контентом
 */
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
    // Очищаємо старі зірочки перед новим рендером
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

// ==========================================================================
// ТЕСТУВАЛЬНИЙ КОД ДЛЯ РОЗРОБКИ (Vite DEV)
// ==========================================================================
if (import.meta.env.DEV) {
  const testDesert = {
    name: 'Шоколадний фондан',
    price: 120,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600',
    description: 'Класичний десерт з рідким шоколадним центром.',
    ingredients: 'Шоколад, яйця, цукор, масло, борошно.',
  };

  setTimeout(() => {
    console.log('DEV MODE: Симуляція відкриття модалки...');
    openProductModal(testDesert);
  }, 1500);
}
