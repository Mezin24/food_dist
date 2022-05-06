function cards() {
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
}

module.exports = cards;
