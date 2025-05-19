import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("user membuka halaman login", () => {
  cy.visit("/");
});

When(
  "user login dengan username {string} dan password {string}",
  (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  }
);

Then("user diarahkan ke halaman inventori", () => {
  cy.url().should("include", "/inventory");
});

Then("user melihat pesan kesalahan", () => {
  cy.get('[data-test="error"]').should("be.visible");
});
