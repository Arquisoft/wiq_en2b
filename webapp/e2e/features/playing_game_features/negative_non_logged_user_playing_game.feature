Feature: Preventing starting a new game

  Scenario: A non-logged user wants to play a new game
    Given A non-logged user in the root directory
    When Entering the endpoint via URL
    Then No new game is created and the user is redirected to the log in screen

