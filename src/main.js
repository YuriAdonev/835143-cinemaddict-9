import {render, Position} from "./utils";
import {cards, filters} from './data';
import Search from './components/search';
import Profile from './components/profile';
import MainNavigation from './components/main-navigation';
import Sort from './components/sort';
import Films from './components/films';
import PageController from "./controllers/page";

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

const search = new Search();
const profile = new Profile(getProfileRating());
const mainNavigation = new MainNavigation(filters);
const sort = new Sort();
const films = new Films();


render(document.querySelector(`.header`), search.getElement(), Position.BEFOREEND);
render(document.querySelector(`.header`), profile.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), mainNavigation.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), sort.getElement(), Position.BEFOREEND);
render(document.querySelector(`.main`), films.getElement(), Position.BEFOREEND);

showFooterStatistics();

const pageController = new PageController(document.querySelector(`.films-list`), cards);

pageController.init();
