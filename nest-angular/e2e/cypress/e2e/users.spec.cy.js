describe("users page", () => {
  it("sould load users table", () => {
    cy.visit("/users");
    cy.get('[routerLink="/users"]').click();
    cy.get(".mat-table");
  });
  it("should display right colmn names", () => {
    cy.contains("#Id");
    cy.contains("name");
    cy.contains("Username");
    cy.contains("Email");
    cy.contains("Role");
  });
  it("should navigate to next page", () => {
    cy.get('[aria-label="Next page"]').click();
  });
  it("should filter users by username", () => {
    cy.get('[data-placeholder="Search Username"]').type("souilmi");
    cy.get("mat-table").find("mat-row").should("have.length", 1);
  });
});
