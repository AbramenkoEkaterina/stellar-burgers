describe('конструктор бургера — без авторизации', () => {
  beforeEach(() => {
    //мокаю ингридиенты
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    //при переход на главную 
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляем булку и начинку в конструктор', () => {
    // Добавляем булку
    cy.get('[data-testid="add-ingredient-643d69a5c3f7b9001cfa093d"]')
      .find('button')
      .click();

    // Добавляем начинку
    cy.get('[data-testid="add-ingredient-643d69a5c3f7b9001cfa0946"]')
      .find('button')
      .click();

    // Проверяем, что булка добавилась по тексту (верх и низ)
    cy.get(`[data-testid="constructor-bun-top-643d69a5c3f7b9001cfa093d"]`, {
      timeout: 1000
    }).should('exist');
    cy.get(`[data-testid="constructor-bun-bottom-643d69a5c3f7b9001cfa093d"]`, {
      timeout: 1000
    }).should('exist');

    // Проверяем, что начинка добавилась
    cy.get('[data-testid="burger-constructor"]')
      .contains('Хрустящие минеральные кольца', { timeout: 10000 })
      .should('exist');
  });

  it('открытие и закрытие модального окна ингридиента', () => {
    //открываем модалку по клику на карточку
    cy.get('[data-testid="ingredient-card-643d69a5c3f7b9001cfa093d"]').click();

    //проверяем что модалка открыта
    cy.get('[data-testid="ingredient-modal"]').should('be.visible');

    //проверяем что внутри ингридиент тот, по которуму кликнула
    cy.get('[data-testid="ingredient-modal"]')
      .contains('Флюоресцентная булка R2-D3')
      .should('exist');

    //закрытие крестиком
    cy.get('[data-testid="close-modal"]').click();
    cy.get('[data-testid="ingredient-modal"]').should('not.exist');

    // открываем снова чтоб закрыть по оверлею
    cy.get('[data-testid="ingredient-card-643d69a5c3f7b9001cfa093d"]').click();

    //проверяем что модалка открыта
    cy.get('[data-testid="ingredient-modal"]').should('be.visible');

    // закрытие по оверлею
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="ingredient-modal"]').should('not.exist');
  });
});

describe('конструктор бургера — создание заказа (авторизованный пользователь)', () => {
  beforeEach(() => {
    //мокаю ингридиенты
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    //мокаю пользователя
    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    //мокаю создание заказа
    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    //подставляю токены для авторизации пользователя
    cy.visit('/', {
      onBeforeLoad(win) {
        win.document.cookie = 'accessToken=Bearer test-access-token';
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      }
    });

    //жду загрузку ингридиентов
    cy.wait('@getIngredients');
  });

  it('создание заказа', () => {
    //собираю бургер
    cy.get('[data-testid="add-ingredient-643d69a5c3f7b9001cfa093d"]')
      .find('button')
      .click();

    cy.get('[data-testid="add-ingredient-643d69a5c3f7b9001cfa0946"]')
      .find('button')
      .click();

    //оформляю
    cy.contains('Оформить заказ').click();

    //запрос создания заказа
    cy.wait('@createOrder');

    //проверяю модалку
    cy.get('[data-testid="ingredient-modal"]')
      .contains('99198')
      .should('exist');

      //закрываю
    cy.get('[data-testid="close-modal"]').click();
    cy.get('[data-testid="ingredient-modal"]').should('not.exist');

    //конструктор пустой?
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
