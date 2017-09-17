'use strict';
(function () {

  window.preview = {

    // Отрисовка увеличенной фотографии
    pasteNewData: function (array) {
      galleryOverlay.querySelector('img').src = array.url;
      galleryOverlay.querySelector('.likes-count').textContent = array.likes;
      galleryOverlay.querySelector('.comments-count').textContent = array.comments.length;
    },

    // функция отрисовки текущей фотографии
    renderCurrentPhoto: function (target) {
      var newArray = Array.prototype.slice.call(photoCollection).indexOf(target.parentNode);
      window.preview.pasteNewData(window.x[newArray]);
    }


  };


})();
