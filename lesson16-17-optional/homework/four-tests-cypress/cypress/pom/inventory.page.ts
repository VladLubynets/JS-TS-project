export class InventoryPage {
    getTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('.title');
    }

    getProducts(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('.inventory_item');
    }

    getCartBadge(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('.shopping_cart_badge');
    }

    clickAddToCart(index: number): void {
        cy.get('.inventory_item').eq(index).find('button').click();
    }

    clickRemoveFromCart(index: number): void {
        cy.get('.inventory_item').eq(index).find('button').click();
    }
}


