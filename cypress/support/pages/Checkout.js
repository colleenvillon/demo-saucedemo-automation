export class Checkout {
  fillOutCheckoutForm = (args = { firstName, lastName, zipCode }) => {
    cy.get('input[id="first-name"]').type(args.firstName)
    cy.get('input[id="last-name"]').type(args.lastName)
    cy.get('input[id="postal-code"]').type(args.zipCode) 
  }

  clickContinue = () => {
    cy.get('#continue').click({ force: true })
    cy.title().should('include', 'Swag Labs')
    cy.get('div[class="cart_list"]').should('be.visible')
  }

  checkIfPaymentInformationIsDisplayed = () => {
    // Check if Payment Information label is displayed
    cy.get('.summary_info_label').contains('Payment Information').should('exist');

    // Check if SauceCard information is displayed
    cy.get('.summary_value_label').should('include.text', 'SauceCard #');
  }

  checkIfShippingInformationIsDisplayed = () => {
    // Check if Shipping Information label is displayed
    cy.get('.summary_info_label').contains('Shipping Information').should('exist');

    // Check if Free Pony Express Delivery is displayed
    cy.get('.summary_value_label').should('include.text', 'Free Pony Express Delivery!');
  }

  checkIfSubtotalIsComputedAndDisplayedCorrectly = (productPrices) => {
    // Extract individual item prices and calculate the sum
    const itemSubtotal = productPrices.reduce((total, price) => total + parseFloat(price.replace('$', '')), 0);
  
    return cy.get('.summary_subtotal_label').invoke('text').then((text) => {
      const displayedItemSubtotal = parseFloat(text.replace('Item total: $', ''));
      
      // Validate that the sum of individual item prices matches the displayed item subtotal
      cy.wrap(parseFloat(itemSubtotal.toFixed(2))).should('eq', displayedItemSubtotal);
      
      cy.then(() => {
        return displayedItemSubtotal;
      });
    });
  }
  
  checkIfTheTaxIsComputedAndDisplayedCorrectly = (itemSubtotal, taxRate) => {
    // Calculate the expected tax based on the provided tax rate
    const expectedTax = itemSubtotal * taxRate;
  
    return cy.get('.summary_tax_label').invoke('text').then((taxText) => {
      const displayedTax = parseFloat(taxText.replace('Tax: $', ''));
  
      cy.log('Displayed Tax:', displayedTax);
  
      // Validate that the calculated tax is close to the displayed tax with a tolerance of 0.01
      cy.wrap(displayedTax).should('be.closeTo', expectedTax, 0.01);
    });
  }

  checkIfTotalIsComputedAndDisplayedCorrectly = (itemSubtotal, displayedTax) => {
    // Calculate the expected total by adding itemSubtotal and displayedTax
    const expectedTotal = itemSubtotal + displayedTax;
  
    cy.get('.summary_total_label').invoke('text').then((totalText) => {
      const displayedTotal = parseFloat(totalText.replace('Total: $', ''));
    
      // Validate that the calculated total is equal to the displayed total
      cy.wrap(displayedTotal).should('eq', expectedTotal);
    
      cy.log('Displayed Total:', displayedTotal);
    });
  }
  
  clickFinish = () => {
    cy.get('#finish').click({ force: true })
  }

  checkIfOrderIsSuccessful = () => {
    // Check if the elements on the successful order page are present
    cy.get('#checkout_complete_container').should('exist');
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    cy.get('.complete-text').should('exist');
    cy.get('#back-to-products').should('exist');
  }
}
