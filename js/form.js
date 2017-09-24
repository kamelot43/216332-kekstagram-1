'use strict';
(function () {
  // Работа с кадрированием

  var MAX_HASHTAGS_QUANTITY = 5;
  var MAX_HASHTAG_LENGTH = 20;
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
  window.effectPreview = uploadForm.querySelector('.effect-image-preview');
  var uploadHashtags = uploadForm.querySelector('.upload-form-hashtags');
  var uploadEffect = uploadForm.querySelector('.upload-effect-level');

  var uploadSubmit = uploadForm.querySelector('.upload-form-submit');

  // работа с ползунком фильтра
  var levelPin = document.querySelector('.upload-effect-level-pin');
  var levelVal = document.querySelector('.upload-effect-level-val');

  // наложение фильтров
  var effectControls = uploadForm.querySelector('.upload-effect-controls');


  var onOverlayEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && uploadDescription !== document.activeElement) {
      window.closeOverlay();
    }
  };

  // Функиця открытия окна загрузки фото
  window.openOverlay = function () {
    document.addEventListener('keydown', onOverlayEscPress);
  };

  // Функция закрытия окна загрузки фото
  window.closeOverlay = function () {
    uploadImage.classList.remove('hidden');
    uploadOverlay.classList.add('hidden');
    window.form.setOriginalFilter();
    window.form.resetResizer();
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

  // по умолчанию скрыть ползунок
  uploadEffect.classList.add('hidden');

  // Устранение бага с исчезновение фильтра
  uploadEffect.addEventListener('click', function (evt) {
    evt.stopPropagation();
  });

  window.form = {
  // валидация формы

  // масштабирование
    resizeImage: function (element) {
      var x = 'scale' + '\(' + (element / 100) + '\)';
      window.effectPreview.style.transform = x;
    },

    resetResizer: function () {
      resizeValue.value = '100%';
      window.effectPreview.style.transform = '';
    },


  // Установить оригинальный фильтр
    setOriginalFilter: function (param) {
      levelPin.style.left = '20%';
      levelVal.style.width = '20%';
      if (window.effectPreview.className !== 'effect-image-preview') {
        window.effectPreview.setAttribute('class', 'effect-image-preview');
        window.effectPreview.style.filter = '';
      }
      window.effectPreview.className += ' ' + param;
    },


  // Установить значение фильтров по умолчанию
    setDefaultFilterValue: function (param) {
      if (param === 'effect-sepia') {
        uploadEffect.classList.remove('hidden');
        window.effectPreview.style.filter = 'sepia(20%)';
      } else if (param === 'effect-chrome') {
        uploadEffect.classList.remove('hidden');
        window.effectPreview.style.filter = 'grayscale(20%)';
      } else if (param === 'effect-marvin') {
        uploadEffect.classList.remove('hidden');
        window.effectPreview.style.filter = 'invert(20%)';
      } else if (param === 'effect-phobos') {
        uploadEffect.classList.remove('hidden');
        window.effectPreview.style.filter = 'blur(0.6px)';
      } else if (param === 'effect-heat') {
        uploadEffect.classList.remove('hidden');
        window.effectPreview.style.filter = 'brightness(60%)';
      } else {
        uploadEffect.classList.add('hidden');
      }
    },


  // Найти одинаковые хештеги
    findSameElement: function (array) {
      for (var i = 0; i < array.length; i++) {
        for (var j = i + 1; j < array.length; j++) {
          if (array[j] === array[i]) {
            return true;
          }
        }
      }
      return false;
    },

  // Измерить длину хештега
    findHashTagLength: function (array) {
      var flag = false;
      for (var i = 0; i < array.length; i++) {
        if (array[i].length > MAX_HASHTAG_LENGTH) {
          flag = true;
        }
      }
      return flag;
    },

  // Очистка формы после отправки
    resetForm: function (form) {
      form.reset();
      window.form.setOriginalFilter();
      window.form.resetResizer();
      window.closeOverlay();
    },


    validateHashTags: function (input) {
      var newArrays = input.value.split(' ');
      for (var i = 0; i < newArrays.length; i++) {
        if (newArrays[i].charAt(0) !== '#' && newArrays[i].indexOf(' ') === -1 && uploadHashtags.value !== '') {
          input.classList.add('upload-message-error');
          input.setCustomValidity('#хештег должен начинаться с символа # и не должен содержать пробел');

        } else if (newArrays[i].indexOf('#', 1) !== -1) {
          input.classList.add('upload-message-error');
          input.setCustomValidity('#хештеги должны быть разделены пробелом');

        } else if (window.form.findHashTagLength(newArrays)) {
          input.classList.add('upload-message-error');
          input.setCustomValidity('длина #хештега превышает допустимую');

        } else if (window.form.findSameElement(newArrays)) {
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
  };

  uploadHashtags.addEventListener('change', function () {
    window.form.validateHashTags(uploadHashtags);
  });


  // Закрытие окна кадрирования при нажатии клавиатуры
  uploadSubmit.addEventListener('submit', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.backend.save(
          new FormData(uploadForm),
          function () {
            window.form.resetForm(uploadForm);
          },
          window.backend.error
      );
      evt.preventDefault();
    }
  });

  // module5-task3
  // Изменять динамически фильтр, его стандартное значение и глубину
  window.initializeScale(scaleElement, window.form.resizeImage);
  window.initializeFilters(effectControls, window.form.setOriginalFilter);
  window.initializeFilters(effectControls, window.form.setDefaultFilterValue);


  // Отправка по сети данных формы методом AJAX
  uploadForm.addEventListener('submit', function (evt) {
    window.backend.save(
        new FormData(uploadForm),
        function () {
          window.form.resetForm(uploadForm);
        },
        window.backend.error
    );
    evt.preventDefault();
  });
})();
