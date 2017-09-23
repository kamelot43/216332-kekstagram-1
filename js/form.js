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
  var scaleElement = document.querySelector('.upload-resize-controls');
  var resizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var resizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var resizeValue = uploadForm.querySelector('.upload-resize-controls-value');
  window.effectPreview = uploadForm.querySelector('.effect-image-preview');
  var uploadHashtags = uploadForm.querySelector('.upload-form-hashtags');
  var uploadEffect = uploadForm.querySelector('.upload-effect-level');

  var uploadSubmit = uploadForm.querySelector('.upload-form-submit');

  // работа с ползунком фильтра
  var levelPin = document.querySelector('.upload-effect-level-pin');
  var levelVal = document.querySelector('.upload-effect-level-val');


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
    uploadEffect.classList.add('hidden');
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
    effectPreview.style.transform = x;
  }

  function resetResizer() {
    resizeValue.value = '100%';
    window.effectPreview.style.transform = '';
  }

  // наложение фильтров
  var effectControls = uploadForm.querySelector('.upload-effect-controls');

  // Установить оригинальный фильтр
  function setOriginalFilter(param) {
    levelPin.style.left = '20%';
    levelVal.style.width = '20%';
    if (window.effectPreview.className !== 'effect-image-preview') {
      window.effectPreview.setAttribute('class', 'effect-image-preview');
      effectPreview.style.filter = '';
    }
    window.effectPreview.className += ' ' + param;
  }

  // по умолчанию скрыть ползунок
  uploadEffect.classList.add('hidden');

  // Установить значение фильтров по умолчанию
  function setDefaultFilterValue(param) {
    if (param == 'effect-sepia') {
      uploadEffect.classList.remove('hidden');
      window.effectPreview.style.filter = 'sepia(20%)';
    } else if (param == 'effect-chrome') {
      uploadEffect.classList.remove('hidden');
      window.effectPreview.style.filter = 'grayscale(20%)';
    } else if (param == 'effect-marvin') {
      uploadEffect.classList.remove('hidden');
      window.effectPreview.style.filter = 'invert(20%)';
    } else if (param == 'effect-phobos') {
      uploadEffect.classList.remove('hidden');
      window.effectPreview.style.filter = 'blur(0.6px)';
    } else if (param == 'effect-heat') {
      uploadEffect.classList.remove('hidden');
      window.effectPreview.style.filter = 'brightness(60%)';
    } else {
      uploadEffect.classList.add('hidden');
    }
  }


  // Устранение бага с исчезновение фильтра
  uploadEffect.addEventListener('click', function (evt) {
    evt.stopPropagation();
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

  // module5-task3

  window.initializeScale(scaleElement, resizeImage);
  window.initializeFilters(effectControls, setOriginalFilter);
  window.initializeFilters(effectControls, setDefaultFilterValue);
})();
