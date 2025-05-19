import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("user sudah login", () => {
  cy.visit("/");
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();
  cy.url().should("include", "/inventory");
});

When("user menambahkan produk pertama ke keranjang", () => {
  cy.get(".inventory_item").first().contains("Add to cart").click();
});

Then("produk muncul di keranjang", () => {
  cy.get(".shopping_cart_badge").should("contain", "1");
});
