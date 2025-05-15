import LoginPage from '../../support/pageObject/login-user'

describe('Call Diference Env', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('orangehrm_url'))
  })
  it.skip('Facebook', () => {
    // cy.visit('https://example.cypress.io')
    // cy.visit(Cypress.env('facebook_url'))
    cy.visit(Cypress.env('instagram_url'))
  }),

  it.only('Multiple login Saucedemo with foreach', () => {
    cy.fixture('list-user.json').then((user) => {
      user.failed_login.forEach((datauser) => {
        cy.login(datauser.username, datauser.password)
        cy.get('.oxd-alert-content').should('contains.text', 'Invalid credential')
      })
    })
  })

  it('Login Orange HRM with Page Object Model', () => {
    LoginPage.inputUsername('Admin')
    LoginPage.inputPassword('admin123')
    LoginPage.clickBtnLogin()
    LoginPage.verifyLoginSuccess()
    // cy.input('[name="username"]', 'Admin')
    // cy.input('[name="password"]', 'admin123')
    // cy.klik('.oxd-button')
    // cy.url().should('include', '/dashboard/index')
  })

  it.skip('Login Sauce demo with custom commands login', () => {
    cy.login('Admin', 'admin123')
    cy.klik('.oxd-button')
    cy.url().should('include', '/dashboard/index')
  })

  it('Login Sauce demo with fixtures', () => {
    cy.fixture('users.json').then((user) => {
      const datauser = user[0]
      cy.login(datauser.username, datauser.password)
      cy.get('.oxd-button').click()
      cy.contains('Dashboard')
    })
    // cy.url().should('include', '/dashboard/index')
  })

  it('Login Sauce demo with custom commands dynamic', () => {
    cy.input('[name="username"]', 'Admin')
    cy.input('[name="password"]', 'admin123')
    cy.klik('.oxd-button')
    cy.url().should('include', '/dashboard/index')
  })

  it('Sauce Demo Login Passed', () => {
    cy.get('[name="username"]').type(Cypress.env('username'))
    cy.get('[name="password"]').type(Cypress.env('password'))
    cy.get('.oxd-button').click()
    cy.url().should('include', '/dashboard/index')
  })

  it('Saude Demo Login Failed Wrong Password', () => {
    cy.get('[name="username"]').type(Cypress.env('username'))
    cy.get('[name="password"]').type('Admin123')
    cy.get('.oxd-button').click()
    cy.get('.oxd-alert-content').should('contains.text', 'Invalid credential')
  })
})