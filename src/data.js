const COUNT_CARDS = 17;

export const cards = [];
export const filters = [];

const titles = [
  `Однажды в… Голливуде`,
  `Форсаж: Хоббс и Шоу`,
  `Король Лев`,
  `Али, рули!`,
  `Человек-паук: Вдали от дома`,
  `Паразиты`,
  `Проклятие Аннабель 3`,
  `Собачья жизнь 2`,
  `История игрушек 4`,
  `Люди в черном: Интернэшнл`,
  `Люди Икс: Тёмный Феникс`,
  `Мертвые не умирают`,
  `Форрест Гамп`,
  `Список Шиндлера`,
  `Зеленая миля`,
  `Властелин колец: Возвращение Короля`,
  `Криминальное чтиво`,
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const filterTitles = [
  `All movies`,
  `Watchlist`,
  `History`,
  `Favorites`,
  `Stats`,
];

const getRandomNumber = (maxValue) => {
  return Math.floor(Math.random() * maxValue);
};

const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

const generateDescription = () => {
  const newDescription = [];
  for (let i = 0; i <= (getRandomNumber(2) + 1); i++) {
    newDescription.push(descriptions[getRandomNumber(descriptions.length)]);
  }
  return newDescription.join(` `);
};

const generateCard = (count) => ({
  title: titles[count],
  titleOriginal: `Original: ${titles[count]}`,
  description: generateDescription(),
  rating: (Math.floor(Math.random() * 100) / 10).toString(),
  director: `Anthony Mann`,
  writers: `Anne Wigton, Heinz Heral, Richard Weil`,
  actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
  year: `1945`,
  releaseDate: `30 March 1945`,
  duration: `1h 55m`,
  country: `USA`,
  genres: [
    `Drama`,
    `Film-Noir`,
    `Mystery`,
  ],
  age: `18+`,
  comments: [
    {
      emoji: [
        `smile.png`,
        `sleeping.png`,
        `puke.png`,
        `angry.png`,
      ][getRandomNumber(4)],
      text: `Interesting setting and a good cast`,
      author: `Tim Macoveev`,
      date: `3 days ago`,
    },
    {
      emoji: [
        `smile.png`,
        `sleeping.png`,
        `puke.png`,
        `angry.png`,
        `trophy.png`,
      ][getRandomNumber(5)],
      text: `Interesting setting and a good cast`,
      author: `Tim Macoveev`,
      date: `3 days ago`,
    },
  ],
  poster: [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ][getRandomNumber(7)],
  isWatchlist: getRandomBoolean(),
  isFavorites: getRandomBoolean(),
  isWatched: getRandomBoolean(),
});

const generateCardsList = () => {
  for (let i = 0; i < COUNT_CARDS; i++) {
    cards.push(generateCard(i));
  }
};

const makeFilterItem = (title, link, count, isActive, isAdditional, haveCount) => {
  return {
    title,
    link,
    count,
    isActive,
    isAdditional,
    haveCount,
  };
};

const generateFilters = () => {
  filterTitles.forEach((filter) => {
    let filterItem;
    switch (filter) {
      case `All movies`:
        filterItem = makeFilterItem(filter, `all`, ``, true, false, false);
        break;
      case `Watchlist`:
        filterItem = makeFilterItem(filter, filter.toLowerCase(), cards.filter((card) => card.isWatchlist).length, false, false, true);
        break;
      case `History`:
        filterItem = makeFilterItem(filter, filter.toLowerCase(), cards.filter((card) => card.isWatched).length, false, false, true);
        break;
      case `Favorites`:
        filterItem = makeFilterItem(filter, filter.toLowerCase(), cards.filter((card) => card.isFavorites).length, false, false, true);
        break;
      case `Stats`:
        filterItem = makeFilterItem(filter, filter.toLowerCase(), ``, false, true, false);
        break;
    }
    filters.push(filterItem);
  });
};

generateCardsList();
generateFilters();
