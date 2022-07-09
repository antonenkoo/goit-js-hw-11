export default function card(res) {
  const ul = document.querySelector('.gallery');
  res.hits.forEach(el => {
    ul.insertAdjacentHTML(
      'beforeend',

      `<li class='li-js'>
            <div class='photo-card'>
              <img src=${el.webformatURL} alt='${el.tags}' />
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
}
