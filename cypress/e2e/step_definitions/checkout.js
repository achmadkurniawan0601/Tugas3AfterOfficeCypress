import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("user sudah menambahkan produk ke keranjang", () => {
  cy.visit("/");
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();
  cy.get(".inventory_item").first().contains("Add to cart").click();
  cy.get(".shopping_cart_link").click();
  cy.get('[data-test="checkout"]').click();
});

When("user mengisi informasi checkout", () => {
  cy.get('[data-test="firstName"]').type("John");
  cy.get('[data-test="lastName"]').type("Doe");
  cy.get('[data-test="postalCode"]').type("12345");
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});

Then("checkout berhasil", () => {
  cy.contains("Thank you for your order!").should("be.visible");
});
