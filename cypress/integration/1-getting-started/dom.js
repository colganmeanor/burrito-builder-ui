/// <reference types="cypress" />



describe('burrito app DOM', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/v1/orders', {
      fixture: 'sampleOrders.json'
    })

    cy.visit('http://localhost:3000/')
  })

  it('should contain the app title', () => {
      cy.get('[data-cy=header]')
      .should('exist')
      .children('[data-cy=burrito-builder-title]')
      .contains('Burrito Builder')
  })

  it('should have an order submission form', () => {
    cy.get('[data-cy=header]')
      .children('[data-cy=order-form]')
      .children('[data-cy=name-input]')
      .siblings('[data-cy=ingredient-button]')
      .should('have.length', 12)
})

  it('should show the current order section, even if nothing is ordered yet', () => {
    cy.get('[data-cy=in-progress-order]')
      .should('exist')
      .contains('Order: Nothing selected')
  })

  it('should be able to show the current orders in the orders section', () => {
    cy.get('[data-cy=order-section]')
    .should('exist')
    .children('[data-cy=order]')
    .should('have.length', 3)
  })

  it('should show a list of ingredients and a name for a given order', () => {
    cy.get('[data-cy=order]').eq(0)
      .get('[data-cy=order-name]')
      .contains('Pat')
      .siblings('[data-cy=order-ingredient-list]')
      .children('[data-cy=order-ingredient]')
      .should('have.length', 5)

  })

})


