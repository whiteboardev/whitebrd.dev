describe("Testing github section", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept("/users/whiteboardev/repos", { fixture: "github/repos/list.json", delay: 3000 }).as("repoList");
  });
  it("should be visible", () => {
    cy.get("#projects").should("be.visible");
  });
  it("should display a loading component", () => {
    cy.get("#loading-projects").should("be.visible");
  });
  it('should have a visible title "Whiteboard Repo"', () => {
    cy.wait("@repoList");
    cy.get("#projects-title").should("be.visible");
  });
});
