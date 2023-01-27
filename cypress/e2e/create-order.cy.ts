describe("My React App", () => {
  beforeEach(() => {
    cy.viewport(1300, 1900);
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "postOrder"
    );

    cy.visit("http://localhost:3000/react-burger#/login");
  });
  it("should log in the user drag ingredients and create order", () => {
    cy.get('input[name="email"]').type("olesia.polevoi@gmail.com");
    cy.get('input[name="password"]').type("123456");
    cy.get(".login_button__IcZC9").click();

    const bunTransfer = new DataTransfer();
    cy.get(".burger-ingredients_ingredient__eT5zq")
      .first()
      .trigger("dragstart", {
        bunTransfer,
      });
    cy.get(".burger-constructor_scroller__o6aJx").trigger("drop", {
      bunTransfer,
    });
    const ingredientTransfer = new DataTransfer();
    cy.get(".burger-ingredients_ingredient__eT5zq").eq(7).trigger("dragstart", {
      ingredientTransfer,
    });

    cy.get(".burger-constructor_scroller__o6aJx").trigger("drop", {
      ingredientTransfer,
    });
    cy.get(".button_type_primary").click();
    cy.get(".order-details_number__c7swC").contains("123").should("exist");
  });
});
