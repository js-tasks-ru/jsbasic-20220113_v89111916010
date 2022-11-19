import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this._render();
    this._addEventListeners();
  }

  _render() {
    this.elem = createElement(`
      <!--Корневой элемент RibbonMenu-->
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
    
        <!--Ссылки на категории-->
        <nav class="ribbon__inner"></nav>
    
        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    let slides = this.categories.map((item) =>
      createElement(`
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `)
    );

    this._sub("inner").append(...slides);
  }

  _addEventListeners() {
    this.elem.onclick = (e) => {
      if (e.target.closest(".ribbon__arrow_right")) {
        this._next();
      }

      if (e.target.closest(".ribbon__arrow_left")) {
        this._prev();
      }

      if (e.target.closest(".ribbon__item")) {
        e.preventDefault();
        this._link(e);
        this._ribbonSelect(e);
      }
    };

    this._sub("inner").onscroll = ({ target }) => {
      let scrollWidth = target.scrollWidth;
      let scrollLeft = target.scrollLeft;
      let clientWidth = target.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollRight > 1) {
        this._sub("arrow_right").classList.add("ribbon__arrow_visible");
      } else {
        this._sub("arrow_right").classList.remove("ribbon__arrow_visible");
      }

      if (scrollLeft != 0) {
        this._sub("arrow_left").classList.add("ribbon__arrow_visible");
      } else {
        this._sub("arrow_left").classList.remove("ribbon__arrow_visible");
      }
    };
  }

  _sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  _next() {
    this.argument = 1;
    this._update();
  }

  _prev() {
    this.argument = -1;
    this._update();
  }

  _update() {
    let offset = 350 * this.argument;
    this._sub("inner").scrollBy(offset, 0);
  }

  _link(e) {
    if (
      e.target.closest(".ribbon__inner").querySelector(".ribbon__item_active")
    ) {
      e.target
        .closest(".ribbon__inner")
        .querySelectorAll(".ribbon__item.ribbon__item_active")
        .forEach((element) => {
          element.classList.remove("ribbon__item_active");
        });
    }
    e.target.classList.add("ribbon__item_active");
  }

  _ribbonSelect(e) {
    this.elem.dispatchEvent(
      new CustomEvent("ribbon-select", {
        detail: e.target.dataset.id,
        bubbles: true,
      })
    );
  }
}
