export class Login {
  login = (args = { email, password }) => {
    cy.get('input[id="user-name"]').type(args.email)
    cy.get('input[id="password"]').type(args.password)
    cy.get('input[id="login-button"]').click()
    cy.title().should('include', 'Swag Labs')
    cy.get('span[class="title"]').should('be.visible')
  }
}
