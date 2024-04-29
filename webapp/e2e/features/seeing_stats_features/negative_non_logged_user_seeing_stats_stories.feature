Feature: Seeing the leader board

  Scenario: A non-logged user wants to see its stats
    Given A non-logged user in main menu
    When The user accesses to the leader board via URL
    Then The user is redirected to the log in screen