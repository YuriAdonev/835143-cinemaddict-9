export const createMainNavigationTemplate = (filters) => `
  <nav class="main-navigation">
    ${Array.from(filters).map(({title, link, isActive, isAdditional, haveCount, count}) => `
      <a
        href="#${link}"
        class="main-navigation__item${isActive ? ` main-navigation__item--active` : ``}${isAdditional ? ` main-navigation__item--additional` : ``}"
       >${title}${haveCount ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>
    `).join(``)}
  </nav>
`;
