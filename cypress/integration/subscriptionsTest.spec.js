/// <reference types="Cypress" />

Cypress.LocalStorage.clear = function(keys, ls, rs) {
  // do something with the keys here
  if (keys) {
    return clear.apply(this, arguments);
  }
};

describe("Testing user subscriptions", function() {
  it("Our app runs", function() {
    cy.visit("http://localhost:4200");
    localStorage.clear();
  });

  it("Navigating to activity Detail", function() {
    cy.get(".mat-icon-button").click();
    cy.get("[data-cy=activityButton]").click();
    cy.get("[data-cy=categoryCard]")
      .first()
      .click();
    cy.get("[data-cy=activityCard]")
      .first()
      .click();
  });

  it("Checking subscribe protection", function() {
    cy.get("[data-cy=subscribeButton]").click();
    cy.url().should("equal", "http://localhost:4200/register");
  });

  it("Login as user", function() {
    cy.get("[data-cy=loginEmailInput]").type("web4@student.hogent.be");
    cy.get("[data-cy=loginPasswordInput]").type("Gelukkiggeennetbeans1");
    cy.get("[data-cy=loginSubmitButton").click();
  });

  it("Unsubscibe from activities", function() {
    cy.get(".mat-icon-button").click();
    cy.get("[data-cy=accountButton]").click();
    cy.get("[data-cy=subscriptionButton]").click();
    cy.get("[data-cy=loader]").should("not.be.visible");
    cy.get("[data-cy=activities]").then(body => {
      if (body.find(".btn").length > 0) {
        cy.get("app-member-activities.ng-star-inserted > .container .btn").each(
          function() {
            cy.get("app-member-activities.ng-star-inserted > .container .btn")
              .first()
              .click();
            cy.get("[data-cy=activityUnsubscribeButton]").click();
          }
        );
      }
    });
    // if (cy.get("[data-cy=activities]").find(".btn"))
    //   cy.get("app-member-activities.ng-star-inserted > .container .btn").each(
    //     function() {
    //       cy.get("app-member-activities.ng-star-inserted > .container .btn")
    //         .first()
    //         .click();
    //       cy.get("[data-cy=activityUnsubscribeButton]").click();
    //     }
    //   );
  });

  it("Navigating to activity Detail", function() {
    cy.get(".mat-icon-button").click();
    cy.get("[data-cy=activityButton]").click();
    cy.get("[data-cy=categoryCard]")
      .first()
      .click();
    cy.get("[data-cy=activityCard]")
      .first()
      .click();
  });

    it("Subscribing to activity", function() {
      cy.url().should("include", "http://localhost:4200/activiteit");
      cy.get("[data-cy=subscribeButton]").click();
      cy.get("[data-cy=unsubscribeButton]").should("be.visible");
    });

    it("Checking overview", function() {
        cy.get(".mat-icon-button").click();
        cy.get("[data-cy=accountButton]").click();
        cy.get("[data-cy=subscriptionButton]").click();
        cy.get("[data-cy=loader]").should("not.be.visible");
        cy.get("[data-cy=activities] .btn").should('have.length', 1);
    });
});
