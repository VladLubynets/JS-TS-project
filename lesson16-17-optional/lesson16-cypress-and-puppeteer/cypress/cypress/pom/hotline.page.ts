export class HotlinePage {
    private get searchElementTitles(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.list-item a.item-title');
    }

    public goTo(): void {
        cy.visit('https://hotline.ua/');
        this.searchInput({ timeout: 10000 }).should('be.visible');
    }

    public search(searchQuery: string): void {
        this.searchInput().type(searchQuery).type('{enter}');
    }

    public getSearchResultTitles(): Cypress.Chainable<string[]> {
        const titles: string[] = [];
        return this.searchElementTitles.each(($el) =>
            cy.wrap($el)
                .invoke('text')
                .then((text) => titles.push(text.trim()))
        ).then(() => titles);
    }

    private searchInput(
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow> | undefined
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#autosuggest input', options);
    }
}
