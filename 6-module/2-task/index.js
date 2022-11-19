import createElement from "../../assets/lib/create-element.js";
export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.cardImageSrc = product.image;
    this.cardPrice = product.price.toFixed(2);
    this.cardTitle = product.name;

    this.elem = this._createElement();

    this._getBuyButton().addEventListener("click", (e) => {
      this._onBuyClick(e);
    });
    this._doOnBuyButton();
  }

  _createElement() {
    return createElement(`
		<div class="card">
			<div class="card__top">
				<img src="/assets/images/products/${this.cardImageSrc}" class="card__image" alt="product">
				<span class="card__price">€${this.cardPrice}</span>
			</div>
			<div class="card__body">
				<div class="card__title">${this.cardTitle}</div>
				<button type="button" class="card__button">
					<img src="/assets/images/icons/plus-icon.svg" alt="icon">
				</button>
			</div>
		</div>
	`);
  }

  _getBuyButton() {
    const buyButton = this.elem.querySelector(".card__button");
    return buyButton;
  }

  _onBuyClick = (e) => {
    console.log("clickBuy");
    const BuyClickEvent = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true,
    });
    this.elem.dispatchEvent(BuyClickEvent);
  };

  _doOnBuyButton() {
    this.elem.addEventListener("product-add", (e) => {
      console.log("CustomEvent: 'product-add':", e);
    });
  }
}
