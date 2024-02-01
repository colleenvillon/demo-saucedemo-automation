Cypress.Commands.add('visitPage', () => {
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.clearAllCookies()
    cy.visit('/')
  })