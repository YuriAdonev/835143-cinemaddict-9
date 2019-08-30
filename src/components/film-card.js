import {createElement} from "./utils";

export default class Card {
  constructor({title, poster, description, comments, isWatchlist, isWatched, isFavorites, genres, duration, year, rating}) {
    this._description = description;
    this._title = title;
    this._poster = poster;
    this._comments = comments;
    this._genres = genres;
    this._duration = duration;
    this._year = year;
    this._rating = rating;
    this._isWatchlist = isWatchlist;
    this._isWatched = isWatched;
    this._isFavorites = isFavorites;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._duration}</span>
          <span class="film-card__genre">${this._genres[0]}</span>
        </p>
        <img src="./images/posters/${this._poster}" alt="${this._title}" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <a class="film-card__comments">${this._comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${this._isWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${this._isWatched ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite${this._isFavorites ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
        </form>
      </article>
    `;
  }
}
