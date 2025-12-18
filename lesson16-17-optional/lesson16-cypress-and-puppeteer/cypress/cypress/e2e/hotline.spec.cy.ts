import { HotlinePage } from '../pom/hotline.page';

describe('template spec', () => {
    let page: HotlinePage;

    beforeEach(() => {
        page = new HotlinePage();
        page.goTo();
    });

    it('test hotline', function () {
        // cy.visit('https://hotline.ua/');
        const searchQuery = 'RZTK';
        cy.get('#autosuggest input').type(searchQuery).type('{enter}');
        debugger
        cy.get('div.list-item a.item-title').eq(0).invoke('text').should('contain', searchQuery);
        cy.get('div.list-item a.item-title').each(($el) => {
            cy.wrap($el).invoke('text').should('contain', searchQuery);
        });
    });

    it('test hotline with POM', function () {
        const searchQuery = 'RZTK';

        page.search(searchQuery);
        const results = page.getSearchResultTitles();

        results.each((title) => expect(title).to.contain(searchQuery));
    });
});
