'use strict';
(function () {

  var PICTURES_VALUE = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;

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


  window.data = {
    // функция генерации фотографии
    createPhoto: function (param) {
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
  };
  window.x = window.data.createPhoto(PICTURES_VALUE);
})();
