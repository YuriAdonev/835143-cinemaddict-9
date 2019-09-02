import Card from "../components/film-card";
import Details from "../components/film-details";
import {Position, render, unrender} from "../utils";
import ShowMore from "../components/show-more";

export default class PageController {
  constructor(container, cards) {
    this._container = container;
    this._cards = cards;
  }

  init() {
    const DEFAULT_CARD_COUNT_TO_LOAD = 5;
    const TOP_RATED_COUNT = 2;
    const MOST_COMMENTED_COUNT = 2;

    let shownCards = 0;
    let totalCards = this._cards.length;

    const renderCard = (container, cardMock) => {
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
    };

    const loadMoreCards = () => {
      let restCards = totalCards - shownCards;
      let cardToShow = 0;

      if (restCards <= DEFAULT_CARD_COUNT_TO_LOAD) {
        hideCardsLoader();
        cardToShow = restCards;
      } else {
        cardToShow = DEFAULT_CARD_COUNT_TO_LOAD;
      }

      renderCards(cardToShow);
    };

    const renderCards = (cardToShow) => {
      for (let i = 0; i < cardToShow; i++) {
        renderCard(document.querySelectorAll(`.films-list__container`)[0], this._cards[shownCards]);
        shownCards++;
      }
    };

    const hideCardsLoader = () => {
      unrender(showMore.getElement());
    };

    const getTopRated = () => {
      return this._cards.slice().sort((a, b) => {
        return parseInt(b.rating, 10) - parseInt(a.rating, 10);
      });
    };

    const getMostCommented = () => {
      return this._cards.slice().sort((a, b) => {
        return b.comments.length - a.comments.length;
      });
    };

    const renderSortedCards = (container, count, arr) => {
      for (let i = 0; i < count; i++) {
        renderCard(container, arr[i]);
      }
    };

    const showMore = new ShowMore();

    render(this._container, showMore.getElement(), Position.BEFOREEND);

    loadMoreCards();

    renderSortedCards(document.querySelectorAll(`.films-list__container`)[1], TOP_RATED_COUNT, getTopRated());
    renderSortedCards(document.querySelectorAll(`.films-list__container`)[2], MOST_COMMENTED_COUNT, getMostCommented());

    showMore.getElement().addEventListener(`click`, () => {
      loadMoreCards();
    });
  }
}
