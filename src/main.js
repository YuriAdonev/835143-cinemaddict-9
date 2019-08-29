import {render, unrender, Position} from "./components/utils";
import {cards, filters} from './components/data';
import Search from './components/search';
import Profile from './components/profile';
import MainNavigation from './components/main-navigation';
import Sort from './components/sort';
import Films from './components/films';
import ShowMore from './components/show-more';
import Card from './components/film-card';
import Details from './components/film-details';

const DEFAULT_CARD_COUNT_TO_LOAD = 5;
const TOP_RATED_COUNT = 2;
const MOST_COMMENTED_COUNT = 2;

let shownCards = 0;
let totalCards = cards.length;

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
    renderCard(document.querySelectorAll(`.films-list__container`)[0], cards[shownCards]);
    shownCards++;
  }
};

const hideCardsLoader = () => {
  unrender(showMore.getElement());
};

const getProfileRating = () => {
  const watched = cards.filter((card) => card.isWatched);
  let rating;

  if (watched.length === 0) {
    rating = ``;
  }

  if (watched.length > 0 && watched.length <= 10) {
    rating = `Novice`;
  }

  if (watched.length > 10 && watched.length <= 20) {
    rating = `Fan`;
  }

  if (watched.length > 20) {
    rating = `Movie Buff`;
  }
  return rating;
};

const getTopRated = () => {
  return cards.slice().sort((a, b) => {
    return parseInt(b.rating, 10) - parseInt(a.rating, 10);
  });
};

const getMostCommented = () => {
  return cards.slice().sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
};

const renderSortedCards = (container, count, arr) => {
  for (let i = 0; i < count; i++) {
    renderCard(container, arr[i]);
  }
};

const showFooterStatistics = () => {
  document.querySelector(`.footer__statistics p`).textContent = `${cards.length} movies inside`;
};

const search = new Search();
const profile = new Profile(getProfileRating());
const mainNavigation = new MainNavigation(filters);
const sort = new Sort();
const films = new Films();
const showMore = new ShowMore();

render(document.querySelector(`.header`), search.getElement(), Position.BEFOREEND);
render(document.querySelector(`.header`), profile.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), mainNavigation.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), sort.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), films.getElement(), Position.BEFOREEND);
render(document.querySelector(`.films-list`), showMore.getElement(), Position.BEFOREEND);

loadMoreCards();

renderSortedCards(document.querySelectorAll(`.films-list__container`)[1], TOP_RATED_COUNT, getTopRated());
renderSortedCards(document.querySelectorAll(`.films-list__container`)[2], MOST_COMMENTED_COUNT, getMostCommented());

showFooterStatistics();

showMore.getElement().addEventListener(`click`, () => {
  loadMoreCards();
});
