import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { createOrder } from './services/api.js';

const commentPattern = /^(?=.{5,}$)(?:[\p{L}]|[\p{N}]|\s|[.,!?;:()'])+$/u;
const backdrop = document.querySelector('.order-backdrop');
const form = document.querySelector('#order-form');
const closeBtn = backdrop?.querySelector('.close-btn');
const submitBtn = form?.querySelector('button[type="submit"]');
const commentInput = form?.querySelector('textarea[name="comment"]');

let dessertId = form?.dataset.dessertId || '';

function lockScroll() {
  const isOpen = backdrop?.classList.contains('is-open');
  document.body.classList.toggle('modal-open', Boolean(isOpen));
}

function setDessertId(id) {
  if (!id || typeof id !== 'string') {
    return;
  }

  dessertId = id.trim();

  if (form) {
    form.dataset.dessertId = dessertId;
  }
}

function openOrderModal(id) {
  setDessertId(id);
  backdrop?.classList.add('is-open');
  lockScroll();
}

function closeOrderModal() {
  backdrop?.classList.remove('is-open');
  lockScroll();
}

function validateComment() {
  if (!commentInput) {
    return;
  }

  const value = commentInput.value.trim();

  if (!value) {
    commentInput.setCustomValidity('');
    return;
  }

  if (commentPattern.test(value)) {
    commentInput.setCustomValidity('');
  } else {
    commentInput.setCustomValidity(
      "Мінімум 5 символів: літери, цифри, пробіли і знаки . , ! ? ; : ( ) '"
    );
  }
}

closeBtn?.addEventListener('click', closeOrderModal);

backdrop?.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeOrderModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && backdrop?.classList.contains('is-open')) {
    closeOrderModal();
  }
});

document.addEventListener('order-modal:open', event => {
  openOrderModal(event.detail?.dessertId || '');
});

document.addEventListener('click', event => {
  const openBtn = event.target.closest('[data-order-open]');

  if (!openBtn) {
    return;
  }

  const id =
    openBtn.dataset.dessertId || openBtn.getAttribute('data-dessert-id') || '';
  openOrderModal(id);
});

commentInput?.addEventListener('input', validateComment);
commentInput?.addEventListener('blur', validateComment);

form?.addEventListener('submit', async event => {
  event.preventDefault();
  validateComment();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!dessertId) {
    iziToast.error({
      title: 'Помилка',
      message: 'Неможливо оформити замовлення: спочатку оберіть десерт.',
      position: 'topRight',
      timeout: 5000,
    });
    return;
  }

  const { name, phone, comment } = form.elements;
  const payload = {
    name: name.value.trim(),
    phone: phone.value.trim(),
    comment: comment.value.trim(),
    dessertId,
  };

  if (submitBtn) {
    submitBtn.disabled = true;
  }

  try {
    const orderData = await createOrder(payload);
    const dessertName =
      orderData?.dessert || orderData?.dessertName || 'десерт';
    const orderNumber =
      orderData?.orderNumber || orderData?.id || orderData?._id || 'невідомий';

    iziToast.success({
      title: 'Успіх',
      message: `Ви замовили ${dessertName}, номер вашого замовлення: ${orderNumber}`,
      position: 'topRight',
      timeout: 4000,
    });

    form.reset();
    closeOrderModal();
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Не вдалося оформити замовлення. Спробуйте ще раз.';

    iziToast.error({
      title: 'Помилка',
      message,
      position: 'topRight',
      timeout: 5000,
    });
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
    }
  }
});

lockScroll();
window.openOrderModal = openOrderModal;
