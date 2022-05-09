import { openModal, closeModal } from './modal';
import { postData } from '../services/services';

function form(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро свяжемся с вами!',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach((form) => bindPostData(form));

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMsg = document.createElement('img');
      statusMsg.src = message.loading;
      statusMsg.innerHTML = message.loading;
      statusMsg.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      e.target.insertAdjacentElement('afterend', statusMsg);

      const formData = new FormData(e.target);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then((request) => {
          showThanksMessage(message.success);
          console.log(request);

          statusMsg.remove();
        })
        .catch(() => showThanksMessage(message.failure))
        .finally(() => e.target.reset());
    });
  }

  function showThanksMessage(message) {
    const modalDialoge = document.querySelector('.modal__dialog');
    modalDialoge.classList.add('hide');

    openModal('.modal', modalTimerId);
    const thanksDialoge = document.createElement('div');
    thanksDialoge.classList.add('modal__dialog');
    thanksDialoge.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksDialoge);
    setTimeout(() => {
      thanksDialoge.remove();
      modalDialoge.classList.add('show');
      modalDialoge.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  }
}

export default form;
