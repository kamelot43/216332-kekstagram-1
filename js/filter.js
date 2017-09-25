'use strict';
(function () {

  var filterElement = document.querySelector('.filters');


  window.filter = {

    sortByLikes: function (a, b) {
      return b.likes - a.likes;
    },

    sortByComments: function (a, b) {
      return b.comments.length - a.comments.length;
    },

    createSortArray: function (array, cb) {
      var arrayCopy = array.slice();
      return arrayCopy.sort(cb);
    },

    compareRandom: function (a, b) {
      return Math.random() - 0.5;
    },

    sort: function (filter) {
      window.pictures.deletePhoto();
      window.filterArray = window.filter.createSortArray(window.data, filter);
      window.pictures.renderFragment(window.filterArray);
    },

    sortById: function (param) {
      switch (param) {
        case 'filter-popular':
          window.filter.sort(window.filter.sortByLikes);
          break;
        case 'filter-discussed':
          window.filter.sort(window.filter.sortByComments);
          break;
        case 'filter-random':
          window.filter.sort(window.filter.compareRandom);
          break;
        default:
          window.pictures.deletePhoto();
          window.pictures.renderFragment(window.data);
          break;
      }
    }
  };

  // Фильтрация при выборе фильтра
  filterElement.addEventListener('click', function (evt) {
    window.filterId = evt.target.id;
    window.debounce(function () {
      window.filter.sortById(window.filterId);
    });
  });

})();
