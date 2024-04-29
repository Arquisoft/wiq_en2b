Feature: Seeing the leader board

Scenario: A logged user with many games wants to see its stats
    Given A logged user in the main menu with many games
    When The user presses the button for deploying the lateral menu
    And The user presses the button for seeing stats
    Then It successfully displays both, the leader board and the logged user statistics