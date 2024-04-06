Feature: Seeing the ladder board

  Scenario: A non-logged user wants to see its stats
    Given A non-logged user
    And A full ladder board (many other users with many other games)
    When The user accesses to the ladder board via URL
    Then The user is redirected to the log in screen