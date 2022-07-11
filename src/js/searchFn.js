const axios = require('axios');

export default function searchRes(inputTxt, page) {
  const keyAPI = '28108593-121c85f8532d16352eac042b7';

  return axios
    .get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputTxt}&page=${page}&per_page=20&key=${keyAPI}`
    )
    .then(res => res.data);
}
