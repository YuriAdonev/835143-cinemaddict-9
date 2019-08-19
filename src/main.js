import {cards, filters} from './components/data';
import {createSearchTemplate} from './components/search';
import {createProfileTemplate} from './components/profile';
import {createMainNavigationTemplate} from './components/main-navigation';
import {createSortTemplate} from './components/sort';
import {createFilmsTemplate} from './components/films';
import {createShowMoreTemplate} from './components/show-more';
import {createFilmCardTemplate} from './components/film-card';
import {createFilmDetailsTemplate} from './components/film-details';

const DEFAULT_CARD_COUNT_TO_LOAD = 5;

let shownCards = 0;
let totalCards = cards.length;

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
    render(document.querySelectorAll(`.films-list__container`)[0], createFilmCardTemplate(cards[shownCards]));
    shownCards++;
  }
};

const hideCardsLoader = () => {
  document.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
};

const render = (container, block, place = `beforeend`) => {
  container.insertAdjacentHTML(place, block);
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

const showFooterStatistics = () => {
  document.querySelector(`.footer__statistics p`).textContent = `${cards.length} movies inside`;
};

render(document.querySelector(`.header`), createSearchTemplate());
render(document.querySelector(`.header`), createProfileTemplate(getProfileRating()));
render(document.querySelector(`.main`), createMainNavigationTemplate(filters));
render(document.querySelector(`.main`), createSortTemplate());
render(document.querySelector(`.main`), createFilmsTemplate());
render(document.querySelector(`.films-list`), createShowMoreTemplate());

loadMoreCards();

render(document.querySelectorAll(`.films-list__container`)[1], createFilmCardTemplate(cards[0]));
render(document.querySelectorAll(`.films-list__container`)[2], createFilmCardTemplate(cards[1]));

render(document.querySelector(`.footer`), createFilmDetailsTemplate(cards[0]), `afterend`);

showFooterStatistics();

document.querySelector(`.films-list__show-more`).addEventListener(`click`, () => {
  loadMoreCards();
});
