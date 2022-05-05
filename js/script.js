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

  modal.addEventListener('click', (e) => {
    const target = e.target;

    if (
      target.classList.contains('modal') ||
      target.getAttribute('data-close') === ''
    ) {
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

  const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch url ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  class Card {
    constructor(img, altimg, title, descr, price, parent) {
      this.img = img;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parent);
    }

    calcPrice() {
      return this.price * 72;
    }

    render() {
      const html = `
      <div class="menu__item ">
        <img src="${this.img}" alt="${this.img}">
        <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.calcPrice()}</span> грн/день</div>
        </div>
      </div>
      `;

      this.parent.insertAdjacentHTML('beforeend', html);
    }
  }

  getData('http://localhost:3000/menu').then((menu) => {
    menu.forEach(({ img, altimg, title, descr, price }) => {
      new Card(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu__field > .container'
      ).render();
    });
  });

  ///////// FORMS ///////////////////////

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро свяжемся с вами!',
    failure: 'Что-то пошло не так...',
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json',
      },
    });

    return await res.json();
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

      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');
      // const json = JSON.stringify(obj);
      // request.send(json);

      // request.addEventListener('load', () => {
      //   if (request.status === 200) {
      //     showThanksMessage(message.success);
      //     console.log(request.response);
      //     e.target.reset();
      //     statusMsg.remove();
      //   } else {
      //     showThanksMessage(message.failure);
      //   }
      // });
    });
  }

  function showThanksMessage(message) {
    const modalDialoge = document.querySelector('.modal__dialog');
    modalDialoge.classList.add('hide');

    openModal();
    const thanksDialoge = document.createElement('div');
    thanksDialoge.classList.add('modal__dialog');
    thanksDialoge.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    modal.append(thanksDialoge);
    setTimeout(() => {
      thanksDialoge.remove();
      modalDialoge.classList.add('show');
      modalDialoge.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  ///////// RECURSION ///////////////////////
  // const body = document.querySelector('body');
  // const recursion = (element) => {
  //   element.childNodes.forEach((node) => {
  //     if (node.nodeName === '#text' || node.nodeName === '#comment') {
  //       return;
  //     } else {
  //       console.log(node);
  //       recursion(node);
  //     }
  //   });
  // };

  // recursion(body);

  ///////// SLIDER ///////////////////////

  const slides = document.querySelectorAll('.offer__slide');
  const slider = document.querySelector('.offer__slider');
  const prevBtn = document.querySelector('.offer__slider-prev');
  const nextBtn = document.querySelector('.offer__slider-next');
  const currentLabel = document.getElementById('current');
  const totalLabel = document.getElementById('total');
  const slidesWrapper = document.querySelector('.offer__slider-wrapper');
  const slidesField = document.querySelector('.offer__slider-inner');
  const width = window.getComputedStyle(slidesWrapper).width;
  let current = 1;
  let offset = 0;
  const dots = [];

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = 'all 0.5s';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach((slide) => (slide.style.width = width));

  totalLabel.textContent = addZero(slides.length);
  currentLabel.textContent = addZero(current);

  slider.style.position = 'relative';
  const sliderIndicator = document.createElement('ol');
  sliderIndicator.classList.add('carousel-indicators');
  slider.append(sliderIndicator);

  slides.forEach((_, i) => {
    const dot = document.createElement('li');
    dot.setAttribute('data-go-to', i + 1);
    dot.classList.add('dot');
    if (i === 0) {
      dot.style.opacity = 1;
    }
    sliderIndicator.append(dot);
    dots.push(dot);
  });

  const setActiveDot = (num) => {
    dots.forEach((dot) => (dot.style.opacity = '0.5'));
    dots[num - 1].style.opacity = 1;
  };

  nextBtn.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (current === slides.length) {
      current = 1;
    } else {
      current++;
    }
    currentLabel.textContent = addZero(current);

    setActiveDot(current);
  });

  prevBtn.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (current === 1) {
      current = slides.length;
    } else {
      current--;
    }
    currentLabel.textContent = addZero(current);

    setActiveDot(current);
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const dotIndex = e.target.getAttribute('data-go-to');
      current = +dotIndex;
      offset = +width.slice(0, width.length - 2) * (dotIndex - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      currentLabel.textContent = addZero(current);
      setActiveDot(current);
    });
  });

  ///////// simpl version SLIDER ///////////////////////
  // function hideSlides() {
  //   slides.forEach((slide) => {
  //     slide.classList.add('hide');
  //     slide.classList.remove('show');
  //   });
  // }

  // function displaySlide(num = 0) {
  //   hideSlides();
  //   currentLabel.textContent = addZero(num + 1);
  //   totalLabel.textContent = addZero(slides.length);
  //   slides[num].classList.remove('hide');
  //   slides[num].classList.add('show');
  // }

  // prevBtn.addEventListener('click', () => {
  //   if (current === 0) return;

  //   current--;
  //   displaySlide(current);
  // });

  // nextBtn.addEventListener('click', () => {
  //   if (current >= slides.length - 1) return;

  //   current++;
  //   displaySlide(current);
  // });

  // displaySlide();

  ///////// CALCULATOR ///////////////////////

  const calcEl = document.querySelector('.calculating__result span');
  let sex,
    weight,
    height,
    age,
    ratio = localStorage.getItem('ratio') || 1.375;

  if (!localStorage.getItem('sex')) {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  } else {
    sex = localStorage.getItem('sex');
  }

  if (!localStorage.getItem('ratio')) {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  } else {
    ratio = localStorage.getItem('ratio');
  }

  calcCalories();
  initLocalData('#gender > div', 'calculating__choose-item_active');
  initLocalData(
    '.calculating__choose_big > div',
    'calculating__choose-item_active'
  );

  getDynamicData('.calculating__choose_medium > input');
  getStaticData('#gender > div', 'calculating__choose-item_active');
  getStaticData(
    '.calculating__choose_big > div',
    'calculating__choose-item_active'
  );

  function getStaticData(selector, activClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) =>
      el.addEventListener('click', (e) => {
        if (el.getAttribute('data-ratio')) {
          ratio = +e.target.dataset.ratio;
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', sex);
        }

        elements.forEach((el) => el.classList.remove(activClass));
        e.target.classList.add(activClass);
        calcCalories();
      })
    );
  }

  function getDynamicData(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) =>
      el.addEventListener('input', (e) => {
        const id = e.target.getAttribute('id');
        if (e.target.value.match(/\D/g)) {
          el.style.border = '1px solid red';
          return;
        } else {
          el.style.border = 'none';
        }

        switch (id) {
          case 'age':
            age = +e.target.value;
            break;
          case 'height':
            height = +e.target.value;
            break;
          case 'weight':
            weight = +e.target.value;
            break;
        }

        calcCalories();
      })
    );
  }

  function calcCalories() {
    if (!sex || !weight || !height || !age || !ratio) {
      calcEl.textContent = '_____';
      return;
    }

    if (sex === 'female') {
      calcEl.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      calcEl.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  function initLocalData(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      el.classList.remove(activeClass);

      if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        el.classList.add(activeClass);
      }
      if (el.getAttribute('id') === localStorage.getItem('sex')) {
        el.classList.add(activeClass);
      }
    });
  }
});
