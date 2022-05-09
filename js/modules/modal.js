function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflowY = 'scroll';
}
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflowY = 'hidden';

  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  const modalBtns = document.querySelectorAll(triggerSelector);

  modalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal(modalSelector, modalTimerId);
    });
  });

  function openModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight + 1 >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', openModalByScroll);
    }
  }

  modal.addEventListener('click', (e) => {
    const target = e.target;

    if (
      target.classList.contains('modal') ||
      target.getAttribute('data-close') === ''
    ) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    const btn = e.key;
    if (btn === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  window.addEventListener('scroll', openModalByScroll);
}

export default modal;
export { openModal };
export { closeModal };
