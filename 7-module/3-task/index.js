export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._render(value);
    this._steps(steps);
    this._eventListener(steps, value);
    this._load(steps, value);
  }

  _render(value) {
    this.elem = this._createElement(
      `
      <!--Корневой элемент слайдера-->
      <div class="slider">
    
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value">${value}</span>
        </div>
    
        <!--Заполненная часть слайдера-->
        <div class="slider__progress"></div>
    
        <!--Шаги слайдера-->
        <div class="slider__steps">
        </div>
      </div>
      `
    );
  }

  _steps(steps) {
    let elements = "";
    for (let i = 0; i < steps; i++) {
      elements += "<span></span>";
    }
    this.elem
      .querySelector(".slider__steps")
      .insertAdjacentHTML("beforeend", elements);
  }

  _eventListener(steps, value) {
    this.elem.onclick = (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = (value / segments) * 100;
      this._update(value, valuePercents);
      this._sliderChange(value);
    };
  }

  _sliderChange(value) {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: value,
        bubbles: true,
      })
    );
  }

  _valuePercents(steps, value) {
    return (value / (steps - 1)) * 100;
  }

  _load(steps, value) {
    const body = this.elem;
    body.querySelector(".slider__value").innerHTML = value;
    body
      .querySelector(".slider__steps")
      .querySelectorAll("span")
      [value].classList.add("slider__step-active");
    body.querySelector(".slider__thumb").style.left = `${this._valuePercents(
      steps,
      value
    )}%`;
    body.querySelector(
      ".slider__progress"
    ).style.width = `${this._valuePercents(steps, value)}%`;
  }

  _update(value, valuePercents) {
    const body = this.elem;

    body
      .querySelector(".slider__steps")
      .querySelectorAll("span.slider__step-active")
      .forEach((elem) => {
        elem.classList.remove("slider__step-active");
      });
    body
      .querySelector(".slider__steps")
      .querySelectorAll("span")
      [value].classList.add("slider__step-active");
    body.querySelector(".slider__thumb").style.left = `${valuePercents}%`;
    body.querySelector(".slider__progress").style.width = `${valuePercents}%`;
  }

  _createElement(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.firstElementChild;
  }
}
