import * as data from './data.js';
import * as util from './util.js';

const escKeyCode = 27;

// DOM-элемент, в котором размещаются фотографии пользователей
const container = document.querySelector(`.pictures`);

// Шаблон для фотографии пользователя
const template = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture__link`);

// Элементы для показа фотографии в полноэкранном режиме
const bodyElement = document.querySelector(`body`);
const bigPhoto = document.querySelector(`.big-picture`);
const bigPhotoImage = bigPhoto.querySelector(`.big-picture__img`)
    .querySelector(`img`);
const bigPhotoClose = bigPhoto.querySelector(`.cancel`);
const bigPhotoCaption = bigPhoto.querySelector(`.social__caption`);
const bigPhotoLikes = bigPhoto.querySelector(`.likes-count`);
const bigPhotoCommentsCount = bigPhoto.querySelector(`.social__comment-count`);
const bigPhotoCommentsLoad = bigPhoto.querySelector(`.social__comment-loadmore`);
const bigPhotoCommentsBlock = bigPhoto.querySelector(`.social__comments`);

// Элементы для загрузки изображения и его редактирования
const uploadForm = document.querySelector(`.img-upload__form`);
const uploadButton = uploadForm.querySelector(`#upload-file`);
const editForm = uploadForm.querySelector(`.img-upload__overlay`);
const editFormClose = uploadForm.querySelector(`#upload-cancel`);

// Элементы для масштабирования изображения
const resizeMinus = uploadForm.querySelector(`.resize__control--minus`);
const resizePlus = uploadForm.querySelector(`.resize__control--plus`);
const resizeValue = uploadForm.querySelector(`.resize__control--value`);
const PictureSize = {
  min: 25,
  max: 100,
  default: 100,
  current: 100,
  step: 25
};
const picturePreview = uploadForm.querySelector(`.img-upload__preview`);

/**
 * Открывает поп-ап с полноэкранной версией фотографии
 *
 */
const onPhotoElementClick = () => {
  bodyElement.classList.add(`modal-open`);
  bigPhoto.classList.remove(`hidden`);
  bigPhotoClose.addEventListener(`click`, onBigPhotoCloseClick);
  document.addEventListener(`keydown`, onBigPhotoEscPress);
};

/**
 * Закрывает поп-ап с полноэкранной версией фотографии
 *
 */
const onBigPhotoCloseClick = () => {
  bodyElement.classList.remove(`modal-open`);
  bigPhoto.classList.add(`hidden`);
  bigPhotoClose.removeEventListener(`click`, onBigPhotoCloseClick);
  document.removeEventListener(`keydown`, onBigPhotoEscPress);
};

/**
 * Закрывает поп-ап с полноэкранной версией фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
const onBigPhotoEscPress = (evt) => {
  if (evt.keyCode === escKeyCode) {
    onBigPhotoCloseClick();
  }
};

/**
 * Возвращает DOM-элемент `Фотография`, созданный на основе объекта Photo
 *
 * @param {Photo} photoData
 * @return {Node}
 */
const createPhotoElement = (photoData) => {
  const photoElement = template.cloneNode(true);
  const photoElementSource = photoElement.querySelector(`.picture__img`);
  const photoElementComments = photoElement.querySelector(`.picture__stat--comments`);
  const photoElementLikes = photoElement.querySelector(`.picture__stat--likes`);

  photoElementSource.src = photoData.url;
  photoElementComments.textContent = photoData.comments.length;
  photoElementLikes.textContent = photoData.likes;

  // При нажатии на DOM-элемент `Фотография` открывается его полноэкранная версия
  photoElement.addEventListener(`click`, () => {
    onPhotoElementClick();
    fillBigPhoto(photoData);
  });

  return photoElement;
};

/**
 * Отображает DOM-элементы `Фотография`, созданный на основе массива объектов Photo,
 * на странице
 *
 * @param {Array.<Photo>} photoDataArray
 */
const renderPhotos = (photoDataArray) => {
  const fragment = document.createDocumentFragment();
  photoDataArray.forEach((value) => fragment.appendChild(createPhotoElement(value)));

  container.appendChild(fragment);
};

/**
 * Возвращает шаблон DOM-элемента для комментария comment
 *
 * @param {string} comment
 * @return {string}
 */
const createCommentTemplate = (comment) =>
  `<li class="social__comment social__comment--text">
  <img class="social__picture" src="img/avatar-${util.getRandomNumber(1, 6)}.svg"
  alt="Аватар комментатора фотографии" width="35" height="35">${comment}</li>`;

/**
 * Наполняет DOM-элемент `Фотография в полноэкранном режиме` данными объекта photoData
 *
 * @param {Photo} photoData
 */
const fillBigPhoto = (photoData) => {
  bigPhotoCommentsCount.classList.add(`visually-hidden`);
  bigPhotoCommentsLoad.classList.add(`visually-hidden`);

  bigPhotoImage.src = photoData.url;
  bigPhotoCaption.textContent = photoData.description;
  bigPhotoLikes.textContent = photoData.likes;

  bigPhotoCommentsCount.classList.add(`visually-hidden`);
  bigPhotoCommentsLoad.classList.add(`visually-hidden`);

  util.removeChildren(bigPhotoCommentsBlock);

  const commentsBlockElements = photoData.comments.map((value) => createCommentTemplate(value));

  bigPhotoCommentsBlock.insertAdjacentHTML(`afterbegin`, commentsBlockElements.join(``));
};

const photos = data.init();

renderPhotos(photos);

// Загрузка изображения и формы редактирования

/**
 * Открывает форму редактирования фотографии,
 * добавляет обработчики событий
 *
 */
const onUploadButtonClick = () => {
  bodyElement.classList.add(`modal-open`);
  editForm.classList.remove(`hidden`);
  editFormClose.addEventListener(`click`, onEditFormCloseClick);
  document.addEventListener(`keydown`, onEditFormEscPress);
  activateResizePicture();
  activateEffectsPicture();
};

/**
 * Закрывает форму редактирования фотографии,
 * удаляет обработчики событий с недоступных более элементов
 *
 */
const onEditFormCloseClick = () => {
  uploadButton.value = ``;
  bodyElement.classList.remove(`modal-open`);
  editForm.classList.add(`hidden`);
  editFormClose.removeEventListener(`click`, onEditFormCloseClick);
  document.removeEventListener(`keydown`, onEditFormEscPress);
  deactivateResizePicture();
  deactivateEffectsPicture();
};

/**
 * Закрывает форму редактирования фотографии при нажатии на ESC
 *
 * @param {Event} evt
 */
const onEditFormEscPress = (evt) => {
  if (evt.keyCode === escKeyCode) {
    onEditFormCloseClick();
  }
};

uploadButton.addEventListener(`change`, onUploadButtonClick);

// Масштабирование изображения

/**
 * Записывает новый масштаб изображения size в поле resizeValue
 * м масштабирует изображение picturePreview на величину size
 * через задание ему стиля `transform: scale(size / 100)`
 *
 * @param {number} size
 */
const setPictureSize = (size) => {
  resizeValue.value = `${size}%`;
  picturePreview.style = `transform: scale(${size / 100})`;
  PictureSize.current = size;
};

/**
 * Уменьшает масштаб изображения на величину PictureSize.step
 * и записывает новый масштаб изображения в поле resizeValue
 *
 */
const onResizeMinusClick = () => {
  if (PictureSize.current > PictureSize.min) {
    const newSize = PictureSize.current - PictureSize.step;
    setPictureSize(newSize);
  }
};

/**
 * Увеличивает масштаб изображения на величину PictureSize.step
 * и записывает новый масштаб изображения в поле resizeValue
 *
 */
const onResizePlusClick = () => {
  if (PictureSize.current < PictureSize.max) {
    const newSize = PictureSize.current + PictureSize.step;
    setPictureSize(newSize);
  }
};

/**
 * Устанавливает масштаб PictureSize.default загруженному изображению
 * и добавляет обработчики на кнопки масштабирования изображения
 *
 */
const activateResizePicture = () => {
  setPictureSize(PictureSize.default);
  resizeMinus.addEventListener(`click`, onResizeMinusClick);
  resizePlus.addEventListener(`click`, onResizePlusClick);
};

/**
 * Удаляет обработчики с кнопок масштабирования изображения
 *
 */
const deactivateResizePicture = () => {
  resizeMinus.removeEventListener(`click`, onResizeMinusClick);
  resizePlus.removeEventListener(`click`, onResizePlusClick);
};

// Применение эффекта для изображения
const scalePanel = uploadForm.querySelector(`.scale`);
const scalePin = scalePanel.querySelector(`.scale__pin`);
const scaleLevel = scalePanel.querySelector(`.scale__level`);
const effectLevel = scalePanel.querySelector(`.scale__value`);
const effectPanel = uploadForm.querySelector(`.effects`);
const effectToggles = effectPanel.querySelectorAll(`.effects__radio`);
const defaultEffect = effectPanel.querySelector(`#effect-none`);
const uploadedPicture = uploadForm.querySelector(`.img-upload__preview > img`);
const effectMaxLevel = 100;
let currentPictureClass;

const effects = {
  chrome: {
    min: 0,
    max: 1,
    setFilter: (value) => `grayscale(${value})`
  },
  sepia: {
    min: 0,
    max: 1,
    setFilter: (value) => `sepia(${value})`
  },
  marvin: {
    min: 0,
    max: 100,
    setFilter: (value) => `invert(${value}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    setFilter: (value) => `blur(${value}px)`
  },
  heat: {
    min: 1,
    max: 3,
    setFilter: (value) => `brightness(${value})`
  },
  none: {
    min: 0,
    max: 0,
    setFilter: () => `none`
  }
};

/**
 * Скрывает ползунок scale и удаляет обработчик событий
 * с пина ползунка
 *
 */
const hideScalePanel = () => {
  scalePanel.classList.add(`hidden`);
  scalePin.removeEventListener(`mousedown`, onScalePinMouseDown);
};

/**
 * Показывает ползунок scale и добавлляет обработчик событий
 * для пина ползунка
 *
 */
const showScalePanel = () => {
  if (scalePanel.classList.contains(`hidden`)) {
    scalePanel.classList.remove(`hidden`);
    scalePin.addEventListener(`mousedown`, onScalePinMouseDown);
  }
};

/**
 * Устанавливает класс загруженному изображению
 * в соответствии с effectName
 *
 * @param {string} effectName
 */
const setPictureClass = (effectName) => {
  if (currentPictureClass) {
    uploadedPicture.classList.remove(currentPictureClass);
  }
  uploadedPicture.classList.add(`effects__preview--${effectName}`);
  currentPictureClass = `effects__preview--${effectName}`;
};

/**
 * Возвращает отмасштабированное в соответствии с effectName
 * значение для эффекта
 *
 * @param {number} value Значение до масштабирования: от 0 до 100
 * @param {string} effectName Примененный эффект
 * @return {number} Отмасштабированное значение
 */
const getEffectValue = (value, effectName) => {
  const currentEffect = effects[effectName];
  return currentEffect.min + value * (currentEffect.max - currentEffect.min) / effectMaxLevel;
};

/**
 * Устанавливает стиль для загруженного изображения
 * в зависимости от примененного эффекта effectName
 *
 * @param {string} effectName
 */
const setPictureEffect = (effectName) => {
  const effectValue = getEffectValue(effectLevel.value, effectName);
  uploadedPicture.style.filter = effects[effectName].setFilter(effectValue);
};

/**
 * Присваивает уровню эффекта effectLevel значение value;
 * перемещает пин ползунка в соответствии с величиной value
 *
 * @param {number} value Значение от 0 до 100
 */
const setPinPosition = (value) => {
  effectLevel.value = value;
  scalePin.style.left = `${value}%`;
  scaleLevel.style.width = `${value}%`;
};

/**
 * В зависимости от выбранного эффекта скрывает или показывает
 * ползунок scalePanel; передает эффект и функцию применения эффекта
 * для пина ползунка; устанавливает пин ползунка в максимальное
 * положение; устанавливает класс и стиль на загруженное изображение
 *
 * @param {Event} evt
 */
const onEffectToggleClick = (evt) => {
  const selectedEffect = evt.target;
  if (selectedEffect === defaultEffect) {
    hideScalePanel();
  } else {
    showScalePanel();
    setPinAction(selectedEffect.value, setPictureEffect);
  }
  setPinPosition(effectMaxLevel);
  setPictureClass(selectedEffect.value);
  setPictureEffect(selectedEffect.value);
};

/**
 * Устанавливает обработчики событий на переключатели эффектов;
 * устанавливает класс и стиль `без эффектов` загруженному изображению
 * и скрывает ползунок scalePanel
 *
 */
const activateEffectsPicture = () => {
  Array.from(effectToggles).forEach((effectToggle) =>
    effectToggle.addEventListener(`click`, onEffectToggleClick));
  defaultEffect.checked = true;
  setPictureClass(defaultEffect.value);
  setPictureEffect(defaultEffect.value);
  hideScalePanel();
};

/**
 * Удаляет обработчики событий с переключателей эффектов
 *
 */
const deactivateEffectsPicture = () => {
  Array.from(effectToggles).forEach((effectToggle) =>
    effectToggle.removeEventListener(`click`, onEffectToggleClick));
};

// Перемещение ползунка
const scaleLine = scalePanel.querySelector(`.scale__line`);
let pin;

/**
 * Присваивает переменной pin значения примененного эффекта
 * и функции, используюшейся при перемещении пина
 *
 * @param {string} effect
 * @param {function} action
 */
const setPinAction = (effect, action) => {
  pin = {
    effect,
    action
  };
};

/**
 * Перемещает пин позунка и в зависимости от его положения
 * применяет эффекты к изображению
 *
 * @param {Event} evt
 */
const onScalePinMouseDown = (evt) => {
  evt.preventDefault();
  const scaleWidth = scaleLine.offsetWidth;

  let startCoord = evt.clientX;

  scalePin.style.cursor = `none`;
  document.documentElement.style.cursor = `none`;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = startCoord - moveEvt.clientX;
    startCoord = moveEvt.clientX;

    let currentCoord = scalePin.offsetLeft - shift;

    if (currentCoord < 0) {
      currentCoord = 0;
    } else if (currentCoord > scaleWidth) {
      currentCoord = scaleWidth;
    }

    const currentValue = currentCoord * 100 / scaleWidth;
    setPinPosition(currentValue);
    pin.action(pin.effect);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    scalePin.style.cursor = `move`;
    document.documentElement.style.cursor = `auto`;

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};
