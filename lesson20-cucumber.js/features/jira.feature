Feature: Jira tests

    Background: 
        Given the user is authenticated
        And the user navigate to the jira home page

    Scenario: Verify jira side menu contains menu options
        When the user reads the side menu options
        Then the user verifies that side menu contains the following options:
            | options |
            | For you |
            | Recent  |
            | Starred |
            | Plans   |
            | Spaces  |

    Scenario: Click jira side menu option 'Customize sidebar' opens customize modal
        When the user clicks the 'Customize sidebar' menu item
        Then the customize sidebar modal should be opened
        When the user reads the customize navigation elements
        Then the following options should be present in the customize sidebar modal:
            | options  |
            | For you  |
            | Recent   |
            | Starred  |
            | Plans    |
            | Spaces   |
