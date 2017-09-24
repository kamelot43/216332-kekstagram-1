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

    sortById: function (param) {

      if (param == 'filter-popular') {
        window.pictures.deletePhoto();
        window.z = window.filter.createSortArray(window.data, window.filter.sortByLikes);
        window.pictures.renderFragment(window.z);
      } else if (param == 'filter-discussed') {
        window.pictures.deletePhoto();
        window.z = window.filter.createSortArray(window.data, window.filter.sortByComments);
        window.pictures.renderFragment(window.z);
      } else if (param == 'filter-random') {
        window.pictures.deletePhoto();
        window.z = window.filter.createSortArray(window.data, window.filter.compareRandom);
        window.pictures.renderFragment(window.z);
      } else {
        window.pictures.deletePhoto();
        window.pictures.renderFragment(window.data);
      }

    }
  };


  filterElement.addEventListener('click', function (evt) {
    window.filterId = evt.target.id;
    window.filter.sortById(window.filterId);
  });

})();
