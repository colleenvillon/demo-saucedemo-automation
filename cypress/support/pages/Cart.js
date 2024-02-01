export class Cart {
  navigateToCart = () => {
    cy.get('.shopping_cart_link').click({ force: true })
    cy.get('.cart_item').should('exist');
  }

  checkIfProductsAreAddedToCart  = (productInfo) => {
    cy.contains('.cart_item', productInfo.name).within(() => {
      cy.get('.inventory_item_name').should('be.visible').and('have.text', productInfo.name);
      cy.get('.inventory_item_desc').should('be.visible').and('have.text', productInfo.description);
      cy.get('.inventory_item_price').should('be.visible').and('have.text', productInfo.price);
    });
  };

  clickCheckout = () => {
    cy.get('#checkout').click({ force: true })
    cy.title().should('include', 'Swag Labs')
    cy.get('div[class="checkout_info"]').should('be.visible')
  }
  }