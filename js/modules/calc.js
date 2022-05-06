function calc() {
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
}

module.exports = calc;
