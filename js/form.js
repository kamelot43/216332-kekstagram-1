'use strict';
(function () {
  // Работа с кадрированием

  var MAX_HASHTAGS_QUANTITY = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var STEP = 25;
  var RESIZE_MIN = 25;
  var RESIZE_MAX = 100;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFileInput = uploadForm.querySelector('#upload-file');
  var uploadImage = uploadForm.querySelector('.upload-image');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadCancel = uploadForm.querySelector('.upload-form-cancel');
  var uploadDescription = uploadForm.querySelector('.upload-form-description');
  var resizeValue = uploadForm.querySelector('.upload-resize-controls-value');
  var resizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var resizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var effectPreview = uploadForm.querySelector('.effect-image-preview');
  var uploadHashtags = uploadForm.querySelector('.upload-form-hashtags');

  var uploadSubmit = uploadForm.querySelector('.upload-form-submit');


  var onOverlayEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && uploadDescription !== document.activeElement) {
      window.closeOverlay();
    }
  };

  window.openOverlay = function () {
    document.addEventListener('keydown', onOverlayEscPress);
  };

    // Функция закрытия окна диалога
  window.closeOverlay = function () {
    uploadImage.classList.remove('hidden');
    uploadOverlay.classList.add('hidden');
    setOriginalFilter();
    resetResizer();
    document.removeEventListener('keydown', onOverlayEscPress);
  };

  uploadFileInput.addEventListener('click', function (evt) {
    uploadImage.classList.add('hidden');
    uploadOverlay.classList.remove('hidden');
    window.openOverlay();

  });

  uploadCancel.addEventListener('click', function (evt) {
    window.closeOverlay();
  });

  // Закрытие окна диалоги при нажатии клавиатуры
  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.closeOverlay();
    }
  });


  // валидация формы

  // масштабирование
  function resizeImage(element) {
    var x = 'scale' + '\(' + (element / 100) + '\)';
    effectPreview.style.transform = '';
    effectPreview.style.transform += ' ' + x;
  }

  function resetResizer() {
    resizeValue.value = '100%';
  }

  // масштабирование -
  resizeDec.addEventListener('click', function (evt) {
    if (parseInt(resizeValue.value, 10) > RESIZE_MIN) {
      var newResizeValue = parseInt(resizeValue.value, 10) - STEP;
      resizeValue.value = newResizeValue + '%';
      resizeImage(newResizeValue);
    }
  });


  // масштабирование +
  resizeInc.addEventListener('click', function (evt) {
    if (parseInt(resizeValue.value, 10) < RESIZE_MAX) {
      var newResizeValue = parseInt(resizeValue.value, 10) + STEP;
      resizeValue.value = newResizeValue + '%';
      resizeImage(newResizeValue);

    }
  });

  // наложение фильтров
  var effectControls = uploadForm.querySelector('.upload-effect-controls');

  // Установить оригинальный фильтр
  function setOriginalFilter() {
    if (effectPreview.className !== 'effect-image-preview') {
      effectPreview.setAttribute('class', 'effect-image-preview');
    }
  }

  // Применить выбранный фильтр
  effectControls.addEventListener('click', function (evt) {
    setOriginalFilter();
    var x = evt.target.id.slice(7);
    effectPreview.className += ' ' + x;
  });

  // Найти одинаковые хештеги
  var findSameElement = function (array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[j] === array[i]) {
          return true;
        }
      }
      return false;
    }
  };

  // Измерить длину хештега
  function findHashTagLength(array) {
    var flag = false;
    for (var i = 0; i < array.length; i++) {
      if (array[i].length > MAX_HASHTAG_LENGTH) {
        flag = true;
      }
    }
    return flag;
  }

  // Очистка формы после отправки
  function resetForm(form) {
    form.submit();
    setTimeout(function () {
      form.reset();
      setOriginalFilter();
      resetResizer();
    }, 100);
  }


  function validateHashTags(input) {
    var newArrays = input.value.split(' ');
    for (var i = 0; i < newArrays.length; i++) {
      if (newArrays[i].charAt(0) !== '#' && newArrays[i].indexOf(' ') === -1) {
        input.classList.add('upload-message-error');
        input.setCustomValidity('#хештег должен начинаться с символа # и не должен содержать пробел');

      } else if (newArrays[i].indexOf('#', 1) !== -1) {
        input.classList.add('upload-message-error');
        input.setCustomValidity('#хештеги должны быть разделены пробелом');

      } else if (findHashTagLength(newArrays)) {
        input.classList.add('upload-message-error');
        input.setCustomValidity('длина #хештега превышает допустимую');

      } else if (findSameElement(newArrays)) {
        input.classList.add('upload-message-error');
        input.setCustomValidity('#хештеги повторяются');

      } else if (newArrays.length > MAX_HASHTAGS_QUANTITY) {
        input.classList.add('upload-message-error');
        input.setCustomValidity('указано более 5 #хештегов');

      } else {
        input.setCustomValidity('');
        input.classList.remove('upload-message-error');

      }
    }
  }

  uploadHashtags.addEventListener('change', function () {
    validateHashTags(uploadHashtags);
  });


  // Закрытие окна кадрирования при нажатии клавиатуры
  uploadSubmit.addEventListener('submit', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      resetForm(uploadForm);
    }
  });

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    resetForm(uploadForm);
  });
})();
