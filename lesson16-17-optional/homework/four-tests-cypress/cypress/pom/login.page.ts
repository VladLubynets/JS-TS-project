export class LoginPage {
    visit(): void {
        cy.visit('/');
    }

    typeUsername(username: string): void {
        cy.get('[data-test="username"]').type(username);
    }

    typePassword(password: string): void {
        cy.get('[data-test="password"]').type(password);
    }

    clickLogin(): void {
        cy.get('[data-test="login-button"]').click();
    }

    getError(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('[data-test="error"]');
    }

    getTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('.login_logo');
    }
}


