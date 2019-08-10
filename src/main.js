import {createSearchTemplate} from './components/search';
import {createProfileTemplate} from './components/profile';
import {createMainNavigationTemplate} from './components/main-navigation';
import {createSortTemplate} from './components/sort';
import {createFilmsTemplate} from './components/films';
import {createShowMoreTemplate} from './components/show-more';
import {createFilmCardTemplate} from './components/film-card';
import {createFilmDetailsTemplate} from './components/film-details';

const render = (container, block, place = `beforeend`) => {
  container.insertAdjacentHTML(place, block);
};

const renderCards = (container, block, qty) => {
  for (let i = 0; i < qty; i++) {
    render(container, block);
  }
};

render(document.querySelector(`.header`), createSearchTemplate());
render(document.querySelector(`.header`), createProfileTemplate());
render(document.querySelector(`.main`), createMainNavigationTemplate());
render(document.querySelector(`.main`), createSortTemplate());
render(document.querySelector(`.main`), createFilmsTemplate());
render(document.querySelector(`.films-list`), createShowMoreTemplate());

renderCards(document.querySelectorAll(`.films-list__container`)[0], createFilmCardTemplate(), 5);
renderCards(document.querySelectorAll(`.films-list__container`)[1], createFilmCardTemplate(), 2);
renderCards(document.querySelectorAll(`.films-list__container`)[2], createFilmCardTemplate(), 2);

render(document.querySelector(`.footer`), createFilmDetailsTemplate(), `afterend`);
