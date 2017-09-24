'use strict';
(function () {

  window.initializeFilters = function (element, callback) {
    element.addEventListener('click', function (evt) {
      window.y = evt.target.id.slice(7);
      callback(window.y);
    });
  };

})();
