Feature: Preventing wrong user creation

  Scenario: The user is not registered in the root directory of the website and tries to create an account
    Given An unregistered user
    When The user fills the data in the form using an already used username
    And Press Log in button
    Then Log in screen shows an informative error message and does not allow the user to log in