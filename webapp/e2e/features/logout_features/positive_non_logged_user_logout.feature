Feature: Preventing crashes when logging out an account

  Scenario: A non-logged user wants to log out the webpage
    Given A non-logged user in main menu
    When User accesses de /logout endpoint via URL
    Then The login screen shows on the user device
