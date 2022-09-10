import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this._createBody();
    this._buildSlides();

    this._initCarousel();
  }

  _initCarousel() {
    let currentSlideNumber = 0;
    let slidesAmount = this.slides.length;
    let elem = this.elem;

    let carouselInnerElem = elem.querySelector(".carousel__inner");
    let carouselArrowRight = elem.querySelector(".carousel__arrow_right");
    let carouselArrowLeft = elem.querySelector(".carousel__arrow_left");

    update();

    elem.onclick = ({ target }) => {
      if (target.closest(".carousel__arrow_right")) {
        next();
      }

      if (target.closest(".carousel__arrow_left")) {
        prev();
      }
    };

    function next() {
      currentSlideNumber++;
      update();
    }

    function prev() {
      currentSlideNumber--;
      update();
    }

    function update() {
      let offset = -carouselInnerElem.offsetWidth * currentSlideNumber;
      carouselInnerElem.style.transform = `translateX(${offset}px)`;

      if (currentSlideNumber == slidesAmount - 1) {
        carouselArrowRight.style.display = "none";
      } else {
        carouselArrowRight.style.display = "";
      }

      if (currentSlideNumber == 0) {
        carouselArrowLeft.style.display = "none";
      } else {
        carouselArrowLeft.style.display = "";
      }
    }
  }

  _buildSlides() {
    const slides = this.slides;
    slides.forEach((el) => this._buildSlide(el));
  }

  _createBody() {
    let body = createElement(
      `
				<div class="carousel">
					<div class="carousel__arrow carousel__arrow_right">
						<img src="/assets/images/icons/angle-icon.svg" alt="icon">
					</div>
					<div class="carousel__arrow carousel__arrow_left">
						<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
					</div>

					<div class="carousel__inner">
					</div>
				</div>
			`
    );
    return body;
  }

  _buildSlide({ id, image, price, name }) {
    const viewPrice = price.toFixed(2);
    const slide = createElement(
      `
				<div class="carousel__slide" data-id="${id}">
					<img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
					<div class="carousel__caption">
						<span class="carousel__price">€${viewPrice}</span>
						<div class="carousel__title">${name}</div>
						<button type="button" class="carousel__button">
							<img src="/assets/images/icons/plus-icon.svg" alt="icon">
						</button>
					</div>
				</div>
			`
    );
    const elem = this.elem;

    const button = slide.querySelector(".carousel__button");
    button.addEventListener("click", () => {
      const BuyClickEvent = new CustomEvent("product-add", {
        detail: id,
        bubbles: true,
      });
      elem.dispatchEvent(BuyClickEvent);
    });

    elem.querySelector(".carousel__inner").append(slide);
  }
}
