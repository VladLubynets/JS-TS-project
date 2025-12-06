Feature: SauceDemo E-commerce Shop

    Background:
        Given the user is on the login page

    Scenario: User can login with valid credentials
        When the user logs in with username "standard_user" and password "secret_sauce"
        Then the user should be redirected to the inventory page
        And the page title should be "Products"

    Scenario: User cannot login with invalid credentials
        When the user logs in with username "invalid_user" and password "wrong_password"
        Then an error message should be displayed
        And the error message should contain "Username and password do not match"

    Scenario: User can add an item to the shopping cart
        When the user logs in with username "standard_user" and password "secret_sauce"
        And the user adds "Sauce Labs Backpack" to the cart
        Then the cart badge should show "1" item
        When the user goes to the cart
        Then the cart should contain "Sauce Labs Backpack"

    Scenario: User can remove an item from the shopping cart
        When the user logs in with username "standard_user" and password "secret_sauce"
        And the user adds "Sauce Labs Bike Light" to the cart
        And the user goes to the cart
        Then the cart should contain "Sauce Labs Bike Light"
        When the user removes "Sauce Labs Bike Light" from the cart
        Then the cart should be empty
