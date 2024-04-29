Feature: Preventing wrong user creation

  Scenario: The user is not registered in the root directory of the website
    Given An unregistered user
    When the user fills the data in the form using an already used email
    And click the sign in button
    Then Log in screen shows an informative error message and does not allow the user to log in