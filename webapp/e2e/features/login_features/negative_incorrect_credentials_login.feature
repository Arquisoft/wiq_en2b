Feature: Preventing wrong login accesses

  Scenario: A registered user wants to log in using his credentials but they do not match any registered user
    Given A registered user in the root screen
    When User presses the log in button
    And User enters in the log in screen
    And User fills the form with credentials that do not match
    And User presses the log in button
    Then Log in screen shows an informative error message and does not allow the user to log in