import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this._createBody();
    this.globalBody = document.body;
    this._addEventListener();
  }

  open() {
    this.globalBody.classList.add("is-modal-open");
    this.globalBody.append(this.modalBody);
  }

  close() {
    this.globalBody.classList.remove("is-modal-open");
    if (this.globalBody.querySelector(".modal")) {
      this.globalBody.querySelector(".modal").remove();
    }
    this.globalBody.removeEventListener("keydown", this._keydown);
  }

  setTitle(text) {
    this._sub("title").innerHTML = text;
  }

  setBody(text) {
    const body = this._sub("body");
    body.innerHTML = "";
    body.append(text);
  }

  _createBody() {
    this.modalBody = createElement(
      `
      <!--Корневой элемент Modal-->
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>
    
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
    
            <h3 class="modal__title">
              Вот сюда нужно добавлять заголовок
            </h3>
          </div>
    
          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
    
      </div>
      `
    );
  }

  _addEventListener() {
    this.modalBody.onclick = (e) => {
      if (e.target.closest(".modal__close")) {
        this.close();
      }
    };

    this.globalBody.addEventListener("keydown", this._keydown);
  }

  _keydown = (e) => {
    if (e.code === "Escape") {
      this.close();
    }
  };

  _sub(ref) {
    return this.modalBody.querySelector(`.modal__${ref}`);
  }
}
