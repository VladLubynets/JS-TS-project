import { LoginPage } from '../pom/login.page';
import { InventoryPage } from '../pom/inventory.page';

describe('Test 1: Login page display', () => {
    it('should display login page correctly', () => {
        const loginPage = new LoginPage();
        
        loginPage.visit();
        
        loginPage.getTitle().should('be.visible').and('contain', 'Swag Labs');
        cy.get('[data-test="username"]').should('be.visible');
        cy.get('[data-test="password"]').should('be.visible');
        cy.get('[data-test="login-button"]').should('be.visible');
    });
});

describe('Test 2: Input fields', () => {
    it('should type credentials into input fields', () => {
        const loginPage = new LoginPage();
        
        loginPage.visit();
        loginPage.typeUsername('standard_user');
        loginPage.typePassword('secret_sauce');
        
        cy.get('[data-test="username"]').should('have.value', 'standard_user');
        cy.get('[data-test="password"]').should('have.value', 'secret_sauce');
    });
});

describe('Test 3: Empty fields error', () => {
    it('should show error when fields are empty', () => {
        const loginPage = new LoginPage();
        
        loginPage.visit();
        loginPage.clickLogin();
        
        loginPage.getError().should('be.visible');
        loginPage.getError().should('contain', 'Username is required');
    });
});

describe('Test 4: Products display', () => {
    it('should display products after login', () => {
        const loginPage = new LoginPage();
        const inventoryPage = new InventoryPage();
        
        loginPage.visit();
        loginPage.typeUsername('standard_user');
        loginPage.typePassword('secret_sauce');
        loginPage.clickLogin();
        
        inventoryPage.getTitle().should('contain', 'Products');
        inventoryPage.getProducts().should('have.length', 6);
    });
});
