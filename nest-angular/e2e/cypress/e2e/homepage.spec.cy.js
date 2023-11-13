import { slowCypressDown } from "cypress-slow-down";
//slowCypressDown(500);
describe("Homepage", () => {
  it("should load sucessfully.", () => {
    cy.visit("/");
  });
  it("sould contain right spelld text", () => {
    cy.contains("Users");
    cy.contains("Admin");
    cy.contains("Login");
    cy.get("mat-select").click();
    cy.contains("register");
  });
});
