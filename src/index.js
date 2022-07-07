import search from './js/searchFn';
import template from './partials/picture-card';


const button = document.querySelector('.search-btn');
const ul = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const UpBtn = document.querySelector('.to-up');

let currentPage = 0;

button.addEventListener('click', e => {
  e.preventDefault();

  const inputText = document.querySelector('.search-input').value;

  currentPage += 1;

  search(inputText, currentPage).then(res => {
    ul.insertAdjacentHTML('beforeend', template(res.hits));
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
    ul.insertAdjacentHTML('beforeend', template(res.hits));
  });

  UpBtn.classList.remove('is-hiden');
});

UpBtn.addEventListener('click', () => {
  button.scrollIntoView({ block: 'center', behavior: 'smooth' });
});
