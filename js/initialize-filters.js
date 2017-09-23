'use strict';
(function () {
/*
  // Установить оригинальный фильтр
  function setOriginalFilter(param) {
    levelPin.style.left = '20%';
    levelVal.style.width = '20%';
    if (effectPreview.className !== 'effect-image-preview') {
      effectPreview.setAttribute('class', 'effect-image-preview');
      window.effectPreview.className += ' ' + param;
    }
  }
  */

  window.initializeFilters = function (element, callback) {
    element.addEventListener('click', function (evt) {
      window.y = evt.target.id.slice(7);
      callback(window.y);
    });
  };

})();
