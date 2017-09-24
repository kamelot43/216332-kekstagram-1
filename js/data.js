'use strict';
(function () {
  var filterElement = document.querySelector('.filters');

  var onSuccess = function (data) {
    // В переменной data содержится массив объявлений ,загруженный по сети
    window.data = data;
    // window.z = window.filter.createSortArray(window.data, window.filter.sortByLikes);
    window.pictures.renderFragment(window.data);
    filterElement.classList.remove('hidden');

  };

  window.backend.load(onSuccess, window.backend.error);
})();
