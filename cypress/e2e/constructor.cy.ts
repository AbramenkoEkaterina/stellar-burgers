describe('конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
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
      timeout: 10000
    }).should('exist');
    cy.get(`[data-testid="constructor-bun-bottom-643d69a5c3f7b9001cfa093d"]`, {
      timeout: 10000
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
    cy.get('[data-testid="ingredient-modal"]').contains('Флюоресцентная булка R2-D3').should('exist');

    //закрытие крестиком
    cy.get('[data-testid="close-modal"]').click();
    cy.get('[data-testid="ingredient-modal"]').should('not.exist');

    // открываем снова чтоб закрыть по оверлею
    cy.get('[data-testid="ingredient-card-643d69a5c3f7b9001cfa093d"]').click();
    
    //проверяем что модалка открыта
    cy.get('[data-testid="ingredient-modal"]').should('be.visible');

    // закрытие по оверлею
    cy.get('[data-testid="modal-overlay"]').click({force: true} );
    cy.get('[data-testid="ingredient-modal"]').should('not.exist');
});
})
