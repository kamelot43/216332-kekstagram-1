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
  window.picturesContainer.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.parentNode.classList.contains('picture')) {
      evt.preventDefault();
      if (!window.filterArray) {
        window.preview.renderCurrentPhoto(target, window.data);
      } else {
        window.preview.renderCurrentPhoto(target, window.filterArray);
      }
      window.openPopup();

    }
  });

  // Действие при нажатии кнопки на фотографии
  window.picturesContainer.addEventListener('keydown', function (evt) {
    var target = evt.target.childNodes[0];
    if (target.parentNode.classList.contains('picture') && evt.keyCode === 13) {
      evt.preventDefault();
      if (!window.filterArray) {
        window.preview.renderCurrentPhoto(target, window.data);
      } else {
        window.preview.renderCurrentPhoto(target, window.filterArray);
      }
      window.openPopup();
    }
  });

  // работа с ползунком фильтра
  var levelPin = document.querySelector('.upload-effect-level-pin');
  var levelVal = document.querySelector('.upload-effect-level-val');


  // Реакция на перетаскивание ползунка фильтра
  levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var maxClientX = 450;
      var minClientX = 0;


      function findRatio(param) {
        var percent = ((levelPin.offsetLeft - shift.x) / maxClientX) * 100;
        var result = percent.toFixed(2);
        var newResult;
        if (param === 'effect-phobos') {
          newResult = (3 * result) / 100;
          return newResult.toFixed(1) + 'px';
        } else if (param === 'effect-heat') {
          newResult = (300 * result) / 100;
          return newResult.toFixed(2) + '%';
        }
        return result + '%';
      }


      if ((levelPin.offsetLeft - shift.x) <= maxClientX && (levelPin.offsetLeft - shift.x) >= minClientX) {
        levelPin.style.left = (levelPin.offsetLeft - shift.x) + 'px';
        levelVal.style.width = (levelPin.offsetLeft - shift.x) + 'px';
        if (window.y === 'effect-sepia') {
          window.effectPreview.style.filter = 'sepia' + '\(' + findRatio(window.y) + '\)';
        } else if (window.y === 'effect-chrome') {
          window.effectPreview.style.filter = 'grayscale' + '\(' + findRatio(window.y) + '\)';
        } else if (window.y === 'effect-marvin') {
          window.effectPreview.style.filter = 'invert' + '\(' + findRatio(window.y) + '\)';
        } else if (window.y === 'effect-phobos') {
          window.effectPreview.style.filter = 'blur' + '\(' + findRatio(window.y) + '\)';
        } else if (window.y === 'effect-heat') {
          window.effectPreview.style.filter = 'brightness' + '\(' + findRatio(window.y) + '\)';
        }

      }


    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
