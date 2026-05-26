import { getCategories, getDesserts } from './services/api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { openProductModal } from './dessertModal.js';

const PAGE_LIMIT = 8;

const ALL_CATEGORY = {
  _id: '',
  name: 'Всі десерти',
};

const CATEGORY_ORDER = [
  'Всі десерти',
  'Італійські десерти',
  'Гарячі десерти',
  'Заварні тістечка',
  'Класичні торти',
  'Легкі десерти',
  'Незвичайні десерти',
  'Французькі тістечка',
  'Фруктові десерти',
  'Холодні десерти',
  'Шоколадні випічки',
];

const refs = {
  section: document.querySelector('.dessert-list-section'),
  radioList: document.querySelector('[data-category-list]'),
  select: document.querySelector('.dessert-category-select'),
  dessertList: document.querySelector('[data-dessert-list]'),
  loadMoreBtn: document.querySelector('[data-load-more]'),
};

const state = {
  categories: [ALL_CATEGORY],
  activeCategory: '',
  page: 1,
  totalItems: 0,
  isLoading: false,
};

if (refs.section) {
  init();
}

async function init() {
  bindEvents();

  await withLoading(async () => {
    try {
      const categories = await getCategories();

      state.categories = prepareCategories(categories);

      renderCategories();

      await loadDesserts({ replace: true });
    } catch (error) {
      showError('Не вдалося завантажити десерти. Спробуйте оновити сторінку.');

      console.error(error);
    }
  });
}

function bindEvents() {
  refs.radioList?.addEventListener('change', onCategoryChange);
  refs.select?.addEventListener('change', onCategoryChange);

  refs.loadMoreBtn?.addEventListener('click', onLoadMore);

  refs.dessertList?.addEventListener('click', onDessertClick);
}

async function onCategoryChange(event) {
  const categoryId = event.target.value;

  if (categoryId === state.activeCategory || state.isLoading) {
    return;
  }

  state.activeCategory = categoryId;
  state.page = 1;

  syncCategoryControls();

  await withLoading(async () => {
    try {
      await loadDesserts({ replace: true });
    } catch (error) {
      showError('Не вдалося завантажити десерти цієї категорії.');

      console.error(error);
    }
  });
}

async function onLoadMore() {
  if (state.isLoading) {
    return;
  }

  const nextPage = state.page + 1;

  setLoadMoreLoading(true);

  await withLoading(async () => {
    try {
      const previousPage = state.page;

      state.page = nextPage;

      await loadDesserts({ replace: false });

      state.page = nextPage;
    } catch (error) {
      state.page -= 1;

      showError('Не вдалося завантажити наступні десерти.');

      console.error(error);
    }
  });

  setLoadMoreLoading(false);
}

function onDessertClick(event) {
  const button = event.target.closest('.dessert-card-more');

  if (!button) {
    return;
  }

  openProductModal(button.dataset.id);
}

function prepareCategories(categories) {
  const map = new Map(categories.map(category => [category.name, category]));

  const sorted = CATEGORY_ORDER.slice(1)
    .map(name => map.get(name))
    .filter(Boolean);

  const rest = categories.filter(
    category => !CATEGORY_ORDER.includes(category.name)
  );

  return [ALL_CATEGORY, ...sorted, ...rest];
}

function renderCategories() {
  const radios = [];
  const options = [];

  for (const category of state.categories) {
    radios.push(createRadioMarkup(category));

    options.push(createOptionMarkup(category));
  }

  refs.radioList.innerHTML = radios.join('');

  refs.select.innerHTML = options.join('');
}

function createRadioMarkup({ _id, name }) {
  return `
    <label class="dessert-category-label">
      <input
        class="dessert-category-input"
        type="radio"
        name="dessert-category"
        value="${escapeHtml(_id)}"
        ${isActive(_id) ? 'checked' : ''}
      />

      <span class="dessert-category-name">
        ${escapeHtml(name)}
      </span>
    </label>
  `;
}

function createOptionMarkup({ _id, name }) {
  return `
    <option
      value="${escapeHtml(_id)}"
      ${isActive(_id) ? 'selected' : ''}
    >
      ${escapeHtml(name)}
    </option>
  `;
}

function isActive(id) {
  return id === state.activeCategory;
}

async function loadDesserts({ replace }) {
  const data = await getDesserts({
    page: state.page,
    limit: PAGE_LIMIT,

    ...(state.activeCategory && {
      category: state.activeCategory,
    }),
  });

  const desserts = data.desserts ?? [];

  state.totalItems = data.totalItems ?? desserts.length;

  if (replace) {
    clearDesserts();
  }

  refs.dessertList.insertAdjacentHTML(
    'beforeend',
    desserts.map(createDessertCardMarkup).join('')
  );

  toggleLoadMoreButton();

  hideToasts();
}

function createDessertCardMarkup(dessert) {
  const category = dessert.category?.name ?? 'Десерт';

  return `
    <li class="dessert-card">
      <img
        class="dessert-card-img"
        src="${escapeHtml(dessert.image)}"
        alt="${escapeHtml(dessert.name)}"
        loading="lazy"
      />

      <p class="dessert-card-category">
        ${escapeHtml(category)}
      </p>

      <h3 class="dessert-card-title">
        ${escapeHtml(dessert.name)}
      </h3>

      <p class="dessert-card-description">
        ${escapeHtml(dessert.description)}
      </p>

      <div class="dessert-card-bottom">
        <p class="dessert-card-price">
          ${dessert.price} грн
        </p>

        ${createCardButton(dessert._id, dessert.name)}
      </div>
    </li>
  `;
}

function createCardButton(id, name) {
  return `
    <button
      class="dessert-card-more"
      type="button"
      data-id="${id}"
      aria-label="${escapeHtml(name)}"
    >
      <svg
        class="dessert-card-icon"
        width="24"
        height="24"
        aria-hidden="true"
      >
        <use href="./img/sprite.svg#icon-arrow-outward"></use>
      </svg>
    </button>
  `;
}

function clearDesserts() {
  refs.dessertList.innerHTML = '';
}

function toggleLoadMoreButton() {
  const loadedItems = refs.dessertList.children.length;

  const hasMore = loadedItems < state.totalItems;

  refs.loadMoreBtn.hidden = !hasMore;

  refs.loadMoreBtn.disabled = state.isLoading || !hasMore;
}

function syncCategoryControls() {
  const radio = refs.radioList.querySelector(
    `.dessert-category-input[value="${cssEscape(state.activeCategory)}"]`
  );

  if (radio) {
    radio.checked = true;
  }

  refs.select.value = state.activeCategory;
}

function setLoading(isLoading) {
  state.isLoading = isLoading;

  if (!refs.loadMoreBtn.hidden) {
    refs.loadMoreBtn.disabled = isLoading;

    refs.loadMoreBtn.textContent = isLoading
      ? 'Завантаження...'
      : 'Завантажити ще';
  }
}

function setLoadMoreLoading(isLoading) {
  refs.loadMoreBtn.classList.toggle('is-loading', isLoading);

  refs.loadMoreBtn.setAttribute('aria-busy', String(isLoading));
}

async function withLoading(callback) {
  setLoading(true);

  try {
    await callback();
  } finally {
    setLoading(false);
  }
}

function showError(message) {
  iziToast.error({
    title: 'Помилка',
    message,
    position: 'topRight',
  });
}

function hideToasts() {
  iziToast.destroy();
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function cssEscape(value) {
  if (window.CSS?.escape) {
    return CSS.escape(value);
  }

  return String(value).replaceAll('"', '\\"');
}
