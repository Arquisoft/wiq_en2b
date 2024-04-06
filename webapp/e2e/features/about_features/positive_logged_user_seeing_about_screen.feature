Feature: Seeing the about screen of the webpage

  Scenario: A logged user wants to see the about screen of the webpage
    Given A logged user in the main menu
    When The user presses the button for deploying the lateral menu
    And the user presses the button for seeing the about secction (i)
    Then The screen shows redirects the user to the about screen