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

render(document.querySelector(`.header`), createSearchTemplate());
render(document.querySelector(`.header`), createProfileTemplate());
render(document.querySelector(`.main`), createMainNavigationTemplate());
render(document.querySelector(`.main`), createSortTemplate());
render(document.querySelector(`.main`), createFilmsTemplate());
render(document.querySelector(`.films-list`), createShowMoreTemplate());

for (let i = 0; i < 5; i++) {
  render(document.querySelectorAll(`.films-list__container`)[0], createFilmCardTemplate());
}

for (let i = 0; i < 2; i++) {
  render(document.querySelectorAll(`.films-list__container`)[1], createFilmCardTemplate());
}

for (let i = 0; i < 2; i++) {
  render(document.querySelectorAll(`.films-list__container`)[2], createFilmCardTemplate());
}

render(document.querySelector(`.footer`), createFilmDetailsTemplate(), `afterend`);
