import {createElement} from "./utils";

export default class MainNavigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<nav class="main-navigation">
        ${Array.from(this._filters).map(({title, link, isActive, isAdditional, haveCount, count}) => `
          <a
            href="#${link}"
            class="main-navigation__item${isActive ? ` main-navigation__item--active` : ``}${isAdditional ? ` main-navigation__item--additional` : ``}"
           >${title}${haveCount ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>
        `).join(``)}
      </nav>
    `;
  }
}
