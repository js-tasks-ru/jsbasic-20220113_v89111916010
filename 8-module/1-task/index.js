import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
    this.oneTime = true;
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth) {
      this._defaultCartPosition();
      this._checkCartVisible();
      this._leftIndent();
    }
  }

  _leftIndent() {
    this.leftIndent =
      Math.min(
        document.querySelector(".container").getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      ) + "px";
  }

  _defaultCartPosition() {
    if (this.oneTime) {
      this.initialTopCoord =
        this.elem.getBoundingClientRect().top + window.pageYOffset;
      this.oneTime = false;
    }
  }

  _checkCartVisible() {
    let actualLeftIndent = Math.round(this.elem.getBoundingClientRect().left);
    let expectedLeftIndent = Math.round(document.querySelector('.container').getBoundingClientRect().right) + 20;
    console.log('actualLeftIndent:', actualLeftIndent);
    console.log('expectedLeftIndent:', expectedLeftIndent);
    if (window.pageYOffset > this.initialTopCoord && document.documentElement.clientWidth >= 767) {
      // плавающая корзина
      console.log("плавающая корзина");
      this._positionFixed();
    } else {
      // корзина сверху
      console.log("корзина сверху");
      this._positionDefault();
    }
  }

  _positionFixed() {
    Object.assign(this.elem.style, {
      position: "fixed",
      top: "50px",
      zIndex: 1e3,
      right: "10px",
      left: this.leftIndent,
    });
  }

  _positionDefault() {
    Object.assign(this.elem.style, {
      position: "",
      top: "",
      left: "",
      zIndex: "",
    });
  }
}
