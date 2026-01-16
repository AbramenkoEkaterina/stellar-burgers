describe('конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляем булку и начинку в конструктор', () => {
    // Добавляем булку
    cy.get('[data-testid="add-ingredient-643d69a5c3f7b9001cfa093d"]')
      .find('button')
      .click({ force: true });

    // Добавляем начинку
    cy.get('[data-testid="add-ingredient-643d69a5c3f7b9001cfa0946"]')
      .find('button')
      .click({ force: true });

    // Проверяем, что булка добавилась по тексту (верх и низ)
    cy.get(`[data-testid="constructor-bun-top-643d69a5c3f7b9001cfa093d"]`, { timeout: 10000 })
  .should('exist');
cy.get(`[data-testid="constructor-bun-bottom-643d69a5c3f7b9001cfa093d"]`, { timeout: 10000 })
  .should('exist');


    // Проверяем, что начинка добавилась
    cy.get('[data-testid="burger-constructor"]')
      .contains('Хрустящие минеральные кольца', { timeout: 10000 })
      .should('exist');
  });
});
