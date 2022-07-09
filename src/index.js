import search from './js/searchFn';
import template from './js/card';
import Notiflix from 'notiflix';

const button = document.querySelector('.search-btn');
const ul = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const UpBtn = document.querySelector('.to-up');

let currentPage = 0;
let totalHits = 0;

button.addEventListener('click', e => {
  e.preventDefault();

  const inputText = document.querySelector('.search-input').value;

  currentPage += 1;

  search(inputText, currentPage).then(res => {
    totalHits += res.hits.length;
    console.log(res);

    if (totalHits >= res.totalHits) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      loadMoreBtn.classList.add('is-hiden');
    }

    if (inputText === '' || inputText === ' ' || inputText === '  ') {
      Notiflix.Notify.failure('Введите запрос !');

      return console.log('err: no text');
    }
    if (inputText.includes('   ') && inputText.length >= 3) {
      Notiflix.Notify.failure('Некоректный ввод, введите текст');

      return console.log('3 пробела подряд');
    }

    template(res);

    if (currentPage > 1) {
      ul.lastElementChild.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });

      UpBtn.classList.remove('is-hiden');
    }

    loadMoreBtn.classList.remove('is-hiden');
  });
});

loadMoreBtn.addEventListener('click', () => {
  const inputText = document.querySelector('.search-input').value;

  currentPage += 1;
  search(inputText, currentPage).then(res => {
    if (totalHits >= res.totalHits) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      loadMoreBtn.classList.add('is-hiden');
    }

    template(res);

    totalHits += res.hits.length;
    console.log(totalHits);
  });

  UpBtn.classList.remove('is-hiden');
});

UpBtn.addEventListener('click', () => {
  button.scrollIntoView({ block: 'center', behavior: 'smooth' });
});
