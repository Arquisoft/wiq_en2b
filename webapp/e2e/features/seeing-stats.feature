Feature: Seeing the ladder board

Scenario: A logged user with many games wants to see its stats
    Given A logged user in the main menu with many games
    And A full ladder board (many other users with many other games)
    When The user presses the button for deploying the lateral menu
    And the user presses the button for seeing stats
    Then it successfully displays both, the ladder board and the logged user statistics