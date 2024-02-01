import { Login } from '../../support/pages/Login';
import { Products } from '../../support/pages/Products';
import { Cart } from '../../support/pages/Cart';
import { Checkout } from '../../support/pages/Checkout';

const login = new Login();
const products = new Products();
const cart = new Cart();
const checkout = new Checkout();

const credentials = 'login/credentials.json';
const userdata = 'user/userdetails.json'

describe('Verify successful checkout', function () {
  let productOneInfo, productTwoInfo;

  before(() => {
    cy.visitPage();
  });

  it('user should be able to login successfully', function () {
    // Retrieve the user from credentials and login as standard user
    cy.fixture(credentials).then((data) => {
      login.login({
        email: data.standard_user['username'],
        password: data.standard_user['password']
      });
    });
  });

  it('add products on user cart', () => {
    // Add the first product
    products.addProduct({ productname: 'Sauce Labs Backpack' }).then((info) => {
      productOneInfo = info;
      cy.log('Product One Info:', productOneInfo);

      // Add the second product
      products.addProduct({ productname: 'Sauce Labs Bike Light' }).then((info) => {
        productTwoInfo = info;
        cy.log('Product Two Info:', productTwoInfo);
      });
    });
  });

  it('check if the products are added on the user cart', () => {
    cart.navigateToCart();

    // Check the first product if added on the cart
    cart.checkIfProductsAreAddedToCart(productOneInfo);

    // Check the second product if added on the cart
    cart.checkIfProductsAreAddedToCart(productTwoInfo);
  });

  it('fill out the checkout information form', () => {
    cart.clickCheckout();

    // R etrieve the information from userdata & fill out the the checkout user form 
    cy.fixture(userdata).then((data) => {
      cy.log(data.first_name);
      checkout.fillOutCheckoutForm({
        firstName: data.first_name,
        lastName: data.last_name,
        zipCode: data.zip_code,
      });
    });

    checkout.clickContinue();
  });

  it('check if the products and payment information are displayed correctly in checkout overview', () => {
    // Validate the first product on the checkout overview
    cart.checkIfProductsAreAddedToCart(productOneInfo);

    // Validate the second product on the checkout overview
    cart.checkIfProductsAreAddedToCart(productTwoInfo);

    // Validate the payment and shipping information elements
    checkout.checkIfPaymentInformationIsDisplayed();
    checkout.checkIfShippingInformationIsDisplayed();
  });

  it('check if the products subtotal, tax, and total price are computed and displaying correctly in checkout overview', () => {
    let displayedSubtotal;

    // Validate the subtotal is computed and displayed correctly based on the product list
    checkout.checkIfSubtotalIsComputedAndDisplayedCorrectly([productOneInfo.price, productTwoInfo.price])
      .then((subtotal) => {
        displayedSubtotal = subtotal;
        console.log('Displayed Subtotal:', displayedSubtotal);

        // Validate the tax is computed and displayed correctly
        return checkout.checkIfTheTaxIsComputedAndDisplayedCorrectly(displayedSubtotal, 0.08);
      })
      .then((displayedTax) => {
        console.log('Displayed Tax:', displayedTax);

        // Validate the total is computed and displayed correctly
        return checkout.checkIfTotalIsComputedAndDisplayedCorrectly(displayedSubtotal, displayedTax);
      });
  });

  it('check if the order is successful', () => {
    checkout.clickFinish();

    // Validate the order success page
    checkout.checkIfOrderIsSuccessful();
  });
});

