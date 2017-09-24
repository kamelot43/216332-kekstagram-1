'use strict';
(function () {
  window.galleryOverlay = document.querySelector('.gallery-overlay');

  window.preview = {

    // Отрисовка увеличенной фотографии
    pasteNewData: function (array) {
      window.galleryOverlay.querySelector('img').src = array.url;
      window.galleryOverlay.querySelector('.likes-count').textContent = array.likes;
      window.galleryOverlay.querySelector('.comments-count').textContent = array.comments.length;
    },

    // функция отрисовки текущей фотографии
    renderCurrentPhoto: function (target, array) {
      var newArray = Array.prototype.slice.call(window.photoCollection).indexOf(target.parentNode);
      window.preview.pasteNewData(array[newArray]);
    }


  };


})();
