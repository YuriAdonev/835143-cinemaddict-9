import Card from "../components/film-card";
import Details from "../components/film-details";
import {Position, render, unrender} from "../utils";
import ShowMore from "../components/show-more";
import FilmsList from "../components/films-list";
import TopRated from "../components/top-rated";
import MostCommented from "../components/most-commented";
import Sort from "../components/sort";
import Films from "../components/films";

export default class PageController {
  constructor(container, cards) {
    this._DEFAULT_CARD_COUNT_TO_LOAD = 5;
    this._TOP_RATED_COUNT = 2;
    this._MOST_COMMENTED_COUNT = 2;
    this._container = container;
    this._cards = cards;
    this._sortedCards = this._cards.slice();
    this._shownCards = 0;
    this._showMore = new ShowMore();
    this._filmsList = new FilmsList();
    this._topRated = new TopRated();
    this._mostCommented = new MostCommented();
    this._sort = new Sort();
    this._films = new Films();
  }

  init() {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._films.getElement(), Position.BEFOREEND);
    render(this._films.getElement(), this._filmsList.getElement(), Position.BEFOREEND);
    render(this._films.getElement(), this._topRated.getElement(), Position.BEFOREEND);
    render(this._films.getElement(), this._mostCommented.getElement(), Position.BEFOREEND);

    if (this._sortedCards.length > this._DEFAULT_CARD_COUNT_TO_LOAD) {
      render(this._filmsList.getElement(), this._showMore.getElement(), Position.BEFOREEND);
    }

    this._loadMoreCards();

    this._renderSortedCards(this._topRated.getElement().querySelector(`.films-list__container`), this._TOP_RATED_COUNT, this._getTopRated());
    this._renderSortedCards(this._mostCommented.getElement().querySelector(`.films-list__container`), this._MOST_COMMENTED_COUNT, this._getMostCommented());

    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    this._showMore.getElement().addEventListener(`click`, () => {
      this._loadMoreCards();
    });
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.getAttribute(`data-sort-type`) !== null) {
      this._sort.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);

      switch (evt.target.getAttribute(`data-sort-type`)) {
        case `by-date`:
          this._sortedCards = this._cards.slice().sort((a, b) => {
            return b.releaseDate - a.releaseDate;
          });
          break;
        case `by-rating`:
          this._sortedCards = this._getTopRated();
          break;
        default:
          this._sortedCards = this._cards.slice();
      }

      evt.target.classList.add(`sort__button--active`);

      unrender(this._filmsList.getElement());
      this._filmsList.removeElement();
      this._hideCardsLoader();

      this._filmsList = new FilmsList();

      render(this._films.getElement(), this._filmsList.getElement(), Position.AFTERBEGIN);
      if (this._sortedCards.length > this._DEFAULT_CARD_COUNT_TO_LOAD) {
        render(this._filmsList.getElement(), this._showMore.getElement(), Position.BEFOREEND);
      }

      this._shownCards = 0;
      this._loadMoreCards();
    }
  }

  _renderSortedCards(container, count, arr) {
    for (let i = 0; i < count; i++) {
      this._renderCard(container, arr[i]);
    }
  }

  _getMostCommented() {
    return this._cards.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
  }

  _getTopRated() {
    return this._cards.slice().sort((a, b) => {
      return Number.parseFloat(b.rating) - Number.parseFloat(a.rating);
    });
  }

  _hideCardsLoader() {
    unrender(this._showMore.getElement());
  }

  _renderCards(cardToShow) {
    for (let i = 0; i < cardToShow; i++) {
      this._renderCard(this._filmsList.getElement().querySelector(`.films-list__container`), this._sortedCards[this._shownCards]);
      this._shownCards++;
    }
  }

  _loadMoreCards() {
    let restCards = this._sortedCards.length - this._shownCards;
    let cardToShow = 0;

    if (restCards <= this._DEFAULT_CARD_COUNT_TO_LOAD) {
      this._hideCardsLoader();
      cardToShow = restCards;
    } else {
      cardToShow = this._DEFAULT_CARD_COUNT_TO_LOAD;
    }

    this._renderCards(cardToShow);
  }

  _renderCard(container, cardMock) {
    const card = new Card(cardMock);
    const details = new Details(cardMock);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(details.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    card.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        render(document.querySelector(`body`), details.getElement(), Position.BEFOREEND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    card.getElement()
      .querySelector(`.film-card__poster`)
      .addEventListener(`click`, () => {
        render(document.querySelector(`body`), details.getElement(), Position.BEFOREEND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    card.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        render(document.querySelector(`body`), details.getElement(), Position.BEFOREEND);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    details.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        unrender(details.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    details.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    details.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    render(container, card.getElement(), Position.BEFOREEND);
  }
}
