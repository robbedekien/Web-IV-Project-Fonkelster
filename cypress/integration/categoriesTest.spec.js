/// <reference types="Cypress" />

Cypress.LocalStorage.clear = function(keys, ls, rs) {
  // do something with the keys here
  if (keys) {
    return clear.apply(this, arguments);
  }
};

describe("Testing categories", function() {
  it("Our app runs", function() {
    cy.visit("http://localhost:4200");
  });

  it("Checking categories", function() {
    cy.server({ delay: 1000 });
    cy.route({
      method: "GET",
      url: "http://localhost:4200/api/Activity/Category",
      status: 200,
      response: "fixture:categories.json"
    });
    cy.get(".mat-icon-button").click();
    cy.get("[data-cy=activityButton]").click();
    cy.get("[data-cy=categoryCard]").should("have.length", 6);
  });
});
