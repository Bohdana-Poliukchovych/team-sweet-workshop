import { getCategories, getDesserts } from './services/api.js';
import { openProductModal } from './dessertModal.js';

const PAGE_LIMIT = 8;
const ALL_CATEGORY = '';
const ALL_CATEGORY_NAME = 'Всі десерти';
const CATEGORY_ORDER = [
  ALL_CATEGORY_NAME,
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
  message: document.querySelector('[data-dessert-message]'),
};

const state = {
  categories: [{ _id: ALL_CATEGORY, name: ALL_CATEGORY_NAME }],
  activeCategory: ALL_CATEGORY,
  page: 1,
  totalItems: 0,
  isLoading: false,
};

initDessertList();

async function initDessertList() {
  if (!refs.section) {
    return;
  }

  bindEvents();
  setLoading(true);

  try {
    const categories = await getCategories();
    state.categories = prepareCategories(categories);
    renderCategories();
    await loadDesserts({ replace: true });
  } catch (error) {
    showMessage('Не вдалося завантажити десерти. Спробуйте оновити сторінку.');
    console.error(error);
  } finally {
    setLoading(false);
  }
}

function bindEvents() {
  refs.radioList?.addEventListener('change', onRadioCategoryChange);
  refs.select?.addEventListener('change', onSelectCategoryChange);
  refs.loadMoreBtn?.addEventListener('click', onLoadMore);
}

function prepareCategories(categories) {
  const categoryMap = new Map(
    categories.map(category => [category.name, category])
  );

  const sortedCategories = CATEGORY_ORDER.slice(1)
    .map(name => categoryMap.get(name))
    .filter(Boolean);

  const restCategories = categories.filter(
    category => !CATEGORY_ORDER.includes(category.name)
  );

  return [
    { _id: ALL_CATEGORY, name: ALL_CATEGORY_NAME },
    ...sortedCategories,
    ...restCategories,
  ];
}

function renderCategories() {
  refs.radioList.innerHTML = state.categories
    .map(category => createRadioMarkup(category))
    .join('');

  refs.select.innerHTML = state.categories
    .map(category => createOptionMarkup(category))
    .join('');
}

function createRadioMarkup({ _id, name }) {
  const checked = _id === state.activeCategory ? 'checked' : '';

  return `
    <label class="dessert-category-label">
      <input
        class="dessert-category-input"
        type="radio"
        name="dessert-category"
        value="${escapeAttr(_id)}"
        ${checked}
      />
      <span class="dessert-category-name">${escapeHtml(name)}</span>
    </label>
  `;
}

function createOptionMarkup({ _id, name }) {
  const selected = _id === state.activeCategory ? 'selected' : '';

  return `<option value="${escapeAttr(_id)}" ${selected}>${escapeHtml(
    name
  )}</option>`;
}

async function onRadioCategoryChange(event) {
  if (!event.target.classList.contains('dessert-category-input')) {
    return;
  }

  await changeCategory(event.target.value);
}

async function onSelectCategoryChange(event) {
  await changeCategory(event.target.value);
}

async function changeCategory(categoryId) {
  if (categoryId === state.activeCategory || state.isLoading) {
    return;
  }

  state.activeCategory = categoryId;
  state.page = 1;
  syncCategoryControls();
  setLoading(true);

  try {
    await loadDesserts({ replace: true });
  } catch (error) {
    showMessage('Не вдалося завантажити десерти цієї категорії.');
    console.error(error);
  } finally {
    setLoading(false);
  }
}

function syncCategoryControls() {
  const activeRadio = refs.radioList.querySelector(
    `.dessert-category-input[value="${cssEscape(state.activeCategory)}"]`
  );

  if (activeRadio) {
    activeRadio.checked = true;
  }

  refs.select.value = state.activeCategory;
}

async function onLoadMore() {
  if (state.isLoading) {
    return;
  }

  state.page += 1;
  setLoading(true);
  setLoadMoreLoading(true);

  try {
    await loadDesserts({ replace: false });
  } catch (error) {
    state.page -= 1;
    showMessage('Не вдалося завантажити наступні десерти.');
    console.error(error);
  } finally {
    setLoadMoreLoading(false);
    setLoading(false);
  }
}

async function loadDesserts({ replace }) {
  const params = {
    page: state.page,
    limit: PAGE_LIMIT,
  };

  if (state.activeCategory) {
    params.category = state.activeCategory;
  }

  const data = await getDesserts(params);
  const desserts = data.desserts || [];
  state.totalItems = data.totalItems || desserts.length;

  if (replace) {
    refs.dessertList.innerHTML = '';
  }

  refs.dessertList.insertAdjacentHTML(
    'beforeend',
    desserts.map(createDessertCardMarkup).join('')
  );

  toggleLoadMoreButton();
  hideMessage();
}

function createDessertCardMarkup(dessert) {
  const categoryName = dessert.category?.name || 'Десерт';

  return `
    <li class="dessert-card">
      <img
        class="dessert-card-img"
        src="${escapeAttr(dessert.image)}"
        alt="${escapeAttr(dessert.name)}"
        loading="lazy"
      />
      <p class="dessert-card-category">${escapeHtml(categoryName)}</p>
      <h3 class="dessert-card-title">${escapeHtml(dessert.name)}</h3>
      <p class="dessert-card-description">${escapeHtml(dessert.description)}</p>
      <div class="dessert-card-bottom">
        <p class="dessert-card-price">${escapeHtml(String(dessert.price))} грн</p>
        <button
          class="dessert-card-more"
          type="button"
          aria-label="${escapeAttr(dessert.name)}"
        >
          <svg class="dessert-card-icon" aria-hidden="true">
            <use href="./img/sprite.svg#icon-arrow_outward"></use>
          </svg>
        </button>
      </div>
    </li>
  `;
}

function toggleLoadMoreButton() {
  const loadedItems = refs.dessertList.children.length;
  const hasMore = loadedItems < state.totalItems;

  refs.loadMoreBtn.hidden = !hasMore;
  refs.loadMoreBtn.disabled = state.isLoading || !hasMore;
}

function setLoading(isLoading) {
  state.isLoading = isLoading;

  if (refs.loadMoreBtn) {
    refs.loadMoreBtn.disabled = isLoading;
    refs.loadMoreBtn.textContent = isLoading
      ? 'Завантаження...'
      : 'Завантажити ще';
  }
}

function setLoadMoreLoading(isLoading) {
  refs.loadMoreBtn?.classList.toggle('is-loading', isLoading);
  refs.loadMoreBtn?.setAttribute('aria-busy', String(isLoading));
}

function showMessage(text) {
  refs.message.textContent = text;
  refs.message.hidden = false;
}

function hideMessage() {
  refs.message.textContent = '';
  refs.message.hidden = true;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttr(value = '') {
  return escapeHtml(value);
}

function cssEscape(value) {
  if (window.CSS && CSS.escape) {
    return CSS.escape(value);
  }

  return String(value).replaceAll('"', '\\"');
}
