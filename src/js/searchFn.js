export default function searchRes(inputTxt, page) {
  const keyAPI = '28108593-121c85f8532d16352eac042b7';
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputTxt}&page=${page}&per_page=12&key=${keyAPI}`
  ).then(res => res.json());
}

// ПРИМЕР ЗАПРОСА для поиска изображений "https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ"

// 28108593-121c85f8532d16352eac042b7 личный ключ АРІ
