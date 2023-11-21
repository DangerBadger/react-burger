import '@4tw/cypress-drag-drop'

describe('check DnD', () => {
  beforeEach(() => {
    cy.visit('');

    cy.get('[id=ingredient]').as('ingredientDragedItem');
    cy.get('[id=constructorTarget]').as('containerDropTarget');

    cy.get('a').contains('Личный кабинет').click();
    cy.get('input').first().type('mathew@mail.com');
    cy.get('input').last().type('qwerty');
    cy.get('button').contains('Войти').click();
  });

  it('should open and close ingredient details modal', () => {
    cy.wait(2500).get('li').contains('Флюоресцентная булка R2-D3').click();
    cy.contains('Детали ингредиента');
    cy.wait(2000).get("[id=modalCloseButton]").click();
  });

  it('should grad and drop ingredients into container and on each other', () => {
    cy.get('@ingredientDragedItem').eq(1).drag('@containerDropTarget');
    cy.get('@ingredientDragedItem').eq(3).drag('@containerDropTarget');
    cy.get('@ingredientDragedItem').eq(6).drag('@containerDropTarget');
    cy.get('@ingredientDragedItem').eq(7).drag('@containerDropTarget');
    cy.get('@ingredientDragedItem').eq(12).drag('@containerDropTarget');
    cy.get('@ingredientDragedItem').eq(0).drag('@containerDropTarget');

    cy.get('[id=constructorItem]').as('constructorDragedItem');

    cy.get('@constructorDragedItem').eq(1).drag('@constructorDragedItem');
    cy.get('@constructorDragedItem').eq(2).drag('@constructorDragedItem');
  });

  it('should open and close order details modal', () => {
    cy.get('@ingredientDragedItem').eq(1).drag('@containerDropTarget');
    cy.get('@ingredientDragedItem').eq(3).drag('@containerDropTarget');
    cy.get('@ingredientDragedItem').eq(6).drag('@containerDropTarget');

    cy.get('button').contains('Оформить заказ').click();
    cy.wait(4000).contains('Ваш заказ начали готовить');

    cy.get('[id=modalCloseButton]').click();
  });

  it('should logout', () => {
    cy.wait(600).get('a').contains('Личный кабинет').click();
    cy.get('button').contains('Выход').click();
  });
})