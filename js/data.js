'use strict';
(function () {

  var onSuccess = function (data) {
    // В переменной data содержится массив объявлений ,загруженный по сети
    window.data = data;
    window.pictures.renderFragment(window.data);
  };

  window.backend.load(onSuccess, window.backend.error);
})();
