'use strict';
(function () {
  var STEP = 25;
  var RESIZE_MIN = 25;
  var RESIZE_MAX = 100;
  var uploadForm = document.querySelector('#upload-select-image');
  var resizeValue = uploadForm.querySelector('.upload-resize-controls-value');


  function increaseResizeValue() {
    if (parseInt(resizeValue.value, 10) < RESIZE_MAX) {
      var newResizeValue = parseInt(resizeValue.value, 10) + STEP;
      resizeValue.value = newResizeValue + '%';
      return newResizeValue;
    }
    return resizeValue.value;
  }

  function reduceResizeValue() {
    if (parseInt(resizeValue.value, 10) > RESIZE_MIN) {
      var newResizeValue = parseInt(resizeValue.value, 10) - STEP;
      resizeValue.value = newResizeValue + '%';
      return newResizeValue;
    }
    return resizeValue.value;
  }

  window.initializeScale = function (element, callback) {
    element.addEventListener('click', function (evt) {
      var target = evt.target.classList.contains('upload-resize-controls-button-inc');
      var currentValue;
      if (target) {
        currentValue = increaseResizeValue();
        callback(currentValue);
      } else {
        currentValue = reduceResizeValue();
        callback(currentValue);
      }
    });
  };


})();
