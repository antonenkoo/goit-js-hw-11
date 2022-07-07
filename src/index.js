import search from './js/searchFn';
import Notiflix from 'notiflix';

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
    if (res.hits.length < 1) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    res.hits.forEach(el => {
      ul.insertAdjacentHTML(
        'beforeend',

        `<li class='li-js'>
        <div class='photo-card'>
          <img src=${el.webformatURL} alt='' />
    
          <div class='stats'>
            <p class='stats-item'>
              <i class='material-icons'>thumb_up</i>
              ${el.likes}
            </p>
            <p class='stats-item'>
              <i class='material-icons'>visibility</i>
              ${el.views}
            </p>
            <p class='stats-item'>
              <i class='material-icons'>comment</i>
              ${el.comments}
            </p>
            <p class='stats-item'>
              <i class='material-icons'>cloud_download</i>
              ${el.downloads}
            </p>
          </div>
        </div>
      </li>`
      );
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
});

loadMoreBtn.addEventListener('click', () => {
  const inputText = document.querySelector('.search-input').value;
  currentPage += 1;
  search(inputText, currentPage).then(res => {
    res.hits.forEach(el => {
      ul.insertAdjacentHTML(
        'beforeend',

        `<li class='li-js'>
        <div class='photo-card'>
          <img src=${el.webformatURL} alt='' />
    
          <div class='stats'>
            <p class='stats-item'>
              <i class='material-icons'>thumb_up</i>
              ${el.likes}
            </p>
            <p class='stats-item'>
              <i class='material-icons'>visibility</i>
              ${el.views}
            </p>
            <p class='stats-item'>
              <i class='material-icons'>comment</i>
              ${el.comments}
            </p>
            <p class='stats-item'>
              <i class='material-icons'>cloud_download</i>
              ${el.downloads}
            </p>
          </div>
        </div>
      </li>`
      );
    });
  });

  UpBtn.classList.remove('is-hiden');
});

UpBtn.addEventListener('click', () => {
  button.scrollIntoView({ block: 'center', behavior: 'smooth' });
});
