import './sass/main.scss';
import ApiService from './apiService';
import photos from './templates/photos.hbs';
import LoadMoreBtn from './loadmore.js';
import { Notify } from 'notiflix';

const refs = {
  searchform: document.querySelector('.search'),
  photosCard: document.querySelector('.gallery'),
};
const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchform.addEventListener('submit', onSearch);
//refs.loadBut.addEventListener('click', onLoad)
loadMoreBtn.refs.button.addEventListener('click', btnDisEn);

async function onSearch(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.query.value;

  const good = await apiService.fetchArticles();
  const totalHits = good.data.totalHits;
  const hitsLength = good.data.hits.length;

  if (totalHits < 1) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else if (apiService.query === '') {
    Notify.warning('Enter your serch query, please :)');
    return;
  } else {
    Notify.success(`We found ${totalHits} images.`);
    clearPhotoCard(); // очищает стр после каждого нового запроса
    loadMoreBtn.disable();
  }

  // loadMoreBtn.show() // показывается текст загрузки кнопки
  apiService.resetPage();
  apiService.fetchArticles().then(renderPosts);
  loadMoreBtn.show();
  loadMoreBtn.enable();

  if (hitsLength < 40) {
    loadMoreBtn.hide();
    Notify.info("We're sorry, but you've reached the end of search results.");
  }

  clearPhotoCard(); // очищает стр после каждого нового запроса

  //btnDisEn()
}

async function btnDisEn() {
  if (apiService.page !== 2) {
    apiService.minusPage();
  }

  //loadMoreBtn.disable() //кнопка неактивна
  apiService.fetchArticles().then(renderPosts);

  const good = await apiService.fetchArticles();
  const hitsLength = good.data.hits.length;
  if (hitsLength < 40) {
    loadMoreBtn.hide();
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  // .then(f => {
  //     addPhotos(f)
  //     loadMoreBtn.enable() // после результата запроса кнопка снова активна
  //     Notify.success(Everything works!)
  // }).catch(() => {
  //     Notify.failure(We're sorry, but you've reached the end of search results.)
  // })
}

function renderPosts(i) {
  const markup = i.data.hits
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" />
    <div class="stats">
        <p class="stats-item">
            <i class="material-icons">thumb_up</i>
            ${likes}
        </p>
        <p class="stats-item">
            <i class="material-icons">visibility</i>
            ${views}
        </p>
        <p class="stats-item">
            <i class="material-icons">comment</i>
            ${comments}
        </p>
        <p class="stats-item">
            <i class="material-icons">cloud_download</i>
            ${downloads}
        </p>
    </div>
</div>`;
    })
    .join('');
  refs.photosCard.insertAdjacentHTML('beforeend', markup);

  loadMoreBtn.show();
}

// function addPhotos(hits) {
//     refs.photosCard.insertAdjacentHTML('beforeend', photos(hits))
// }

function clearPhotoCard() {
  refs.photosCard.innerHTML = ''; // для очищения результата запроса на стр
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//

export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Load more';
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Loading...';
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
