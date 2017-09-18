'use strict';
(function () {


// работа с шаблоном

  var template = document.querySelector('#picture-template').content;
  var picturesContainer = document.querySelector('.pictures');

  window.pictures = document.querySelector('.pictures');

// Функция отрисовки фотографии
  function renderPhoto(array) {
    var photoElement = template.cloneNode(true);
    photoElement.querySelector('img').src = array.url;
    photoElement.querySelector('.picture-likes').textContent = array.likes;
    photoElement.querySelector('.picture-comments').textContent = array.comments.length;
    photoElement.querySelector('.picture').setAttribute('tabindex', '0');
    return photoElement;
  }

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.x.length; i++) {
    fragment.appendChild(renderPhoto(window.x[i]));
  }
  picturesContainer.appendChild(fragment);


  window.photoCollection = document.querySelectorAll('.picture');


})();
