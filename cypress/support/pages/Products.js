export class Products {
  addProduct = (args = { productname }) => {
    return cy.contains('.inventory_item_name', args.productname)
      .parents('.inventory_item_description')
      .within(() => {
        cy.get('.inventory_item_name').invoke('text').as('productName');
        cy.get('.inventory_item_desc').invoke('text').as('productDescription');
        cy.get('.inventory_item_price').invoke('text').as('productPrice');
      })
      .find('.btn_inventory')
      .should('have.text', 'Add to cart')
      .click()
      .then(() => {
        cy.get('@productName').then((productName) => {
          cy.get('@productDescription').then((productDescription) => {
            cy.get('@productPrice').then((productPrice) => {
              // Create an object with captured information
              const productInfo = {
                name: productName,
                description: productDescription,
                price: productPrice,
              };

              // Return the captured product information for later use
              return productInfo;
            });
          });
        });
      });
  }
}