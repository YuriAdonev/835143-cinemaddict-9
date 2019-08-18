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

const generateDescription = () => {
  const newDescription = [];
  for (let i = 0; i <= (Math.floor(Math.random() * 2) + 1); i++) {
    newDescription.push(descriptions[Math.floor(Math.random() * descriptions.length)]);
  }
  return newDescription.join(` `);
};

const generateCard = (count) => ({
  title: titles[count],
  titleOriginal: `Original: ${titles[count]}`,
  description: generateDescription(),
  rating: `8.3`,
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
      ][Math.floor(Math.random() * 4)],
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
      ][Math.floor(Math.random() * 5)],
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
  ][Math.floor(Math.random() * 7)],
  isWatchlist: Boolean(Math.round(Math.random())),
  isFavorites: Boolean(Math.round(Math.random())),
  isWatched: Boolean(Math.round(Math.random())),
});

const generateCardsList = () => {
  for (let i = 0; i < COUNT_CARDS; i++) {
    cards.push(generateCard(i));
  }
};

const generateFilters = () => {
  filterTitles.forEach((filter) => {
    let title;
    let link;
    let count;
    let isActive;
    let isAdditional;
    let haveCount;
    switch (filter) {
      case `All movies`:
        title = filter;
        link = `all`;
        count = ``;
        isActive = true;
        isAdditional = false;
        haveCount = false;
        break;
      case `Watchlist`:
        title = filter;
        link = filter.toLowerCase();
        count = cards.filter((card) => card.isWatchlist).length;
        isActive = false;
        isAdditional = false;
        haveCount = true;
        break;
      case `History`:
        title = filter;
        link = filter.toLowerCase();
        count = cards.filter((card) => card.isWatched).length;
        isActive = false;
        isAdditional = false;
        haveCount = true;
        break;
      case `Favorites`:
        title = filter;
        link = filter.toLowerCase();
        count = cards.filter((card) => card.isFavorites).length;
        isActive = false;
        isAdditional = false;
        haveCount = true;
        break;
      case `Stats`:
        title = filter;
        link = filter.toLowerCase();
        count = ``;
        isActive = false;
        isAdditional = true;
        haveCount = false;
        break;
    }
    filters.push({
      title,
      count,
      link,
      isActive,
      isAdditional,
      haveCount,
    });
  });
};

generateCardsList();
generateFilters();
