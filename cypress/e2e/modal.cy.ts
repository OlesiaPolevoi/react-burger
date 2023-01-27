describe("Home page renders & checks modal window with ingredients", function () {
  this.beforeEach(() => {
    cy.viewport(1300, 1900);
    cy.visit("http://localhost:3000");
  });

  it("should open modal window when ingredient is clicked & close modal when close bullon is clicked", () => {
    cy.get('a[href*="60d3b41abdacab0026a733c6"]').click();
    cy.get(".modal_closeIcon__HrLJF").click();
  });

  it("should open modal window when ingredient is clicked & close modal when modal overlay is clicked", () => {
    cy.get('a[href*="60d3b41abdacab0026a733cb"]').click();
    cy.get(".modal-overlay_background__gIZxW").click({ force: true });
  });
});
