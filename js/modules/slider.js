function slider() {
  function addZero(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

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
}

module.exports = slider;
