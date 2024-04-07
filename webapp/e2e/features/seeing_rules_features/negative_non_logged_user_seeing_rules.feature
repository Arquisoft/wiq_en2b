Feature: Preventing seeing the rules of the game

  Scenario: A non-logged user wants to see the rules for the game
    Given A non-logged user
    When The user accesses to the rules via URL
    Then The user is redirected to the log in screen