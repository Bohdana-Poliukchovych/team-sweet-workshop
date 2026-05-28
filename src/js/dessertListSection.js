import { getCategories, getDesserts } from './services/api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { openProductModal } from './dessertModal.js';
import spriteUrl from '../img/sprite.svg?url';

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
  dropdown: document.querySelector('.dessert-category-dropdown'),
  dropdownValue: document.querySelector('.dessert-category-dropdown-value'),
  dropdownList: document.querySelector('.dessert-category-dropdown-list'),
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
  refs.dropdown?.addEventListener('click', toggleCategoryDropdown);
  refs.dropdown?.addEventListener('keydown', onDropdownKeydown);
  refs.dropdownList?.addEventListener('click', onDropdownItemClick);
  document.addEventListener('click', onDocumentClick);

  refs.loadMoreBtn?.addEventListener('click', onLoadMore);

  refs.dessertList?.addEventListener('click', onDessertClick);
}

function toggleCategoryDropdown() {
  if (!refs.dropdown || !refs.dropdownList) {
    return;
  }

  const isOpen = refs.dropdownList.hidden;

  refs.dropdownList.hidden = !isOpen;
  refs.dropdown.classList.toggle('is-open', isOpen);
  refs.dropdown.setAttribute('aria-expanded', String(isOpen));
}

function openCategoryDropdown() {
  if (!refs.dropdown || !refs.dropdownList) {
    return;
  }

  refs.dropdownList.hidden = false;
  refs.dropdown.classList.add('is-open');
  refs.dropdown.setAttribute('aria-expanded', 'true');
}

function closeCategoryDropdown() {
  if (!refs.dropdown || !refs.dropdownList) {
    return;
  }

  refs.dropdownList.hidden = true;
  refs.dropdown.classList.remove('is-open');
  refs.dropdown.setAttribute('aria-expanded', 'false');
}

function onDropdownKeydown(event) {
  if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
    event.preventDefault();
    toggleCategoryDropdown();
  }

  if (event.key === 'Escape') {
    closeCategoryDropdown();
  }
}

function onDocumentClick(event) {
  if (
    !refs.dropdown ||
    !refs.dropdownList ||
    event.target.closest('.dessert-select-wrap')
  ) {
    return;
  }

  closeCategoryDropdown();
}

async function onDropdownItemClick(event) {
  const item = event.target.closest('.dessert-category-dropdown-item');

  if (!item) {
    return;
  }

  const categoryId = item.dataset.value;

  closeCategoryDropdown();

  await selectCategory(categoryId);
}

function selectCategory(categoryId) {
  if (categoryId === state.activeCategory || state.isLoading) {
    return;
  }

  state.activeCategory = categoryId;
  state.page = 1;

  syncCategoryControls();

  return withLoading(async () => {
    try {
      await loadDesserts({ replace: true });
    } catch (error) {
      showError('Не вдалося завантажити десерти цієї категорії.');

      console.error(error);
    }
  });
}

async function onCategoryChange(event) {
  const categoryId = event.target.value;

  await selectCategory(categoryId);
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
  const dropdownItems = [];

  for (const category of state.categories) {
    radios.push(createRadioMarkup(category));
    dropdownItems.push(createDropdownItemMarkup(category));
  }

  refs.radioList.innerHTML = radios.join('');
  refs.dropdownList.innerHTML = dropdownItems.join('');
}

function createDropdownItemMarkup({ _id, name }) {
  return `
    <li
      class="dessert-category-dropdown-item ${isActive(_id) ? 'is-active' : ''}"
      role="option"
      data-value="${escapeHtml(_id)}"
    >
      ${escapeHtml(name)}
    </li>
  `;
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
        <use href="${spriteUrl}#icon-arrow-outward"></use>
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

  if (refs.dropdownValue) {
    const activeCategory = state.categories.find(
      category => category._id === state.activeCategory
    );

    refs.dropdownValue.textContent = activeCategory
      ? activeCategory.name
      : ALL_CATEGORY.name;
  }

  refs.dropdownList
    ?.querySelectorAll('.dessert-category-dropdown-item')
    .forEach(item => {
      item.classList.toggle(
        'is-active',
        item.dataset.value === state.activeCategory
      );
    });
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
