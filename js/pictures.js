'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var PICTURES_VALUE = 25;
var MAX_COMMENT_LENGTH = 140;
var MAX_HASHTAGS_QUANTITY = 5;
var MAX_HASHTAG_LENGTH = 20;
var STEP = 25;
var RESIZE_MIN = 25;
var RESIZE_MAX = 100;


var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// получить случайное значение из диапазона от мин до макс
function returnRandomValue(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

// получить случайный элемент массива
function getRandomElem(array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

// Получить случайный комментарий
function getRandomComment(array) {
  var x = returnRandomValue(false, true);

  var res = [];
  if (x) {
    var y = getRandomElem(array);
    var z = getRandomElem(array);
    while (y !== z) {
      z = getRandomElem(array);
    }
    res[0] = y;
    res[1] = z;

    return res;
  } else {
    res[0] = getRandomElem(array);
    return res;
  }
}

// функция генерации случайного элемента
function createPhoto(param) {
  var photos = [];
  for (var i = 0; i < param; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: returnRandomValue(LIKES_MIN, LIKES_MAX),
      comments: getRandomComment(comments)
    };
  }
  return photos;
}

var x = createPhoto(PICTURES_VALUE);

// работа с шаблоном

var template = document.querySelector('#picture-template').content;
var picturesContainer = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var pictures = document.querySelector('.pictures');

// Функция отрисовки фотографии
function renderPhoto(array) {
  var photoElement = template.cloneNode(true);
  photoElement.querySelector('img').src = array.url;
  photoElement.querySelector('.picture-likes').textContent = array.likes;
  photoElement.querySelector('.picture-comments').textContent = array.comments.length;
  photoElement.querySelector('.picture').setAttribute('tabindex', '0');
  return photoElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < x.length; i++) {
  fragment.appendChild(renderPhoto(x[i]));
}
picturesContainer.appendChild(fragment);


var photoCollection = document.querySelectorAll('.picture');

// Отрисовка увеличенной фотографии
function pasteNewData(array) {
  galleryOverlay.querySelector('img').src = array.url;
  galleryOverlay.querySelector('.likes-count').textContent = array.likes;
  galleryOverlay.querySelector('.comments-count').textContent = array.comments.length;
}


// закрытие окна
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var closeElement = document.querySelector('.gallery-overlay-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    window.closePopup();
  }
};

window.openPopup = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

  // Функция закрытия окна диалога
window.closePopup = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

 // Закрытие окна диалоги при клике
closeElement.addEventListener('click', function () {
  galleryOverlay.classList.add('hidden');
});

  // Закрытие окна диалоги при нажатии клавиатуры
closeElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    galleryOverlay.classList.add('hidden');
  }
});


// функция отрисовки текущей фотографии
function renderCurrentPhoto(target) {
  var newArray = Array.prototype.slice.call(photoCollection).indexOf(target.parentNode);
  pasteNewData(x[newArray]);
}

// Действие при клике мышкой на фотографии
pictures.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.parentNode.classList.contains('picture')) {
    evt.preventDefault();
    renderCurrentPhoto(target);
    window.openPopup();
  }
});

// Действие при нажатии кнопки на фотографии
pictures.addEventListener('keydown', function (evt) {
  var target = evt.target.childNodes[0];
  if (target.parentNode.classList.contains('picture') && evt.keyCode === 13) {
    evt.preventDefault();
    renderCurrentPhoto(target);
    window.openPopup();
  }
});

// Работа с кадрированием
var uploadForm = document.querySelector('#upload-select-image');
var uploadFileInput = uploadForm.querySelector('#upload-file');
var uploadImage = uploadForm.querySelector('.upload-image');
var uploadOverlay = uploadForm.querySelector('.upload-overlay');
var uploadFileInput = uploadForm.querySelector('#upload-file');
var uploadCancel = uploadForm.querySelector('.upload-form-cancel');
var uploadDescription = uploadForm.querySelector('.upload-form-description');
var resizeValue = uploadForm.querySelector('.upload-resize-controls-value');
var resizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
var resizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
var effectPreview = uploadForm.querySelector('.effect-image-preview');
var effectNone = uploadForm.querySelector('#upload-effect-none');
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

function validateTextInput(input, maxValue) {
  if (input.value.length > maxValue) {
    input.setCustomValidity(
        'Максимальная длина комментария - ' + maxValue + ' ' + 'символов'
    );
    input.style.borderColor = 'red';
  } else {
    input.setCustomValidity('');
    input.style.borderColor = '';
  }
}

uploadDescription.addEventListener('input', function () {
  validateTextInput(uploadDescription, MAX_COMMENT_LENGTH);
});

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
  if (effectPreview.className != 'effect-image-preview') {
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
  for (var i = 0; i < array.length; i++) {
    if (array[i].length > MAX_HASHTAG_LENGTH) {
      return true;
    }
  }
  return false;
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
    if (newArrays[i].charAt(0) != '#' && newArrays[i].indexOf(' ') === -1) {
      input.classList.add('upload-message-error');
      input.setCustomValidity('#хештег должен начинаться с символа # и не должен содержать пробел');

    } else if (newArrays[i].indexOf('#', 1) != -1) {
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
