import search from './js/searchFn';
import template from './js/card';
import Notiflix from 'notiflix';

const button = document.querySelector('.search-btn');
const ul = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const UpBtn = document.querySelector('.to-up');

let currentPage = 0;
let currentTotalHits = 0;
let currentInputText = ' ';

button.addEventListener('click', e => {
  e.preventDefault();
  console.log('клик на кнопку');

  const inputText = document.querySelector('.search-input').value;

  // проверка на пустую строку поиска
  if (inputText === '' || inputText === ' ' || inputText === '  ') {
    Notiflix.Notify.failure('Введите запрос !');

    return console.log('err: no text');
  }
  if (inputText.includes('   ') && inputText.length >= 3) {
    Notiflix.Notify.failure('Некоректный ввод, введите текст');

    return console.log('3+ пробела подряд');
  }
  // конец проверки

  currentPage += 1;

  // проверка на изменение текста
  if (currentInputText !== inputText) {
    console.log(
      `${inputText} => новый, ${currentInputText} => прошлый, это проверка на изминение текста `
    );
    ul.innerHTML = '';
    currentPage = 1;
    currentTotalHits = 0;

    // функция поиска фото
    return search(inputText, currentPage).then(res => {
      let calcHits = (currentTotalHits += res.hits.length);
      console.log('функция поиска старт');

      console.log(res, `=> это принимает функция `);
      console.log(`${res.totalHits} => сколько найдено фото`);
      console.log(calcHits, 'подсчет найденых фото');
      console.log(res.totalHits);
      if (res.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      loadMoreBtn.classList.remove('is-hiden'); //показывает кнопку "загрузить еще"

      currentInputText = inputText; // запоминает значение текущей строки поиска

      if (currentPage > 1) {
        ul.lastElementChild.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }

      if (calcHits >= res.totalHits) {
        Notiflix.Notify.success('Вы загрузили все фото !');
        console.log('end photos :(');
        loadMoreBtn.classList.add('is-hiden');
      }

      return template(res);
    });
  }
  search(inputText, currentPage).then(res => {
    let calcHits = (currentTotalHits += res.hits.length);

    currentPage += 1;

    template(res);

    if (calcHits >= res.totalHits) {
      Notiflix.Notify.success('Вы загрузили все фото !');
      loadMoreBtn.classList.add('is-hiden');
      console.log('end photos :(');
    }

    if (currentPage > 1) {
      ul.lastElementChild.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }

    UpBtn.classList.remove('is-hiden');
  });
});

loadMoreBtn.addEventListener('click', () => {
  const inputText = document.querySelector('.search-input').value;

  currentPage += 1;
  search(inputText, currentPage).then(res => {
    let calcHits = (currentTotalHits += res.hits.length);

    if (calcHits >= res.totalHits) {
      Notiflix.Notify.success('Вы загрузили все фото !');
      console.log('end photos :(');
      loadMoreBtn.classList.add('is-hiden');
    }

    template(res);
  });

  UpBtn.classList.remove('is-hiden');
});

UpBtn.addEventListener('click', () => {
  button.scrollIntoView({ block: 'center', behavior: 'smooth' });
});
