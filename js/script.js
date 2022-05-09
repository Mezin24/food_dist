import tabs from './modules/tabs';
import modal, { openModal } from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import calc from './modules/calc';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(
    () => openModal('.modal', modalTimerId),
    5000000
  );

  tabs(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader__items',
    'tabheader__item_active'
  );
  modal('[data-modal]', '.modal', modalTimerId);
  timer('.timer', '2022-05-17T11:48:00');
  cards();
  forms('form', modalTimerId);
  calc();
  slider({
    slide: '.offer__slide',
    sliderContainer: '.offer__slider',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    currentId: 'current',
    totalId: 'total',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
});
