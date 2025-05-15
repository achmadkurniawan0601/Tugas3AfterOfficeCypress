describe('Sauce Demo web Testing', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    // cy.visit('/')
  })
  // Scenario Login

  it('TC01_Succesfully Login', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('.title').should('contain.text', 'Products')
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    cy.get('.login_logo').should('contain.text', 'Swag Labs')
  })
  it('TC02_Invalid Username and Valid Password', () => {
    cy.get('#user-name').type('standard')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
  })
 
  it('TC03_Valid Username and Invalid Password', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
  })

  it('TC04_Empty Username and Empty Password', () => {
    // cy.get('#user-name').type('')
    cy.get('#user-name').should('have.value', '');
    cy.get('#password').should('have.value', '');
    // cy.get('#password').type('')
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required')
  })

  it('TC05_Login success, add to Card, Check Out, and Payment', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('.title').should('contain.text', 'Products')
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('.title').should('contain.text', 'Your Cart')
    cy.get('#checkout').click()
    cy.get('#first-name').type('Achmad')
    cy.get('#last-name').type('Kurniawan')
    cy.get('#postal-code').type('15142')
    cy.get('#continue').click()
    cy.get('.title').should('contain.text', 'Checkout: Overview')
    cy.get('#finish').click()
    cy.get('.complete-header').should('contain.text', 'Thank you for your order!')
    cy.get('#back-to-products').click()
    cy.get('.title').should('contain.text', 'Products')
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    cy.get('.login_logo').should('contain.text', 'Swag Labs')
  })
})