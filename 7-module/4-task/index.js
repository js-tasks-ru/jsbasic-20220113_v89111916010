import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;
    this.render();

    this.addEventListeners();

    this.setValue(value);
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${"<span></span>".repeat(this.steps)}
        </div>
      </div>
    `);
  }

  setValue(value) {
    this.value = value;

    let valuePercents = (value / this.segments) * 100;

    this.sub("thumb").style.left = `${valuePercents}%`;
    this.sub("progress").style.width = `${valuePercents}%`;

    this.sub("value").innerHTML = value;

    if (this.sub("step-active")) {
      this.sub("step-active").classList.remove("slider__step-active");
    }

    this.sub("steps").children[this.value].classList.add("slider__step-active");
  }

  setDynamicValue(value, valuePercents) {
    this.value = value;

    this.sub("thumb").style.left = `${valuePercents}%`;
    this.sub("progress").style.width = `${valuePercents}%`;

    this.sub("value").innerHTML = value;

    if (this.sub("step-active")) {
      this.sub("step-active").classList.remove("slider__step-active");
    }

    this.sub("steps").children[this.value].classList.add("slider__step-active");
  }

  addEventListeners() {
    this.elem.onclick = this.onClick;
    this.sub("thumb").addEventListener("pointerdown", this.onPointerDown);
    // this.sub("thumb").ondragstart = () => false;
  }

  onClick = (event) => {
    let newLeft =
      (event.clientX - this.elem.getBoundingClientRect().left) /
      this.elem.offsetWidth;

    this.setValue(Math.round(this.segments * newLeft));

    this.dispatchEvent();
  };

  dispatchEvent() {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  onPointerDown = (e) => {
    document.addEventListener("pointermove", this.onPointerMove);
    document.addEventListener("pointerup", this.onPointerUp, { once: true });
    // return false;
  };

  onPointerMove = (e) => {
    // console.log("onPointerMove Client:", e.clientX, ":", e.clientY);
    // console.log("onPointerMove   Page:", e.pageX, ":", e.pageY);

    this._addActiveClass();

    let leftRelative =
      (e.clientX - this.elem.getBoundingClientRect().left) /
      this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;

    this.setDynamicValue(
      Math.round(this.segments * leftRelative),
      leftPercents
    );

    // return false;
  };

  onPointerUp = (e) => {
    document.removeEventListener("pointermove", this.onPointerMove);

    this._removeActiveClass();

    this.dispatchEvent();

    this.setValue(this.value);
  };

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }

  _addActiveClass() {
    const existClass = this.elem.classList.contains("slider_dragging");

    if (!existClass) {
      this.elem.classList.add("slider_dragging");
    }
  }

  _removeActiveClass() {
    const existClass = this.elem.classList.contains("slider_dragging");

    if (existClass) {
      this.elem.classList.remove("slider_dragging");
    }
  }
}
