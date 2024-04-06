Feature: Seeing the rules of the game

  Scenario: A logged user wants to see the rules for the game
    Given A logged user in the main menu
    When The user presses the button for deploying the lateral menu
    And the user presses the button for seeing the rules
    Then The screen shows redirects the user to the rules' screen