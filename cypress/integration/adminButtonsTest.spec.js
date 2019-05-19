/// <reference types="Cypress" />

Cypress.LocalStorage.clear = function (keys, ls, rs) {
    // do something with the keys here
    if (keys) {
      return clear.apply(this, arguments)
    }
  
  }

describe("Testing admin buttons", function() {
  it("Our app runs", function() {
    cy.visit("http://localhost:4200");
  });

  it("Checking addActivityButton", function() {
    if(localStorage.getItem("user") !== null)
    {
      cy.get(".mat-icon-button").click();
      cy.get("[data-cy=accountButton]").click();
      cy.get("[data-cy=logoutButton]").click();
    }
    cy.get(".mat-icon-button").click();
    cy.get("[data-cy=addActivityButton]").should("have.length", 0);
  });

  it("Checking category  admin buttons", function() {
    cy.get("[data-cy=activityButton]").click();
    cy.get("[data-cy=categoryEditButton]").should("have.length", 0);
    cy.get("[data-cy=categoryDeleteButton]").should("have.length", 0);
  });

  it("Checking activity admin buttons", function() {
    cy.get("[data-cy=categoryCard]")
      .first()
      .click();
    cy.get("[data-cy=activityCard]")
      .first()
      .click();
    cy.get("[data-cy=activityEditButton]").should("have.length", 0);
    cy.get("[data-cy=activityDeleteButton]").should("have.length", 0);
  });

  it("Login as admin", function(){
    cy.get(".mat-icon-button").click();
    cy.get("[data-cy=loginButton]").click();
    cy.get("[data-cy=loginEmailInput]").type("robbe.dekien@hotmail.com");
    cy.get("[data-cy=loginPasswordInput]").type("Robbe123");
    cy.get("[data-cy=loginSubmitButton").click();
  });

  it("Checking addActivityButton present", function() {
    cy.get(".mat-icon-button").click();
    cy.get("[data-cy=addActivityButton]").should("have.length", 1);
  });

  it("Checking category admin buttons present", function() {
    cy.get("[data-cy=activityButton]").click();
    cy.get("[data-cy=categoryEditButton]").should("have.length.gte", 1);
    cy.get("[data-cy=categoryDeleteButton]").should("have.length.gte", 1);
  });

  it("Checking activity admin buttons present", function() {
    cy.get("[data-cy=categoryCard]")
      .last()
      .click();
    cy.get("[data-cy=activityCard]")
      .first()
      .click();
    cy.get("[data-cy=activityEditButton]").should("have.length.gte", 1);
    cy.get("[data-cy=activityDeleteButton]").should("have.length.gte", 1);
  });

});
