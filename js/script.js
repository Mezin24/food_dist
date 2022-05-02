window.addEventListener('DOMContentLoaded', () => {
  ///////// TABS ///////////////////////
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsParent = document.querySelector('.tabheader__items');

  const removeTabs = () => {
    tabsContent.forEach((tab) => {
      tab.classList.add('hide');
      tab.classList.remove('fade', 'show');
    });

    tabs.forEach((tab) => {
      tab.classList.remove('tabheader__item_active');
    });
  };

  const showTab = (i = 0) => {
    tabs[i].classList.add('tabheader__item_active');
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
  };

  removeTabs();
  showTab();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if (target === tab) {
          removeTabs();
          showTab(i);
        }
      });
    }
  });

  ///////// TIMER ///////////////////////
  const deadline = '2022-05-17T11:48:00';
  setTimer('.timer', deadline);

  function getDeadlineRemaining(endtime) {
    const remaining = Date.parse(endtime) - Date.parse(new Date());
    if (remaining <= 0) {
      return {
        remaining: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24)),
      hours = Math.floor((remaining / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((remaining / (1000 * 60)) % 60),
      seconds = Math.floor((remaining / 1000) % 60);

    return {
      remaining,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function addZero(num) {
    if (num <= 0 || num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setTimer(selector, endtime) {
    const timerEl = document.querySelector(selector),
      daysEl = timerEl.querySelector('#days'),
      hoursEl = timerEl.querySelector('#hours'),
      minutesEl = timerEl.querySelector('#minutes'),
      secondsEl = timerEl.querySelector('#seconds'),
      timerId = setInterval(displayTimer, 1000);

    displayTimer();

    function displayTimer() {
      const t = getDeadlineRemaining(endtime);
      if (t.remaining <= 0) {
        clearInterval(timerId);
      }
      daysEl.innerHTML = addZero(t.days);
      hoursEl.innerHTML = addZero(t.hours);
      minutesEl.innerHTML = addZero(t.minutes);
      secondsEl.innerHTML = addZero(t.seconds);
    }
  }

  ///////// MODAL ///////////////////////
  const modalBtns = document.querySelectorAll('[data-modal');
  const closeModalBtn = document.querySelector('[data-close]');
  const modal = document.querySelector('.modal');

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflowY = 'scroll';
  }
  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflowY = 'hidden';
    // clearInterval(modalTimerId);
  }

  modalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal();
    });
  });

  function openModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight + 1
    ) {
      openModal();
      window.removeEventListener('scroll', openModalByScroll);
    }
  }

  // const modalTimerId = setTimeout(openModal, 5000);

  closeModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('modal')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    const btn = e.key;
    if (btn === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  window.addEventListener('scroll', openModalByScroll);

  ///////// CARDS CLASSES ///////////////////////
  const data = [
    {
      img: 'vegy',
      menu: '"Фитнес"',
      descr:
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих      овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      price: 229,
      parentSelector: '.menu__field > .container',
    },
    {
      img: 'elite',
      menu: '“Премиум”',
      descr:
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода        в ресторан!',
      price: 550,
      parentSelector: '.menu__field > .container',
    },
    {
      img: 'post',
      menu: '"Постное"',
      descr:
        '>Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие        продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное        количество белков за счет тофу и импортных вегетарианских стейков.',
      price: 430,
      parentSelector: '.menu__field > .container',
    },
  ];
  class Card {
    constructor({ img, menu, descr, price, parentSelector }) {
      this.img = img;
      this.menu = menu;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
    }

    render() {
      const html = `
      <div class="menu__item ">
        <img src="img/tabs/${this.img}.jpg" alt="${this.img}">
        <h3 class="menu__item-subtitle">Меню ${this.menu}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      </div>
      `;

      this.parent.insertAdjacentHTML('beforeend', html);
    }
  }

  data.forEach((item) => {
    new Card(item).render();
  });

  ///////// FORMS ///////////////////////

  // const forms = document.querySelectorAll('form');
  // const message = {
  //   loading: 'Загрузка...',
  //   success: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
  //   failure: 'Что-то пошло не так...',
  // };

  // forms.forEach((form) => postData(form));

  // function postData(form) {
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const request = new XMLHttpRequest();
  //     request.open('POST', 'server.php');

  //     const msg = document.createElement('div');
  //     msg.classList.add('status');
  //     msg.textContent = message.loading;
  //     e.target.append(msg);

  //     const obj = {};
  //     new FormData(e.target).forEach((value, key) => (obj[key] = value));
  //     const json = JSON.stringify(obj);

  //     request.send(json);

  //     request.addEventListener('load', () => {
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         msg.textContent = message.success;
  //         form.reset();
  //         setTimeout(() => msg.remove(), 2000);
  //         setTimeout(() => closeModal(), 2000);
  //       } else {
  //         msg.textContent = message.failure;
  //       }
  //     });
  //   });
  // }

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Мы скоро свяжемся с вами!',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach((form) => postData(form));

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMsg = document.createElement('div');
      statusMsg.classList.add('status');
      statusMsg.textContent = message.loading;
      e.target.append(statusMsg);

      const formData = new FormData(e.target);
      const obj = {};
      formData.forEach((value, key) => (obj[key] = value));

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      const json = JSON.stringify(obj);
      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          statusMsg.textContent = message.success;
          console.log(request.response);
          e.target.reset();
          setTimeout(() => {
            statusMsg.remove();
            closeModal();
          }, 2000);
        } else {
          statusMsg.textContent = message.failure;
        }
      });
    });
  }
});
