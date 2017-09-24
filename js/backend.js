'use strict';
(function () {
  var URL = 'https://1510.dump.academy/kekstagram';

  var sendRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          onError(xhr.status + xhr.statusText + 'Неверный запрос');
          break;
        case 404:
          onError(xhr.status + xhr.statusText + 'Ничего не найдено');
          break;
        case 401:
          onError(xhr.status + xhr.statusText + 'Пользователь не авторизован');
          break;
        case 500:
          onError(xhr.status + xhr.statusText + 'Ошибка сервера');
          break;
        default:
          onError('Неизвестный статус' + xhr.status + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    return xhr;

  };

  window.backend = {

    load: function (onSuccess, onError) {
      var xhr = sendRequest(onSuccess, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = sendRequest(onSuccess, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    },

    error: function (message) {
      var node = document.createElement('div');
      node.style.zIndex = '100';
      node.style.margin = '0 auto';
      node.style.textAlign = 'center';
      node.style.textAlign = 'center';
      node.style.backgroundColor = 'red';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.top = '120px';
      node.style.fontSize = '30px';
      node.style.fontWeight = 'bold';
      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

})();
