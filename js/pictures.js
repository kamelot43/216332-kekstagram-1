'use strict';

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
for (var i = 0; i < window.x.length; i++) {
  fragment.appendChild(renderPhoto(window.x[i]));
}
picturesContainer.appendChild(fragment);


var photoCollection = document.querySelectorAll('.picture');


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


// Действие при клике мышкой на фотографии
pictures.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.parentNode.classList.contains('picture')) {
    evt.preventDefault();
    window.preview.renderCurrentPhoto(target);
    window.openPopup();
  }
});

// Действие при нажатии кнопки на фотографии
pictures.addEventListener('keydown', function (evt) {
  var target = evt.target.childNodes[0];
  if (target.parentNode.classList.contains('picture') && evt.keyCode === 13) {
    evt.preventDefault();
    window.preview.renderCurrentPhoto(target);
    window.openPopup();
  }
});
