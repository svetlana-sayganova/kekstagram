'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = undefined;

var _util = require('./util.js');

var util = _interopRequireWildcard(_util);

var _resize = require('./resize.js');

var resize = _interopRequireWildcard(_resize);

var _effects = require('./effects.js');

var effects = _interopRequireWildcard(_effects);

var _backend = require('./backend.js');

var backend = _interopRequireWildcard(_backend);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var bodyElement = document.querySelector('body');
var uploadButton = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.img-upload__form');
var uploadErrorBLock = uploadForm.querySelector('.img-upload__message--error');
var uploadErrorMessage = uploadErrorBLock.querySelector('.error__message');
var editPanel = document.querySelector('.img-upload__overlay');
var editPanelClose = editPanel.querySelector('#upload-cancel');

/**
 * При успешной отправке формы очищает ее поля
 * и закрывает панель редактирования
 *
 */
var onSuccessUpload = function onSuccessUpload() {
  uploadForm.reset();
  onEditPanelCloseClick();
};

/**
 * При неуспешной отправке формы закрывает панель редактирования
 * и показывает блок с ошибкой message
 *
 * @param {string} message
 */
var onErrorUpload = function onErrorUpload(message) {
  onEditPanelCloseClick();
  uploadErrorBLock.classList.remove('hidden');
  uploadErrorMessage.textContent = message;
};

/**
 * Отменяет действия по умолчанию при отправке формы
 * и запускает функцию отправки данных на сервер
 *
 * @param {Event} evt
 */
var onUploadFormSubmit = function onUploadFormSubmit(evt) {
  backend.upload(new FormData(uploadForm), onSuccessUpload, onErrorUpload);
  evt.preventDefault();
};

/**
 * Закрывает панель редактирования фотографии,
 * удаляет обработчики событий с недоступных более элементов
 *
 */
var onEditPanelCloseClick = function onEditPanelCloseClick() {
  uploadButton.value = '';
  bodyElement.classList.remove('modal-open');
  editPanel.classList.add('hidden');
  editPanelClose.removeEventListener('click', onEditPanelCloseClick);
  document.removeEventListener('keydown', onEditPanelEscPress);
  resize.finalize();
  effects.finalize();
};

/**
 * Закрывает панель редактирования фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
var onEditPanelEscPress = function onEditPanelEscPress(evt) {
  util.runOnEscPress(evt, onEditPanelCloseClick);
};

/**
* Открывает панель редактирования фотографии,
* добавляет обработчики событий
*
*/
var initialize = exports.initialize = function initialize() {
  bodyElement.classList.add('modal-open');
  editPanel.classList.remove('hidden');
  editPanelClose.addEventListener('click', onEditPanelCloseClick);
  document.addEventListener('keydown', onEditPanelEscPress);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  resize.initialize();
  effects.initialize();
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2pzL2Zvcm0uanMiXSwibmFtZXMiOlsidXRpbCIsInJlc2l6ZSIsImVmZmVjdHMiLCJiYWNrZW5kIiwiYm9keUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ1cGxvYWRCdXR0b24iLCJ1cGxvYWRGb3JtIiwidXBsb2FkRXJyb3JCTG9jayIsInVwbG9hZEVycm9yTWVzc2FnZSIsImVkaXRQYW5lbCIsImVkaXRQYW5lbENsb3NlIiwib25TdWNjZXNzVXBsb2FkIiwicmVzZXQiLCJvbkVkaXRQYW5lbENsb3NlQ2xpY2siLCJvbkVycm9yVXBsb2FkIiwibWVzc2FnZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsInRleHRDb250ZW50Iiwib25VcGxvYWRGb3JtU3VibWl0IiwiZXZ0IiwidXBsb2FkIiwiRm9ybURhdGEiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiYWRkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uRWRpdFBhbmVsRXNjUHJlc3MiLCJmaW5hbGl6ZSIsInJ1bk9uRXNjUHJlc3MiLCJpbml0aWFsaXplIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztJQUFZQSxJOztBQUNaOztJQUFZQyxNOztBQUNaOztJQUFZQyxPOztBQUNaOztJQUFZQyxPOzs7O0FBRVosSUFBTUMsY0FBY0MsU0FBU0MsYUFBVCxRQUFwQjtBQUNBLElBQU1DLGVBQWVGLFNBQVNDLGFBQVQsZ0JBQXJCO0FBQ0EsSUFBTUUsYUFBYUgsU0FBU0MsYUFBVCxxQkFBbkI7QUFDQSxJQUFNRyxtQkFBbUJELFdBQVdGLGFBQVgsK0JBQXpCO0FBQ0EsSUFBTUkscUJBQXFCRCxpQkFBaUJILGFBQWpCLG1CQUEzQjtBQUNBLElBQU1LLFlBQVlOLFNBQVNDLGFBQVQsd0JBQWxCO0FBQ0EsSUFBTU0saUJBQWlCRCxVQUFVTCxhQUFWLGtCQUF2Qjs7QUFFQTs7Ozs7QUFLQSxJQUFNTyxrQkFBa0IsU0FBbEJBLGVBQWtCLEdBQU07QUFDNUJMLGFBQVdNLEtBQVg7QUFDQUM7QUFDRCxDQUhEOztBQUtBOzs7Ozs7QUFNQSxJQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUNDLE9BQUQsRUFBYTtBQUNqQ0Y7QUFDQU4sbUJBQWlCUyxTQUFqQixDQUEyQkMsTUFBM0I7QUFDQVQscUJBQW1CVSxXQUFuQixHQUFpQ0gsT0FBakM7QUFDRCxDQUpEOztBQU1BOzs7Ozs7QUFNQSxJQUFNSSxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFDQyxHQUFELEVBQVM7QUFDbENuQixVQUFRb0IsTUFBUixDQUFlLElBQUlDLFFBQUosQ0FBYWhCLFVBQWIsQ0FBZixFQUF5Q0ssZUFBekMsRUFBMERHLGFBQTFEO0FBQ0FNLE1BQUlHLGNBQUo7QUFDRCxDQUhEOztBQUtBOzs7OztBQUtBLElBQU1WLHdCQUF3QixTQUF4QkEscUJBQXdCLEdBQU07QUFDbENSLGVBQWFtQixLQUFiO0FBQ0F0QixjQUFZYyxTQUFaLENBQXNCQyxNQUF0QjtBQUNBUixZQUFVTyxTQUFWLENBQW9CUyxHQUFwQjtBQUNBZixpQkFBZWdCLG1CQUFmLFVBQTRDYixxQkFBNUM7QUFDQVYsV0FBU3VCLG1CQUFULFlBQXdDQyxtQkFBeEM7QUFDQTVCLFNBQU82QixRQUFQO0FBQ0E1QixVQUFRNEIsUUFBUjtBQUNELENBUkQ7O0FBVUE7Ozs7O0FBS0EsSUFBTUQsc0JBQXNCLFNBQXRCQSxtQkFBc0IsQ0FBQ1AsR0FBRCxFQUFTO0FBQ25DdEIsT0FBSytCLGFBQUwsQ0FBbUJULEdBQW5CLEVBQXdCUCxxQkFBeEI7QUFDRCxDQUZEOztBQUlPOzs7OztBQUtQLElBQU1pQixrQ0FBYSxTQUFiQSxVQUFhLEdBQU07QUFDdkI1QixjQUFZYyxTQUFaLENBQXNCUyxHQUF0QjtBQUNBaEIsWUFBVU8sU0FBVixDQUFvQkMsTUFBcEI7QUFDQVAsaUJBQWVxQixnQkFBZixVQUF5Q2xCLHFCQUF6QztBQUNBVixXQUFTNEIsZ0JBQVQsWUFBcUNKLG1CQUFyQztBQUNBckIsYUFBV3lCLGdCQUFYLFdBQXNDWixrQkFBdEM7QUFDQXBCLFNBQU8rQixVQUFQO0FBQ0E5QixVQUFROEIsVUFBUjtBQUNELENBUkQiLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCAqIGFzIHJlc2l6ZSBmcm9tICcuL3Jlc2l6ZS5qcyc7XG5pbXBvcnQgKiBhcyBlZmZlY3RzIGZyb20gJy4vZWZmZWN0cy5qcyc7XG5pbXBvcnQgKiBhcyBiYWNrZW5kIGZyb20gJy4vYmFja2VuZC5qcyc7XG5cbmNvbnN0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgYm9keWApO1xuY29uc3QgdXBsb2FkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3VwbG9hZC1maWxlYCk7XG5jb25zdCB1cGxvYWRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmltZy11cGxvYWRfX2Zvcm1gKTtcbmNvbnN0IHVwbG9hZEVycm9yQkxvY2sgPSB1cGxvYWRGb3JtLnF1ZXJ5U2VsZWN0b3IoYC5pbWctdXBsb2FkX19tZXNzYWdlLS1lcnJvcmApO1xuY29uc3QgdXBsb2FkRXJyb3JNZXNzYWdlID0gdXBsb2FkRXJyb3JCTG9jay5xdWVyeVNlbGVjdG9yKGAuZXJyb3JfX21lc3NhZ2VgKTtcbmNvbnN0IGVkaXRQYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5pbWctdXBsb2FkX19vdmVybGF5YCk7XG5jb25zdCBlZGl0UGFuZWxDbG9zZSA9IGVkaXRQYW5lbC5xdWVyeVNlbGVjdG9yKGAjdXBsb2FkLWNhbmNlbGApO1xuXG4vKipcbiAqINCf0YDQuCDRg9GB0L/QtdGI0L3QvtC5INC+0YLQv9GA0LDQstC60LUg0YTQvtGA0LzRiyDQvtGH0LjRidCw0LXRgiDQtdC1INC/0L7Qu9GPXG4gKiDQuCDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QsNC90LXQu9GMINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cbiAqXG4gKi9cbmNvbnN0IG9uU3VjY2Vzc1VwbG9hZCA9ICgpID0+IHtcbiAgdXBsb2FkRm9ybS5yZXNldCgpO1xuICBvbkVkaXRQYW5lbENsb3NlQ2xpY2soKTtcbn07XG5cbi8qKlxuICog0J/RgNC4INC90LXRg9GB0L/QtdGI0L3QvtC5INC+0YLQv9GA0LDQstC60LUg0YTQvtGA0LzRiyDQt9Cw0LrRgNGL0LLQsNC10YIg0L/QsNC90LXQu9GMINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cbiAqINC4INC/0L7QutCw0LfRi9Cy0LDQtdGCINCx0LvQvtC6INGBINC+0YjQuNCx0LrQvtC5IG1lc3NhZ2VcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICovXG5jb25zdCBvbkVycm9yVXBsb2FkID0gKG1lc3NhZ2UpID0+IHtcbiAgb25FZGl0UGFuZWxDbG9zZUNsaWNrKCk7XG4gIHVwbG9hZEVycm9yQkxvY2suY2xhc3NMaXN0LnJlbW92ZShgaGlkZGVuYCk7XG4gIHVwbG9hZEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG59O1xuXG4vKipcbiAqINCe0YLQvNC10L3Rj9C10YIg0LTQtdC50YHRgtCy0LjRjyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQv9GA0Lgg0L7RgtC/0YDQsNCy0LrQtSDRhNC+0YDQvNGLXG4gKiDQuCDQt9Cw0L/Rg9GB0LrQsNC10YIg0YTRg9C90LrRhtC40Y4g0L7RgtC/0YDQsNCy0LrQuCDQtNCw0L3QvdGL0YUg0L3QsCDRgdC10YDQstC10YBcbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldnRcbiAqL1xuY29uc3Qgb25VcGxvYWRGb3JtU3VibWl0ID0gKGV2dCkgPT4ge1xuICBiYWNrZW5kLnVwbG9hZChuZXcgRm9ybURhdGEodXBsb2FkRm9ybSksIG9uU3VjY2Vzc1VwbG9hZCwgb25FcnJvclVwbG9hZCk7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiDQl9Cw0LrRgNGL0LLQsNC10YIg0L/QsNC90LXQu9GMINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0YTQvtGC0L7Qs9GA0LDRhNC40LgsXG4gKiDRg9C00LDQu9GP0LXRgiDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5INGBINC90LXQtNC+0YHRgtGD0L/QvdGL0YUg0LHQvtC70LXQtSDRjdC70LXQvNC10L3RgtC+0LJcbiAqXG4gKi9cbmNvbnN0IG9uRWRpdFBhbmVsQ2xvc2VDbGljayA9ICgpID0+IHtcbiAgdXBsb2FkQnV0dG9uLnZhbHVlID0gYGA7XG4gIGJvZHlFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYG1vZGFsLW9wZW5gKTtcbiAgZWRpdFBhbmVsLmNsYXNzTGlzdC5hZGQoYGhpZGRlbmApO1xuICBlZGl0UGFuZWxDbG9zZS5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIG9uRWRpdFBhbmVsQ2xvc2VDbGljayk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYGtleWRvd25gLCBvbkVkaXRQYW5lbEVzY1ByZXNzKTtcbiAgcmVzaXplLmZpbmFsaXplKCk7XG4gIGVmZmVjdHMuZmluYWxpemUoKTtcbn07XG5cbi8qKlxuICog0JfQsNC60YDRi9Cy0LDQtdGCINC/0LDQvdC10LvRjCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINGE0L7RgtC+0LPRgNCw0YTQuNC4INC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwIEVTQ1xuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2dFxuICovXG5jb25zdCBvbkVkaXRQYW5lbEVzY1ByZXNzID0gKGV2dCkgPT4ge1xuICB1dGlsLnJ1bk9uRXNjUHJlc3MoZXZ0LCBvbkVkaXRQYW5lbENsb3NlQ2xpY2spO1xufTtcblxuZXhwb3J0IC8qKlxuICog0J7RgtC60YDRi9Cy0LDQtdGCINC/0LDQvdC10LvRjCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINGE0L7RgtC+0LPRgNCw0YTQuNC4LFxuICog0LTQvtCx0LDQstC70Y/QtdGCINC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcbiAqXG4gKi9cbmNvbnN0IGluaXRpYWxpemUgPSAoKSA9PiB7XG4gIGJvZHlFbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1vZGFsLW9wZW5gKTtcbiAgZWRpdFBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoYGhpZGRlbmApO1xuICBlZGl0UGFuZWxDbG9zZS5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIG9uRWRpdFBhbmVsQ2xvc2VDbGljayk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYGtleWRvd25gLCBvbkVkaXRQYW5lbEVzY1ByZXNzKTtcbiAgdXBsb2FkRm9ybS5hZGRFdmVudExpc3RlbmVyKGBzdWJtaXRgLCBvblVwbG9hZEZvcm1TdWJtaXQpO1xuICByZXNpemUuaW5pdGlhbGl6ZSgpO1xuICBlZmZlY3RzLmluaXRpYWxpemUoKTtcbn07XG5cbiJdfQ==