Feature: Preventing wrong login accesses

  Scenario: A registered user wants to log in using his credentials but with an invalid email
    Given A registered user in the root screen
    When User presses the log in button
    And User enters in the log in screen
    And User fills the form with his proper password but writes a wrong formatted email
    And User presses the log in button
    Then Log in screen shows an informative error message and does not allow the user to log in