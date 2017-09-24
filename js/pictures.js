'use strict';
(function () {


// работа с шаблоном

  var template = document.querySelector('#picture-template').content;
  window.picturesContainer = document.querySelector('.pictures');


  window.pictures = {

// Функция отрисовки фотографии
    renderPhoto: function (array) {
      var photoElement = template.cloneNode(true);
      photoElement.querySelector('img').src = array.url;
      photoElement.querySelector('.picture-likes').textContent = array.likes;
      photoElement.querySelector('.picture-comments').textContent = array.comments.length;
      photoElement.querySelector('.picture').setAttribute('tabindex', '0');
      return photoElement;
    },

    renderFragment: function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(window.pictures.renderPhoto(array[i]));
      }
      window.picturesContainer.appendChild(fragment);
      window.photoCollection = document.querySelectorAll('.picture');
    },

    deletePhoto: function () {
      Array.prototype.forEach.call(window.picturesContainer.querySelectorAll('.picture'), function (element) {
        window.picturesContainer.removeChild(element);
      });
    },
  };


})();
