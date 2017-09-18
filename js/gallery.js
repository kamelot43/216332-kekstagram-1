'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var closeElement = document.querySelector('.gallery-overlay-close');

  // закрытие окна
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.closePopup();
    }
  };

  window.openPopup = function () {
    window.galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

    // Функция закрытия окна диалога
  window.closePopup = function () {
    window.galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

   // Закрытие окна диалоги при клике
  closeElement.addEventListener('click', function () {
    window.galleryOverlay.classList.add('hidden');
  });

    // Закрытие окна диалоги при нажатии клавиатуры
  closeElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.galleryOverlay.classList.add('hidden');
    }
  });


  // Действие при клике мышкой на фотографии
  window.pictures.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.parentNode.classList.contains('picture')) {
      evt.preventDefault();
      window.preview.renderCurrentPhoto(target);
      window.openPopup();
    }
  });

  // Действие при нажатии кнопки на фотографии
  window.pictures.addEventListener('keydown', function (evt) {
    var target = evt.target.childNodes[0];
    if (target.parentNode.classList.contains('picture') && evt.keyCode === 13) {
      evt.preventDefault();
      window.preview.renderCurrentPhoto(target);
      window.openPopup();
    }
  });

})();
