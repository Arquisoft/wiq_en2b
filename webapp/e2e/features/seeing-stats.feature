Feature: Seeing the ladder board
Scenario: A logged user with many games wants to see its stats
    Given A logged user with many games and a full ladder board (many other users with many other games)
    When Clicking the button for seeing stats
    Then it successfully displays both, the ladder board and the logged user statistics