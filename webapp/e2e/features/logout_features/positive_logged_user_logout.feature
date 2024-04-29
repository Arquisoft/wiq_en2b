Feature: Logging out an account

  Scenario: A logged user wants to log out the webpage
    Given A logged user in main menu
    When User presses the button for deploying the lateral menu 
    And User presses the log out button
    Then The login screen shows on the user device and the user is no longer logged in
