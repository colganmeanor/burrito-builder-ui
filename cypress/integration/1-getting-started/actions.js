describe('burrito app user actions', () => {
    beforeEach(() => {
    cy.intercept('GET', 'api/v1/orders', {
        fixture: 'sampleOrders.json'
        })
  
      cy.visit('http://localhost:3000/')
    })
  
    it('should allow the user to enter their name', () => {
        cy.get('[data-cy=order-form]')
          .children('[data-cy=name-input]')
          .type('Colgan')

          .get('[data-cy=name-input]')
          .should('have.value', 'Colgan')
    })
  
    it('should allow the user to click ingredient buttons and add them to their order', () => {
        cy.get('[data-cy=ingredient-button]').eq(0)
          .click()

        cy.get('[data-cy=ingredient-button]').eq(2)
          .click()

        cy.get('[data-cy=ingredient-button]').eq(8)
          .click()

          .get('[data-cy=in-progress-order]')
          .contains('Order: beans, carnitas, guacamole')
    })
    
    it('should allow the user to see their order after they click submit order', () => {
        cy.get('[data-cy=order-form]')
          .children('[data-cy=name-input]')
          .type('Colgan')

          .get('[data-cy=ingredient-button]').eq(0)
          .click()

          .get('[data-cy=ingredient-button]').eq(2)
          .click()

          .get('[data-cy=ingredient-button]').eq(8)
          .click()

          .get('[data-cy=order-submit-button]')
          .click()

          cy.intercept('POST', 'api/v1/orders', {
            fixture: 'postOrder.json'
            })

          cy.intercept('GET', 'api/v1/orders', {
            fixture: 'updatedOrders.json'
            })
           
          .get('[data-cy=order]')
          .should('have.length', 4)

          .get('[data-cy=order]').eq(3)
          .contains('Colgan')


    })

})