Feature: Starting a new game

Scenario: A logged user wants to play a new game
    Given A logged user in the main menu
    When Clicking the button to start a new game
    Then A new game is created and the first question appears on the screen

